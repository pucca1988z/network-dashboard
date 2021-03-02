<template>
  <div>
    <div id="tooltip" 
      v-show="showTooltip" 
      class="border absolute bg-gray-500 w-32 h-24 rounded-md text-sm"
      style="background: rgba(220, 220, 220, 0.8);"  
    >
      <div class=" text-center py-2">
        {{ hoverPathName }}
      </div>
      <div 
        class=" border-t  border-normal-green text-normal-green space-y-2 pt-2 px-2 text-center text-3xl"
        v-if="this.hoverPathId ? isPathLoadedCompleted(this.hoverPathId) : null"
      >
        正常
      </div>
      <div 
        class=" border-t border-black space-y-2 pt-2 px-2 text-center text-3xl"
        v-else
      >
        無資料
        <!-- 
        <div>電路層監測：{{ hoverPathId ? getLoadedSchoolsByCountyId(hoverPathId) : 0 }} </div>
        <div>頻寬量測：{{ hoverPathId ? getLoadedSchoolsByCountyId(hoverPathId) : 0 }} </div>
        <div>資安通報：{{ hoverPathId ? getLoadedSchoolsByCountyId(hoverPathId) : 0 }} </div> 
        -->
      </div>

    </div>
    <svg id="geo-map"></svg>
  </div>
</template>

<script>
import * as d3 from 'd3'
import { mapState, mapGetters } from "vuex";
export default {
  components:{},
  data(){
    return {
      svg: null,
      width:600,
      height:800,
      transitionDuration: 500,
      path:null,
      g:null, 
      svg:null,
      mercator:null,
      pathGenerator:null,
      originColor:null,
      originOpacity:null,
      paths: null,
      selectedD: null,
      showTooltip: null,
      hoverPathId: null,
      hoverDistrictId:null,
      hoverPathName:null
    }
  },
  watch:{
    getCountiesLoadingRecord:function(newVal){
      if( this.selectedCountyId != null ) return 
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
      if( this.selectedCountyId == null ) return
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
    }, 
  },
  computed:{
    ...mapGetters({
      getCountiesLoadingRecord:'getCountiesLoadingRecord',
      getLoadedRecordsDistrictLevel: 'getLoadedRecordsDistrictLevel',
      getLoadedSchoolsByCountyId:'getLoadedSchoolsByCountyId',
      getTotalSchoolsByCountyId:'getTotalSchoolsByCountyId',
      isPathLoadedCompleted:'isPathLoadedCompleted'
    }),
    ...mapState({
      hintColor: state => state.hintColor,
      isCountyLoadAnimationFinish: state => state.isCountyLoadAnimationFinish,
      countySet: state => state.countySet,
      districtSet: state => state.districtSet,
      selectedCountyId: state => state.selectedCountyId,
      schools: state =>  state.schools,
      schoolsMap: state => state.schoolsMap, 
    })
  },
  methods:{
    makeSvgDefs(){
      let defs = this.svg.append('defs')
      let filter = defs.append('filter')
      filter.attr('id','innerStroke').attr('x',0).attr('y',0).attr('width',1).attr('height',1)
      filter.append('feMorphology').attr('operator','erode').attr('in','SourceGraphic').attr('radius',2).attr('result', 'erode')
      filter.append('feColorMatrix').attr('type','matrix').attr('in','SourceGraphic').attr('result', 'color').attr('values','0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0')
      let feMerge = filter.append("feMerge");
      feMerge.append("feMergeNode").attr("in", "color")
      feMerge.append("feMergeNode").attr("in", "erode")
    },
    mousePosition(event){
      return [event.clientX, event.clientY]
    },
    onMouseMove(d){
      let position = this.mousePosition(event)
      d3.select('#tooltip')
      .style("left", `${position[0] >= 420 ? position[0] -150 : position[0] }px`)
      .style("top", `${position[1] >= 550 ? position[1] - 100 : position[1] }px`)
    },
    onMouseOver(d){
      this.hoverPathId = d.properties.district_id ? d.properties.district_id : d.properties.county_id
      if(this.selectedCountyId) this.hoverDistrictId = d.properties.district_id
      this.showTooltip = true
      this.hoverPathName = `${d.properties.district ? d.properties.district : d.properties.county }`
      let position = this.mousePosition(event)

      this.makeSvgDefs()

      d3.select('#tooltip').style("left", `${position[0] }px`).style("top", `${position[1] }px`)

      let area = d3.select(event.currentTarget)
      area
      .style('cursor', 'pointer')
      .attr('stroke','gray')
      .attr('stroke-opacity', 0.3)
      .attr("stroke-width", 0.2)
      .style("filter", "url(#innerStroke)")
    },
    onMouseOut(d){
      this.showTooltip = null

      let area = d3.select(event.currentTarget)
      area
      .attr('stroke','white').attr('stroke-opacity', 1).attr("stroke-width", 0.2)
      .style("filter", "")
    },
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
        arr = this.getCountiesLoadingRecord : 
        arr = this.getLoadedRecordsDistrictLevel
      arr.forEach( a => {
        let {county_id, district_id, total, loaded} = a 
        let p = d3.select(`#id_${ district_id ? district_id : county_id }`)
        if(loaded == 0){
          p.attr('fill',this.hintColor.get('noData')).attr('fill-opacity', 1)
        }
        else if(total == loaded){
          p.transition().duration(500).attr('fill',this.hintColor.get('normal')).attr('fill-opacity', 1)
        }else{
          p.transition().duration(500).attr('fill', this.hintColor.get('normal')).attr('fill-opacity',0.3 + (loaded / total))
          .transition().duration(500).attr('fill', this.hintColor.get('noData')).attr('fill-opacity',1)
        }
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
      .attr("stroke-width", 0.2).attr("stroke", "white")
      .attr("fill", vm.hintColor.get('noData'))
      .attr('id', d => `id_${ d.properties.district_id ? d.properties.district_id : d.properties.county_id }`)
      // fill color
      this.fillColor()
 
      paths
      .on('mousemove', d => this.onMouseMove(d))
      .on('mouseover', (d) => this.onMouseOver(d))
      .on('mouseout', (d) => this.onMouseOut(d))
      paths.on('click',clicked)
    }

    //zoomToBoundingBox
    const zoomToBoundingBox = d => {
      if(this.selectedD == null ) this.selectedD = d
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
    const clicked = d => {
      d3.json('twTown2.json')
      .then(json =>{
        zoomToBoundingBox(d);
        const { county_id, county, district, district_id } = {...d.properties}
        this.setSelectedPathData( d.properties )
        let selectedjson = this.selectMap(json.features, county_id);
        vm.g.selectAll("*").remove();
        makemap(selectedjson)

        d3.select('#zoomOutToCounty').on('click', () => { 
          d.properties.district_id = null, d.properties.district = null
          this.setSelectedPathData( d.properties )
          vm.g.selectAll("*").remove();
          vm.svg.transition().duration(500).call( zzoom.transform, d3.zoomIdentity );
          zoomToBoundingBox(vm.selectedD);
          makemap(selectedjson);
        })

      })
    }

    d3.json('twCountry2.json')
    .then(json =>{
      makemap(json.features)
      d3.select('#zoomOutToCountry')
      .on('click',function(){
        vm.selectedD = null
        vm.g.selectAll("*").remove();
        vm.svg.transition().duration(500).call( zzoom.transform, d3.zoomIdentity );
        makemap(json.features);
      })
    })

    vm.svg = d3.select('#geo-map')
    vm.g = vm.svg.append('g')
    vm.svg.attr('width', this.width).attr('height', this.height)

    vm.mercator = d3.geoMercator()
    .scale(11000)
    .translate([this.width/2, this.height/2])
    .center([120.5,23.5]);
    vm.pathGenerator = d3.geoPath().projection(vm.mercator);
  }
}
</script>

<style>

</style>