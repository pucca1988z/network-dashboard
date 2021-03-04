let svgWidth = 600, svgHeight = 800, transitionDuration = 500, position = []

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
  g.attr("transform", d3.event.transform); // updated for d3 v4
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
  if(false){
    tooltip.style("display", "block")
    tooltip.selectAll('#tooltipHoverName').text(`${d.properties.district ? d.properties.district : d.properties.county  }`)
    let arr = ['tooltipNormal', 'tooltipWatch', 'tooltipWarning', 'tooltipNoData']
    arr.forEach( a => tooltip.select(`#${a}`).style("display", "none"))
    // hint: 判斷顯示 正常 注意 告警 無資料 的條件
    if(true){  
      tooltip.select(`#${arr[ Math.floor(Math.random()*4) ]}`).style("display", "block")
    }
  }

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

const makemap = (geojson) => {
  let paths = g.selectAll('path').data(geojson)
  .enter().append('path')
  .attr('d',pathGenerator)
  .attr('class','boundary')
  .attr("stroke-width", 0.2).attr("stroke", "white")
  // .attr("fill", vm.hintColor.get('noData'))
  .attr('id', d => `id_${ d.properties.district_id ? d.properties.district_id : d.properties.county_id }`)
  // .attr("fill", '#909090')
  .attr("fill", d => {
    if(d.id == '65000') return '#1dc9b7'
    else if( d.id == '10003') return '#ffc241'
    else if( d.id == '10004') return '#fd3995'
    else return '#909090'
  })

  paths
  .on('click', clicked)
  .on('mouseover', d => onMouseOver(d) )
  .on('mousemove', d => onMouseMove(d) )
  .on('mouseout', d => onMouseOut(d) )

  // svg.selectAll('text').data(geojson).enter().append('text')
  // .text( d => d.properties.district ? d.properties.district : d.properties.county)
  // .attr("x", d => d.geometry.coordinates[0][0][0])
  // .attr("y", d => d.geometry.coordinates[0][0][1])

}

//zoomToBoundingBox
const zoomToBoundingBox = d => {
  // if(this.selectedD == null ) this.selectedD = d
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
  d3.json('twTown2.json')
  .then(json =>{
    console.log(d)
    zoomToBoundingBox(d);
    const { county_id, county, district, district_id } = {...d.properties}
    // this.setSelectedPathData( d.properties )
    let selectedjson = selectMap(json.features, county_id);
    g.selectAll("*").remove();
    makemap(selectedjson)

    if(true){
      if(d.id.length === 5){
        d3.select('#zoomOutToCounty')
        .text( `> ${d.properties.county}`).style('display','block')
        let distArr = json.features.filter( j => j.properties.county_id == d.id)
        distArr.forEach( (a,i) => {
          const { county_id, county, district, district_id } = {...a.properties}
          if(i == 0){
            d3.select('#tooltipHoverNameA').text(district)
            d3.select(`#id_${district_id}`).attr("fill",'#1dc9b7')
          }
          else if(i == 1){ 
            d3.select('#tooltipHoverNameB').text(district) 
            d3.select(`#id_${district_id}`).attr("fill",'#ffc241')
          } 
          else if(i == 2){ 
            d3.select('#tooltipHoverNameC').text(district) 
            d3.select(`#id_${district_id}`).attr("fill",'#fd3995')
          } 
          else if(i == 3){ 
            d3.select('#tooltipHoverNameD').text(district) 
          } 
        })
      }else{
        d3.select('#selectedDistrict')
        .text( `> ${d.properties.district}`).style('display','block')
      }
    }


    d3.select('#zoomOutToCounty').on('click', () => { 
      d3.select('#selectedDistrict').style('display','none')
      d.properties.district_id = null, d.properties.district = null
      // this.setSelectedPathData( d.properties )
      g.selectAll("*").remove();
      svg.transition().duration(500).call( zzoom.transform, d3.zoomIdentity );
      // zoomToBoundingBox(d);
      makemap(selectedjson);
    })

  })
}

d3.json('twCountry3.json')
.then(json =>{
  makemap(json.features)
  d3.select('#zoomOutToCountry')
  .on('click',function(){
    // vm.selectedD = null
    d3.select('#zoomOutToCounty').style('display','none')
    d3.select('#selectedDistrict').style('display','none')

    g.selectAll("*").remove();
    svg.transition().duration(500).call( zzoom.transform, d3.zoomIdentity );
    makemap(json.features);

    if(true){
      d3.select('#tooltipHoverNameA').text('新北市')
      d3.select('#tooltipHoverNameB').text('桃園市')
      d3.select('#tooltipHoverNameC').text('新竹縣')
      d3.select('#tooltipHoverNameD').text('宜蘭縣')
    }

  })
})


