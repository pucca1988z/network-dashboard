<template>
  <div class="py-2 px-4 flex flex-col content-center ">
    <div class="flex flex-row  bg-custPurpleForHeader text-center">
      <div class="w-20 border  border-black border-opacity-20">排名</div>
      <div class="w-80 border  border-black border-opacity-20">IP</div>
      <div class="w-40 border  border-black border-opacity-20">下載流量</div>
      <div class="w-40 border  border-black border-opacity-20">國家</div>
      <div class="flex-1 border  border-black border-opacity-20">備註</div>
    </div>
    <div 
      class="h-44 text-center pt-14 text-pink-500 text-3xl font-normal"
      v-if="getCountiesLoadingRecord.length != getLoadedCountiesCnt"
    >
      尚無資料
    </div>
    <div 
      v-if="getCountiesLoadingRecord.length == getLoadedCountiesCnt"
      data-aos="fade-left"
    >
      <div 
        class="flex flex-row  border-black border-opacity-20 h-9 "
        v-for="(d, key) of downloadData" :key="key"
      >
        <div class="w-20 border  border-black border-opacity-20 px-2 py-1">{{ key+1 }}</div>
        <div class="w-80 border  border-black border-opacity-20 px-2 py-1">{{ d.IP }}</div>
        <div class="w-40 border  border-black border-opacity-20 px-2 py-1">{{ `${d.DL_CAPACITY} ${d.UNIT}` }}</div>
        <div class="w-40 border  border-black border-opacity-20 px-2 py-1 flex space-x-2">
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
          <div>{{ d.COUNTRY }}</div>
        </div>
        <div class="flex-1 border  border-black border-opacity-20 px-2 py-1">{{ d.NOTES }}</div>
      </div>
    </div>
    
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import axios from 'axios'
export default {
  data(){
    return{
      downloadData: []
    }
  },
  computed:{
    ...mapGetters({
      getLoadedCountiesCnt:'getLoadedCountiesCnt',
      getCountiesLoadingRecord:'getCountiesLoadingRecord',
      getLoadedSchoolsByCountyId:'getLoadedSchoolsByCountyId',
      getTotalSchoolsByCountyId:'getTotalSchoolsByCountyId'
    })
  },
  mounted(){
    axios.get('/downloadTop5.json')
    .then( res => this.downloadData = res.data)
    .catch( err => console.log( err ))
    

  }
}
</script>

<style>

</style>