let svgWidth = 600, svgHeight = 800, transitionDuration = 500, position = []
let selectedD = null

let svg = d3.select('#geo-map')
let tooltip = d3.select('#tooltip')
svg.attr('width', svgWidth ).attr('height', svgHeight)
let g = svg.append('g')
let mercator = d3.geoMercator()
  .scale(11000)
  .translate([svgWidth/2, svgHeight/2])
  .center([120.5, 23.5])

let pathGenerator = d3.geoPath().projection(mercator)

let zzoom = d3.zoom().scaleExtent([1, 2]).on("zoom", zoomed);

function mousePosition(event){
  return [event.clientX, event.clientY]
}

function zoomed(){
  g.style("stroke-width", 1 / d3.event.transform.k + "px");
  g.attr("transform", d3.event.transform); 
}

function makeSvgDefs(d){
  let radius = d.id.length == 5 ? 1 : 0.3
  svg.selectAll('defs').remove()
  let defs = svg.append('defs')
  let filter = defs.append('filter')
  filter.attr('id','innerStroke').attr('x',0).attr('y',0).attr('width',1).attr('height',1)
  filter.append('feMorphology').attr('operator','erode').attr('in','SourceGraphic').attr('result', 'erode').attr('radius',radius)
  filter.append('feColorMatrix').attr('type','matrix').attr('in','SourceGraphic').attr('result', 'color').attr('values','0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0')
  let feMerge = filter.append("feMerge");
  feMerge.append("feMergeNode").attr("in", "color")
  feMerge.append("feMergeNode").attr("in", "erode")

}

function onMouseMove(d){
  position = mousePosition(event)
  tooltip
  .style("left", `${position[0] >= 420 ? position[0] -150 : position[0] }px`)
  .style("top", `${position[1] >= 550 ? position[1] - 100 : position[1] }px`)
}
function onMouseOver(d){
  makeSvgDefs(d)
  // hover and show tooltip
  tooltip.style("display", "block")
  tooltip.selectAll('#tooltipHoverName').text(`${d.properties.district ? d.properties.district : d.properties.county  }`)
  let arr = ['tooltipNoData', 'tooltipNormal', 'tooltipWatch', 'tooltipWarning']
  arr.forEach( a => tooltip.select(`#${a}`).style("display", "none"))
  // hint: 判斷顯示 正常 注意 告警 無資料 的條件
  let status = countyStatusMap.has(d.id) ? countyStatusMap.get(d.id) : districtStatusMap.get(d.id)
  tooltip.select(`#${arr[status]}`).style("display", "block")

  let area = d3.select(event.currentTarget)
  area
  .style('cursor', 'pointer')
  .attr('stroke','gray')
  .attr('stroke-opacity', 0.3)
  .attr("stroke-width", 0.2)
  .style("filter", "url(#innerStroke)")
}
function onMouseOut(d){
  tooltip.style("display", "none")
  let area = d3.select(event.currentTarget)
  area
  .attr('stroke','white').attr('stroke-opacity', 1).attr("stroke-width", 0.2)
  .style("filter", "")
}

const makeMap = (geojson) => {
  let paths = g.selectAll('path').data(geojson)
  .enter().append('path')
  .attr('d',pathGenerator)
  .attr('class','boundary')
  .attr("stroke-width", 0.2).attr("stroke", "white")
  .attr('id', d => `id_${ d.properties.district_id ? d.properties.district_id : d.properties.county_id }`)
  .attr("fill", d => {
    const { county_id, county, district, district_id } = {...d.properties}
    let id = d.id
    let status = id.length === 5 ? countyStatusMap.get(county_id) : districtStatusMap.get(district_id)
    let color = '#fd3995'
    if(status == 0 ) color = '#909090'
    else if( status == 1) color = '#1dc9b7'
    else if( status == 2) color = '#ffc241'
    return color
  })

  paths
  .on('click', clicked)
  .on('mouseover', d => onMouseOver(d) )
  .on('mousemove', d => onMouseMove(d) )
  .on('mouseout', d => onMouseOut(d) )

  svg.selectAll('text').remove();
  let texts = svg.selectAll('text').data(geojson).enter().append('text')
  .style("opacity", 0)
  .text( d => {
    if(d.properties.district) return 
    return d.properties.district ? d.properties.district : d.properties.county
  })
  .attr("dx", d => {
    return pathGenerator.centroid(d)[0]
  })
  .attr("dy", d => {
    return pathGenerator.centroid(d)[1]
  })
  .transition().duration(1000).ease(d3.easeLinear).style("opacity", 1)

}

//zoomToBoundingBox
const zoomToBoundingBox = d => {
  if(selectedD == null ) selectedD = d
  let bounds = pathGenerator.bounds(d),
    dx = bounds[1][0] - bounds[0][0],
    dy = bounds[1][1] - bounds[0][1],
    x = (bounds[0][0] + bounds[1][0]) / 2,
    y = (bounds[0][1] + bounds[1][1]) / 2,
    scale = Math.max(1, Math.min(10, .81/ Math.max(dx / svgWidth, dy / svgHeight))),
    translate = [svgWidth / 2 - scale * x, svgHeight / 2 - scale * y];
    svg.transition().duration(transitionDuration).call(zzoom.transform, d3.zoomIdentity.translate(translate[0],translate[1]).scale(scale)
  ); 
}

function selectMap(geojson,location){
  return geojson.filter( geoData => geoData.properties.county_id == location )
}

//clicked
const clicked = d => {
    zoomToBoundingBox(d);
    const { county_id, county, district, district_id } = {...d.properties}
    let selectedJson = selectMap(twTown.features, county_id);
    g.selectAll("*").remove();
    makeMap(selectedJson)

    if(d.id.length === 5){
      d3.select('#zoomOutToCounty').text( `> ${d.properties.county}`).style('display','block')
      // let distArr = twTown.features.filter( j => j.properties.county_id == d.id)
      // distArr.forEach( (a,i) => {
      //   const { county_id, county, district, district_id } = {...a.properties}
      //   let status = districtStatusMap.get(district_id)
      //   let color = '#fd3995'
      //   if(status == 0 ) color = '#909090'
      //   else if( status == 1) color = '#1dc9b7'
      //   else if( status == 2) color = '#ffc241'
      //   d3.select(`#id_${district_id}`).attr("fill",color)
      // })
    }else{
      d3.select('#selectedDistrict')
      .text( `> ${d.properties.district}`).style('display','block')
    }


    d3.select('#zoomOutToCounty').on('click', () => { 
      d3.select('#selectedDistrict').style('display','none')
      g.selectAll("*").remove();
      svg.transition().duration(500).call( zzoom.transform, d3.zoomIdentity );
      zoomToBoundingBox(selectedD);
      makeMap(selectedJson);
    })

  // })
}

makeMap(twCountry.features)
d3.select('#zoomOutToCountry')
.on('click',function(){
  selectedD = null
  d3.select('#zoomOutToCounty').style('display','none')
  d3.select('#selectedDistrict').style('display','none')

  g.selectAll("*").remove();
  svg.transition().duration(500).call( zzoom.transform, d3.zoomIdentity );
  makeMap(twCountry.features);

  if(true){
    d3.select('#tooltipHoverNameA').text('新北市')
    d3.select('#tooltipHoverNameB').text('桃園市')
    d3.select('#tooltipHoverNameC').text('新竹縣')
    d3.select('#tooltipHoverNameD').text('宜蘭縣')
  }

})


