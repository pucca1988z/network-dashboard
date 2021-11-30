let svgWidth = 600, svgHeight = 800, transitionDuration = 500, position = []
let selectedD = null, textScale = 1, selectedId = null 

let svg = d3.select('#geo-map')
let tooltip = d3.select('#tooltip')
let schoolTooltip = d3.select('#schoolTooltip')
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

const drawStroke = (area) => {
  area
  .style('cursor', 'pointer')
  .attr('stroke','gray')
  .attr('stroke-opacity', 0.3)
  .attr("stroke-width", 0.2)
  .style("filter", "url(#innerStroke)")
}

function onMouseMove(d){
  position = mousePosition(event)
  tooltip
  .style("left", `${position[0] >= 420 ? position[0] -150 : position[0] + 30 }px`)
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

  let path = d3.select(event.currentTarget)
  drawStroke(path)
}
function onMouseOut(d){
  tooltip.style("display", "none")
  let area = d3.select(event.currentTarget)
  area
  .attr('stroke','white').attr('stroke-opacity', 1).attr("stroke-width", 0.2)
  .style("filter", "")
}

function onMouseOverSchool(d){
  // add for draw area border on mouse over school
  let area = g.select(`#id_${d.district_id}`)
  drawStroke(area)
  if(selectedId == null || selectedId.length == 5) return ;
  schoolTooltip.style("display", "block");
  schoolTooltip.selectAll("#shcoolTooltipName").text(`${d.name}`)
  
  schoolTooltip
  .style("left", `${position[0] >= 420 ? position[0] -150 : position[0] + 30 }px`)
  .style("top", `${position[1] >= 550 ? position[1] - 100 : position[1] }px`)
}

function onMouseOutSchool(d){
  schoolTooltip.style("display", "none");
  // add for remove area border on mouse leave school
  let area = d3.select(`#id_${d.district_id}`)
  area
  .attr('stroke','white').attr('stroke-opacity', 1).attr("stroke-width", 0.2)
  .style("filter", "")
}

const onMouseMoveText = (d) => {
  position = mousePosition(event)
  tooltip
  .style("left", `${position[0] >= 420 ? position[0] -150 : position[0] + 30 }px`)
  .style("top", `${position[1] >= 550 ? position[1] - 100 : position[1] }px`)
}

const onMouseOverText = (d) => {
  makeSvgDefs(d)
  // hover and show tooltip
  tooltip.style("display", "block")
  tooltip.selectAll('#tooltipHoverName').text(`${d.properties.district ? d.properties.district : d.properties.county  }`)
  let arr = ['tooltipNoData', 'tooltipNormal', 'tooltipWatch', 'tooltipWarning']
  arr.forEach( a => tooltip.select(`#${a}`).style("display", "none"))
  // hint: 判斷顯示 正常 注意 告警 無資料 的條件
  let status = countyStatusMap.has(d.id) ? countyStatusMap.get(d.id) : districtStatusMap.get(d.id)
  tooltip.select(`#${arr[status]}`).style("display", "block")

  let path = g.select(`#id_${d.id}`)
  drawStroke(path)
}

const onMouseOutText = (d) => {
  tooltip.style("display", "none")
  let area = d3.select(`#id_${d.id}`)
  area
  .attr('stroke','white').attr('stroke-opacity', 1).attr("stroke-width", 0.2)
  .style("filter", "")
}



const makeMap = (geojson, fn) => {
  let paths = g.selectAll('path').data(geojson)
  .enter()
  .append('path')
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

  if(fn) setTimeout(()=>{
    fn()
  }, 510)


  paths.selectAll('text').remove();
  let texts = g.selectAll('text').data(geojson).enter().append('text').style('cursor', 'default')
  texts.text( d => d.properties.district ? d.properties.district : d.properties.county)
  .attr("text-anchor","middle")
  .attr("x", d => d.properties.coor ? mercator(d.properties.coor)[0] : pathGenerator.centroid(d)[0] )
  .attr("y", d => d.properties.coor ? mercator(d.properties.coor)[1] :pathGenerator.centroid(d)[1])
  .style("font-size", d => d.id.length === 5 ? 15 : `${(4 * textScale)}px`)
  .style('cursor', 'pointer')
  .on('click', clicked)
  .on('mouseover', d => onMouseOverText(d) )
  .on('mousemove', d => onMouseMoveText(d) )
  .on('mouseout', d => onMouseOutText(d) )

  // draw school point
  // if(fn == null) return
  let sg = g.selectAll('g')
  // .data(schools.filter( x => x.coor != null).filter( x => selectedId.length !== 5 ? x.district_id == selectedId : x.county_id == selectedId))
  .data(schools.filter( x => x.coor != null))//.filter( x => selectedId.length !== 5 ? x.district_id == selectedId : x.county_id == selectedId))
  .enter().append('g')
  
  let circles = sg.append('circle')
  .style('cursor', 'pointer')
  .attr("cx", d => mercator(d.coor)[0])
  .attr("cy", d => mercator(d.coor)[1])
  // .attr('r','1px')
  .attr('r', (d) => {
    if(selectedD == null) return '1px'
    else if(d.county_id == selectedD.id) return '1px'
  })
  .attr('fill', d => d.color)
  // .attr('fill-opacity', 0.6)
  .on("mouseover", d => onMouseOverSchool(d))
  .on("mouseout", d => onMouseOutSchool(d))

  // // make school label
  // sg.append('text')
  // .style('cursor', 'pointer')
  // .text( d => d.name)
  // .attr("x", d => mercator(d.coor)[0])
  // .attr("y", d => mercator(d.coor)[1])
  // .attr('dx','2px')
  // .style("font-size", d => `${(3 * textScale)}px`)
}

//zoomToBoundingBox
const zoomToBoundingBox = d => {
  if(selectedD == null ) selectedD = d
  let bounds = pathGenerator.bounds(d),
    dx = bounds[1][0] - bounds[0][0],
    dy = bounds[1][1] - bounds[0][1],
    x = (bounds[0][0] + bounds[1][0]) / 2,
    y = (bounds[0][1] + bounds[1][1]) / 2,
    scale = Math.max(1, Math.min(10, .81/ Math.max(dx / svgWidth, dy / svgHeight)))*1.2,
    textScale = scale
    translate = [svgWidth / 2 - scale * x, svgHeight / 2 - scale * y];
    svg.transition().duration(transitionDuration).call(zzoom.transform, d3.zoomIdentity.translate(translate[0],translate[1]).scale(scale)); 
}

function selectMap(geojson,location){
  return geojson.filter( geoData => geoData.properties.county_id == location )
}

//clicked
const clicked = d => {
    
    selectedId = d.id
    
    zoomToBoundingBox(d);
    const { county_id, county, district, district_id } = {...d.properties}
    let selectedJson = selectMap(twTown.features, county_id);
    g.selectAll("*").remove();
    makeMap(selectedJson, function(){
      d3.select(`#id_${d.id}`).attr('fill','#9acffa')
    })

    d.id.length === 5 ?
      d3.select('#zoomOutToCounty').text( `> ${d.properties.county}`).style('display','block') :
      d3.select('#selectedDistrict').text( `> ${d.properties.district}`).style('display','block')


    d3.select('#zoomOutToCounty').on('click', () => { 
      selectedId = selectedId.substring(0,5); // modify Id from District to County

      d3.select('#selectedDistrict').style('display','none')
      g.selectAll("*").remove();
      svg.transition().duration(500).call( zzoom.transform, d3.zoomIdentity );
      zoomToBoundingBox(selectedD);
      makeMap(selectedJson);
    })

    
    if(selectedId.length !== 8) return 
    let sg = g.selectAll('g')
    sg.selectAll('circle').attr('r','1px')

      // make school label
    // sg.append('text')
    // .style('cursor', 'pointer')
    // .text( d => d.name)
    // .attr("x", d => mercator(d.coor)[0])
    // .attr("y", d => mercator(d.coor)[1])
    // .attr('dx','2px')
    // .style("font-size", d => `${(3 * textScale)}px`)
}

makeMap(twCountry.features)
d3.select('#zoomOutToCountry')
.on('click',function(){
  selectedD = null
  selectedId = null 
  d3.select('#zoomOutToCounty').style('display','none')
  d3.select('#selectedDistrict').style('display','none')

  g.selectAll("*").remove();
  svg.transition().duration(500).call( zzoom.transform, d3.zoomIdentity );
  makeMap(twCountry.features);
})


