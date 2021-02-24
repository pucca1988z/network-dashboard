<template>
  <div>
    <p>
      <!-- {{ getLoadedRecordsDistrictLevel }} -->
    </p>
    <svg id="geo-map"></svg>
  </div>
</template>

<script>
import * as d3 from 'd3'
import { mapState } from "vuex";
export default {
  components:{},
  data(){
    return {
      svg: null,
      selectedCounty:null,
      width:400,
      height:600,
      transitionDuration: 500,
      path:null,
      g:null, 
      svg:null,
      mercator:null,
      pathGenerator:null,
      originColor:null,
      originOpacity:null,
      paths: null
    }
  },
  watch:{
    getLoadedRecordsCountyLevel:function(newVal){
      if(this.$store.state.selectedCountyId != null ) return 
      newVal.forEach( a => {
        let p = d3.select(`#id_${a.county_id}`)
        if(a.loaded == 0){}
        else if(a.total == a.loaded){
          // animate to normal
            p.transition().duration(500).attr('fill',this.hintColor.get('normal')).attr('fill-opacity', 1)
        }else{
          // keep animation
            p.transition().duration(300).attr('fill', this.hintColor.get('normal')).attr('fill-opacity',0.3 + (a.loaded / a.total))
            .transition().duration(300).attr('fill', this.hintColor.get('noData')).attr('fill-opacity',1)
        }
      })
    },
    getLoadedRecordsDistrictLevel: function(newVal){
      if(this.$store.state.selectedCountyId == null ) return
      newVal.forEach( a => {
        let p = d3.select(`#id_${a.district_id}`)
        if(a.loaded == 0){}
        else if(a.total == a.loaded){
          // animate to normal
            p.transition().duration(500).attr('fill',this.hintColor.get('normal')).attr('fill-opacity', 1)
        }else{
          // keep animation
            p.transition().duration(300).attr('fill', this.hintColor.get('normal')).attr('fill-opacity',0.3 + (a.loaded / a.total))
            .transition().duration(300).attr('fill', this.hintColor.get('noData')).attr('fill-opacity',1)
        }
      })
    }
  },
  computed:{
    getLoadedRecordsCountyLevel(){
      return this.$store.getters.getLoadedRecordsCountyLevel
    },
    getLoadedRecordsDistrictLevel(){
      return this.$store.getters.getLoadedRecordsDistrictLevel
    },
    getTotalRecords(){
      return this.$store.getters.getTotalRecords
    },
    getLoadedRecords(){ 
      return this.$store.getters.getLoadedRecords
     },
    ...mapState({
      hintColor: state => state.hintColor,
      isCountyLoadAnimationFinish: state => state.isCountyLoadAnimationFinish,
      countySet: state => state.countySet,
      districtSet: state => state.districtSet,
      schools: state =>  state.schools,
      schoolsMap: state => state.schoolsMap, 
      colorMap: state => state.colorMap
    })
  },
  methods:{
    loadData:function(){
      this.$store.dispatch('loadData',{ county_id:'09007' })
    },
    selectMap:function(geojson,location){
      return geojson.filter( geoData => geoData.properties.county_id == location )
    },
    zzoom: function(){
      d3.zoom().scaleExtent([1, 2]).on('zoom',this.zoomed)
    },
    zoomed:function(){
      this.g.style("stroke-width", 1 / d3.event.transform.k + "px");
      this.g.attr("transform", d3.event.transform); // updated for d3 v4
    },
    setSelectedPathData:function(obj){
      const { county_id, county, district, district_id } = {...obj}
      this.$store.dispatch('setSelectedPathData', {
        selectedCountyName: county,
        selectedCountyId:county_id,
        selectedDistrict:district, 
        selectedDistrictId:district_id,
      })
    },  
    fillColor:function(){
      const {selectedCountyId, selectedDistrictId} = {...this.$store.state}
      let arr
      selectedCountyId == null ? 
      arr = this.getLoadedRecordsCountyLevel : 
      arr = this.getLoadedRecordsDistrictLevel

      arr.forEach( a => {
        let {county_id, district_id, total, loaded} = a 
        let p = d3.select(`#id_${ district_id ? district_id : county_id }`)
        this.$store.dispatch('setPathColor',{ county_id, district_id, total, loaded })
        setTimeout(()=>{
          if(loaded == 0){
            p.attr('fill',this.hintColor.get('noData')).attr('fill-opacity', 1)
          }
          else if(total == loaded){
              p.transition().duration(500).attr('fill',this.hintColor.get('normal')).attr('fill-opacity', 1)
          }else{
              p.transition().duration(300).attr('fill', this.hintColor.get('normal')).attr('fill-opacity',0.3 + (loaded / total))
              .transition().duration(300).attr('fill', this.hintColor.get('noData')).attr('fill-opacity',1)
          }

        }, 0)
      })
    }
  },
  mounted(){
    this.loadData()
    const vm = this
    //Zoom
    let zzoom = d3.zoom().scaleExtent([1, 2]).on("zoom", vm.zoomed);
    //makemap
    const makemap = (geojson) => {
      let paths = vm.g.selectAll('path').data(geojson)
      .enter().append('path')
      .attr('d',vm.pathGenerator)
      .attr('class','boundary')
      .attr("stroke-width", 0.2)
      .attr("stroke", "#000000")
      .attr("fill", vm.hintColor.get('noData'))
      .attr('id', d => {
        let id 
        d.properties.district_id ? id = d.properties.district_id : id = d.properties.county_id
        return `id_${id}`
      })

      // fill color
      setTimeout(()=>{
        this.fillColor()
      },300)
 
      paths
      // .on('mouseover', (d) => {
      .on('mouseenter', (d) => {
        let area = d3.select(event.currentTarget)
        vm.originColor = area.attr('fill')
        vm.originOpacity = area.attr('fill-opacity')

        area
        .style('cursor', 'pointer')
        .transition()
        .duration(20)
        .attr("fill", vm.hintColor.get('selected'))
        .attr('stroke','black').attr('stroke-opacity', 1).attr("stroke-width", 0.2)
        
      })
      .on('mouseout', (d) => {
        let area = d3.select(event.currentTarget)
        area
        .style('cursor', 'default')
        .transition()
        .duration(20)
        // .attr("fill", this.hintColor.get('noData'))//.attr('fill-opacity',0.3)
        .attr("fill", vm.originColor).attr('fill-opacity',vm.originOpacity)
        .attr('stroke','black').attr('stroke-opacity', 1).attr("stroke-width", 0.2)
      })
      .append('title')
      .html( d => `
      <div style="color:blue">
      ${ d.properties.district ? d.properties.district : d.properties.county}
      data1
      data2
      </div>

      `)

      paths.on('click',clicked)
    }

    //zoomToBoundingBox
    const zoomToBoundingBox = d => {
      let bounds = vm.pathGenerator.bounds(d),
        dx = bounds[1][0] - bounds[0][0],
        dy = bounds[1][1] - bounds[0][1],
        x = (bounds[0][0] + bounds[1][0]) / 2,
        y = (bounds[0][1] + bounds[1][1]) / 2,
        scale = Math.max(1, Math.min(10, .81/ Math.max(dx / this.width, dy / this.height))),
        translate = [this.width / 2 - scale * x, this.height / 2 - scale * y];
        vm.svg.transition().duration(this.transitionDuration).call(zzoom.transform, d3.zoomIdentity.translate(translate[0],translate[1]).scale(scale)
      ); 
    }

    //clicked
    const clicked = d =>{
      d3.json('twTown.json')
      .then(projectGeoJSON =>{
        let projectgeojson = projectGeoJSON.features;
        zoomToBoundingBox(d);
        const { county_id, county, district, district_id } = {...d.properties}
        this.setSelectedPathData( d.properties )
        let selectedjson = this.selectMap(projectgeojson, county_id);
        vm.g.selectAll("*").remove();
        makemap(selectedjson)
      })
    }

    d3.json('twCountry.json')
    .then(json =>{
      makemap(json.features)
      d3.select('#zoomOutBtn')
      .on('click',function(){
        vm.g.selectAll("*").remove();
        vm.svg.transition().duration(500).call( zzoom.transform, d3.zoomIdentity );
        makemap(json.features);
      })
    })


    vm.svg = d3.select('#geo-map')
    vm.g = vm.svg.append('g')
    vm.svg.attr('width', this.width).attr('height', this.height)

    vm.mercator = d3.geoMercator()
    .scale(8000)
    .translate([this.width/2, this.height/2])
    .center([120.5,23.5]);

    vm.pathGenerator = d3.geoPath().projection(vm.mercator);
  }
}
</script>

<style>

</style>