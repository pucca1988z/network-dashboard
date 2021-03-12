<template>
  <div class="py-4 px-4 flex flex-col content-center shadow-lg h-60 ">
    <div class="flex flex-row  bg-custPurpleForHeader text-center">
      <div class="w-20 border  border-black border-opacity-20">排名</div>
      <div class="w-80 border  border-black border-opacity-20">IP</div>
      <div class="w-40 border  border-black border-opacity-20">下載流量</div>
      <div class="w-40 border  border-black border-opacity-20">國家</div>
      <div class="flex-1 border  border-black border-opacity-20">備註</div>
    </div>
    <!-- v-if="getCountiesLoadingRecord.length != getLoadedCountiesCnt" -->
    <div 
      class="h-44 text-center pt-14 text-pink-500 text-3xl font-normal"
      v-if="selectedCountyId ? getCircleCnt() != getTotalSchoolsByCountyId(selectedCountyId) : getCircleCnt() < 22"
    >
      尚無資料
    </div>

      <!-- v-if="getCountiesLoadingRecord.length == getLoadedCountiesCnt" -->
    <div 
      v-if="selectedCountyId ? getCircleCnt() == getTotalSchoolsByCountyId(selectedCountyId) : getCircleCnt() == 22 "
      data-aos="fade-left"
    >
    
      <div 
        class="flex flex-row  border-black border-opacity-20 h-9 "
        v-for="(d, key) of getDownloadData(selectedCountyId)" :key="key"
      >
        <div class="w-20 border  border-black border-opacity-20 px-2 py-1">{{ key+1 }}</div>
        <div class="w-80 border  border-black border-opacity-20 px-2 py-1">{{ d.IP }}</div>
        <div class="w-40 border  border-black border-opacity-20 px-2 py-1">{{ `${d.DL_CAPACITY} ${d.UNIT}` }}</div>
        <div class="w-40 border  border-black border-opacity-20 px-2 py-1 flex space-x-2">
          <div v-if="d.COUNTRY == 'TW'" v-html="twFlag"></div>
          <div v-else v-html="usFlag"></div>
          <div>{{ d.COUNTRY }}</div>
        </div>
        <div class="flex-1 border  border-black border-opacity-20 px-2 py-1">{{ d.NOTES }}</div>
      </div>
    </div>
    
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import Static from '../Static/Static.vue'
import axios from 'axios'
export default {
  mixins:[Static],
  data(){
    return{
      downloadData: [],
      twFlag:`
        <svg class="h-6 w-6" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
          <rect y="85.337" style="fill:#D80027;" width="512" height="341.326"/>
          <rect y="85.337" style="fill:#0052B4;" width="256" height="170.663"/>
          <polygon style="fill:#F0F0F0;" points="186.435,170.669 162.558,181.9 175.272,205.025 149.345,200.064 146.059,226.256 
            128,206.993 109.94,226.256 106.655,200.064 80.728,205.024 93.442,181.899 69.565,170.669 93.442,159.438 80.728,136.313 
            106.655,141.273 109.941,115.081 128,134.344 146.06,115.081 149.345,141.273 175.273,136.313 162.558,159.438 "/>
          <circle style="fill:#0052B4;" cx="128" cy="170.674" r="29.006"/>
          <path style="fill:#F0F0F0;" d="M128,190.06c-10.692,0-19.391-8.7-19.391-19.391c0-10.692,8.7-19.391,19.391-19.391
            c10.692,0,19.391,8.7,19.391,19.391C147.391,181.36,138.692,190.06,128,190.06z"/>
        </svg>
      `,
      usFlag:`
        <svg class="h-6 w-6"  viewBox="0 0 640 480">
          <g fill-rule="evenodd">
            <g stroke-width="1pt">
              <path fill="#bd3d44" d="M0 0h972.8v39.4H0zm0 78.8h972.8v39.4H0zm0 78.7h972.8V197H0zm0 78.8h972.8v39.4H0zm0 78.8h972.8v39.4H0zm0 78.7h972.8v39.4H0zm0 78.8h972.8V512H0z" transform="scale(.9375)"/>
              <path fill="#fff" d="M0 39.4h972.8v39.4H0zm0 78.8h972.8v39.3H0zm0 78.7h972.8v39.4H0zm0 78.8h972.8v39.4H0zm0 78.8h972.8v39.4H0zm0 78.7h972.8v39.4H0z" transform="scale(.9375)"/>
            </g>
            <path fill="#192f5d" d="M0 0h389.1v275.7H0z" transform="scale(.9375)"/>
            <path fill="#fff" d="M32.4 11.8L36 22.7h11.4l-9.2 6.7 3.5 11-9.3-6.8-9.2 6.7 3.5-10.9-9.3-6.7H29zm64.9 0l3.5 10.9h11.5l-9.3 6.7 3.5 11-9.2-6.8-9.3 6.7 3.5-10.9-9.2-6.7h11.4zm64.8 0l3.6 10.9H177l-9.2 6.7 3.5 11-9.3-6.8-9.2 6.7 3.5-10.9-9.3-6.7h11.5zm64.9 0l3.5 10.9H242l-9.3 6.7 3.6 11-9.3-6.8-9.3 6.7 3.6-10.9-9.3-6.7h11.4zm64.8 0l3.6 10.9h11.4l-9.2 6.7 3.5 11-9.3-6.8-9.2 6.7 3.5-10.9-9.2-6.7h11.4zm64.9 0l3.5 10.9h11.5l-9.3 6.7 3.6 11-9.3-6.8-9.3 6.7 3.6-10.9-9.3-6.7h11.5zM64.9 39.4l3.5 10.9h11.5L70.6 57 74 67.9l-9-6.7-9.3 6.7L59 57l-9-6.7h11.4zm64.8 0l3.6 10.9h11.4l-9.3 6.7 3.6 10.9-9.3-6.7-9.3 6.7L124 57l-9.3-6.7h11.5zm64.9 0l3.5 10.9h11.5l-9.3 6.7 3.5 10.9-9.2-6.7-9.3 6.7 3.5-10.9-9.2-6.7H191zm64.8 0l3.6 10.9h11.4l-9.3 6.7 3.6 10.9-9.3-6.7-9.2 6.7 3.5-10.9-9.3-6.7H256zm64.9 0l3.5 10.9h11.5L330 57l3.5 10.9-9.2-6.7-9.3 6.7 3.5-10.9-9.2-6.7h11.4zM32.4 66.9L36 78h11.4l-9.2 6.7 3.5 10.9-9.3-6.8-9.2 6.8 3.5-11-9.3-6.7H29zm64.9 0l3.5 11h11.5l-9.3 6.7 3.5 10.9-9.2-6.8-9.3 6.8 3.5-11-9.2-6.7h11.4zm64.8 0l3.6 11H177l-9.2 6.7 3.5 10.9-9.3-6.8-9.2 6.8 3.5-11-9.3-6.7h11.5zm64.9 0l3.5 11H242l-9.3 6.7 3.6 10.9-9.3-6.8-9.3 6.8 3.6-11-9.3-6.7h11.4zm64.8 0l3.6 11h11.4l-9.2 6.7 3.5 10.9-9.3-6.8-9.2 6.8 3.5-11-9.2-6.7h11.4zm64.9 0l3.5 11h11.5l-9.3 6.7 3.6 10.9-9.3-6.8-9.3 6.8 3.6-11-9.3-6.7h11.5zM64.9 94.5l3.5 10.9h11.5l-9.3 6.7 3.5 11-9.2-6.8-9.3 6.7 3.5-10.9-9.2-6.7h11.4zm64.8 0l3.6 10.9h11.4l-9.3 6.7 3.6 11-9.3-6.8-9.3 6.7 3.6-10.9-9.3-6.7h11.5zm64.9 0l3.5 10.9h11.5l-9.3 6.7 3.5 11-9.2-6.8-9.3 6.7 3.5-10.9-9.2-6.7H191zm64.8 0l3.6 10.9h11.4l-9.2 6.7 3.5 11-9.3-6.8-9.2 6.7 3.5-10.9-9.3-6.7H256zm64.9 0l3.5 10.9h11.5l-9.3 6.7 3.5 11-9.2-6.8-9.3 6.7 3.5-10.9-9.2-6.7h11.4zM32.4 122.1L36 133h11.4l-9.2 6.7 3.5 11-9.3-6.8-9.2 6.7 3.5-10.9-9.3-6.7H29zm64.9 0l3.5 10.9h11.5l-9.3 6.7 3.5 10.9-9.2-6.7-9.3 6.7 3.5-10.9-9.2-6.7h11.4zm64.8 0l3.6 10.9H177l-9.2 6.7 3.5 11-9.3-6.8-9.2 6.7 3.5-10.9-9.3-6.7h11.5zm64.9 0l3.5 10.9H242l-9.3 6.7 3.6 11-9.3-6.8-9.3 6.7 3.6-10.9-9.3-6.7h11.4zm64.8 0l3.6 10.9h11.4l-9.2 6.7 3.5 11-9.3-6.8-9.2 6.7 3.5-10.9-9.2-6.7h11.4zm64.9 0l3.5 10.9h11.5l-9.3 6.7 3.6 11-9.3-6.8-9.3 6.7 3.6-10.9-9.3-6.7h11.5zM64.9 149.7l3.5 10.9h11.5l-9.3 6.7 3.5 10.9-9.2-6.8-9.3 6.8 3.5-11-9.2-6.7h11.4zm64.8 0l3.6 10.9h11.4l-9.3 6.7 3.6 10.9-9.3-6.8-9.3 6.8 3.6-11-9.3-6.7h11.5zm64.9 0l3.5 10.9h11.5l-9.3 6.7 3.5 10.9-9.2-6.8-9.3 6.8 3.5-11-9.2-6.7H191zm64.8 0l3.6 10.9h11.4l-9.2 6.7 3.5 10.9-9.3-6.8-9.2 6.8 3.5-11-9.3-6.7H256zm64.9 0l3.5 10.9h11.5l-9.3 6.7 3.5 10.9-9.2-6.8-9.3 6.8 3.5-11-9.2-6.7h11.4zM32.4 177.2l3.6 11h11.4l-9.2 6.7 3.5 10.8-9.3-6.7-9.2 6.7 3.5-10.9-9.3-6.7H29zm64.9 0l3.5 11h11.5l-9.3 6.7 3.6 10.8-9.3-6.7-9.3 6.7 3.6-10.9-9.3-6.7h11.4zm64.8 0l3.6 11H177l-9.2 6.7 3.5 10.8-9.3-6.7-9.2 6.7 3.5-10.9-9.3-6.7h11.5zm64.9 0l3.5 11H242l-9.3 6.7 3.6 10.8-9.3-6.7-9.3 6.7 3.6-10.9-9.3-6.7h11.4zm64.8 0l3.6 11h11.4l-9.2 6.7 3.5 10.8-9.3-6.7-9.2 6.7 3.5-10.9-9.2-6.7h11.4zm64.9 0l3.5 11h11.5l-9.3 6.7 3.6 10.8-9.3-6.7-9.3 6.7 3.6-10.9-9.3-6.7h11.5zM64.9 204.8l3.5 10.9h11.5l-9.3 6.7 3.5 11-9.2-6.8-9.3 6.7 3.5-10.9-9.2-6.7h11.4zm64.8 0l3.6 10.9h11.4l-9.3 6.7 3.6 11-9.3-6.8-9.3 6.7 3.6-10.9-9.3-6.7h11.5zm64.9 0l3.5 10.9h11.5l-9.3 6.7 3.5 11-9.2-6.8-9.3 6.7 3.5-10.9-9.2-6.7H191zm64.8 0l3.6 10.9h11.4l-9.2 6.7 3.5 11-9.3-6.8-9.2 6.7 3.5-10.9-9.3-6.7H256zm64.9 0l3.5 10.9h11.5l-9.3 6.7 3.5 11-9.2-6.8-9.3 6.7 3.5-10.9-9.2-6.7h11.4zM32.4 232.4l3.6 10.9h11.4l-9.2 6.7 3.5 10.9-9.3-6.7-9.2 6.7 3.5-11-9.3-6.7H29zm64.9 0l3.5 10.9h11.5L103 250l3.6 10.9-9.3-6.7-9.3 6.7 3.6-11-9.3-6.7h11.4zm64.8 0l3.6 10.9H177l-9 6.7 3.5 10.9-9.3-6.7-9.2 6.7 3.5-11-9.3-6.7h11.5zm64.9 0l3.5 10.9H242l-9.3 6.7 3.6 10.9-9.3-6.7-9.3 6.7 3.6-11-9.3-6.7h11.4zm64.8 0l3.6 10.9h11.4l-9.2 6.7 3.5 10.9-9.3-6.7-9.2 6.7 3.5-11-9.2-6.7h11.4zm64.9 0l3.5 10.9h11.5l-9.3 6.7 3.6 10.9-9.3-6.7-9.3 6.7 3.6-11-9.3-6.7h11.5z" transform="scale(.9375)"/>
          </g>
        </svg>
      `
    }
  },
  methods:{
    getDownloadData:function(countyId){
      if(countyId == null ) countyId = "0"
      if(countyId == 0 && this.getLoadedCountiesCnt != 22 ) return 
      return this.downloadData[countyId]
    }
  },
  computed:{
    ...mapState({
      selectedCountyName: state => state.selectedCountyName,
      selectedCountyId: state => state.selectedCountyId,
      selectedDistrict: state => state.selectedDistrict, 
      selectedDistrictId: state => state.selectedDistrictId,
    }),
    ...mapGetters({
      getLoadedCountiesCnt:'getLoadedCountiesCnt',
      getCountiesLoadingRecord:'getCountiesLoadingRecord',
      getLoadedSchoolsByCountyId:'getLoadedSchoolsByCountyId',
      getTotalSchoolsByCountyId:'getTotalSchoolsByCountyId'
    })
  },
  mounted(){
    // axios.get('/oc/downloadTop5.json')
    axios.get('/all_top5.json')
    .then( res => this.downloadData = res.data)
    .catch( err => console.log( err ))
    

  }
}
</script>

<style>

</style>
