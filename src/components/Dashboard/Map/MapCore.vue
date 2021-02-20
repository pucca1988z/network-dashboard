<template>
  <div>
    {{ this.loadingMap }}
    <svg id="geo-map"></svg>
    <!-- {{ isCountyLoadAnimateFinish }} -->
  </div>
</template>

<script>
import * as d3 from 'd3'
import { mapState } from "vuex";
export default {
  components:{

  },
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
      percentage:0,
      loadingMap: null
    }
  },
  watch:{
    loadingMap:function(val){
      console.log(val.totalCounty)
    },
    percentage:function(val){
      let paths = this.g.selectAll('path')
      if(val % 10 == 0 && val != 100){
        paths.attr('fill',this.hintColor.get('normal')).attr('fill-opacity', val / 100 + 0.2)
        .transition().duration(400).attr('fill',this.hintColor.get('noData')).attr('fill-opacity', 1)
      }
      if(val == 100){
        paths.transition().duration(500).attr('fill',this.hintColor.get('normal')).attr('fill-opacity', 1)
      }
    }
  },
  computed:{
    ...mapState({
      hintColor: state => state.hintColor,
      isCountyLoadAnimationFinish: state => state.isCountyLoadAnimationFinish,
      schools: state => state.schools
    })
  },
  methods:{
    buildLoadingMap:function(){
      let obj = {}
      return obj
    },
    countyLoadAnimate:function(c){
      c.nodes().forEach( (d,i) => {
        setTimeout(()=>{
          let p = d3.select(d)
          if(p.data()[0].properties.county_id == '10009'){
            this.countyLoadHandler(p)
          }
        },i * 500)
      });
      
      let interval = setInterval(() => {
        if(this.percentage == 100-1){
          clearInterval(interval);
        }
        this.percentage++
      },100)
      

      // setTimeout(()=>{
      //   this.$store.dispatch('toggleCountyLoadAnimationFlag')
      // }, 500)
    },
    countyLoadHandler:function(p){
      // while(this.percentage<100){
      //   p.transition().duration(6000)
      //   .attr('fill', this.hintColor.get('normal')).attr('fill-opacity',this.percentage / 100 +0.3)
      // }
      // let i = 0.1
      // while(i<1){
      //   p.transition().duration(6000)
      //   .attr('fill', this.hintColor.get('normal')).attr('fill-opacity',i+0.3)
      //   i += 0.1
      // }
      // p
      // .transition().duration(600).attr('fill', this.hintColor.get('normal')).attr('fill-opacity',0.3)
      // .transition().duration(600).attr('fill', this.hintColor.get('noData')).attr('fill-opacity',1)
      // .transition().duration(600).attr('fill', this.hintColor.get('normal')).attr('fill-opacity',0.4)
      // .transition().duration(600).attr('fill', this.hintColor.get('noData')).attr('fill-opacity',1)
      // .transition().duration(600).attr('fill', this.hintColor.get('normal')).attr('fill-opacity',0.5)
      // .transition().duration(600).attr('fill', this.hintColor.get('noData')).attr('fill-opacity',1)
      // .transition().duration(600).attr('fill', this.hintColor.get('normal')).attr('fill-opacity',0.6)
      // .transition().duration(600).attr('fill', this.hintColor.get('noData')).attr('fill-opacity',1)
      // .transition().duration(600).attr('fill', this.hintColor.get('normal')).attr('fill-opacity',0.7)
      // .transition().duration(600).attr('fill', this.hintColor.get('noData')).attr('fill-opacity',1)
      // .transition().duration(600).attr('fill', this.hintColor.get('normal')).attr('fill-opacity',0.8)
      // .transition().duration(600).attr('fill', this.hintColor.get('noData')).attr('fill-opacity',1)
      // .transition().duration(600).attr('fill', this.hintColor.get('normal')).attr('fill-opacity',0.9)
      // .transition().duration(600).attr('fill', this.hintColor.get('noData')).attr('fill-opacity',1)
      // .transition().duration(600).attr('fill', this.hintColor.get('normal')).attr('fill-opacity',1)
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
    setSelectedCountyName:function(){
      this.$store.dispatch('setSelectedCountyName', {
        selectedCountyName: this.selectedCountyName
      })
    },  
  },
  mounted(){
    this.loadingMap = this.buildLoadingMap()

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
 
      paths
      .on('mouseover', (d) => {
        // if(!vm.isCountyLoadAnimationFinish) return
        let area = d3.select(event.currentTarget)
        vm.originColor = area.attr('fill')
        area
        .style('cursor', 'pointer')
        .transition()
        .duration(100)
        .attr("fill", vm.hintColor.get('selected'))
        .attr('stroke','black').attr('stroke-opacity', 1).attr("stroke-width", 0.2)
        
      })
      .on('mouseout', (d) => {
        // if(!vm.isCountyLoadAnimationFinish) return
        let area = d3.select(event.currentTarget)
        area
        .style('cursor', 'default')
        .transition()
        .duration(100)
        // .attr("fill", this.hintColor.get('noData'))//.attr('fill-opacity',0.3)
        .attr("fill", vm.originColor)//.attr('fill-opacity',0.3)
        .attr('stroke','black').attr('stroke-opacity', 1).attr("stroke-width", 0.2)
      })
      // .append('title')
      // .text( d => d.properties.county)
      .append('title')
      .html( d => `
      <div style="color:blue">
      ${ d.properties.district ? d.properties.district : d.properties.county}
      data1
      data2
      </div>

      `)

      paths.on('click',clicked)

      vm.countyLoadAnimate(paths)
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
        let selectedBlock = d.properties.county_id;
        this.selectedCounty = selectedBlock
        this.selectedCountyName = d.properties.county 
        this.setSelectedCountyName()
        let selectedjson = this.selectMap(projectgeojson,selectedBlock);
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