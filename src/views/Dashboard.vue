<template>
  <!-- <div class=" grid md:grid-cols-6 md:grid-rows-3 gap-5"> -->
  <div class="flex space-x-4">
    <Map 
      data-aos="fade-right" 
      data-aos-duration="1300"
      data-aos-once="true"
      class=" shadow-lg rounded-lg ">
    </Map>
    <div class="flex flex-col flex-1 space-y-4">
      <Static 
        :data-aos="fadeDownLeft"
        data-aos-duration="1300"
        data-aos-once="true"
        class=" pb-4 shadow-lg rounded-lg">
      </Static>
      <Abnormal 
        :data-aos="fadeLeft" 
        data-aos-duration="1300"
        data-aos-once="true"
        class="shadow-lg rounded-lg flex-1">
      </Abnormal>
      <DownloadStatic 
        v-if="!selectedCountyId"
        :data-aos="fadeUpLeft"
        data-aos-duration="1300"
        data-aos-once="true"
        class="shadow-lg rounded-lg flex-1">
      </DownloadStatic>

    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

import Map from '@/components/Dashboard/Map/Map'
import Static from '@/components/Dashboard/Static/Static'
import Abnormal from '@/components/Dashboard/Abnormal/Abnormal'
import DownloadStatic from '@/components/Dashboard/DownloadStatic/DownloadStatic'
export default {
  components:{
    Map,
    Static,
    Abnormal,
    DownloadStatic
  },
  data(){
    return{
      fadeUpLeft:'fade-up-left',
      fadeLeft:'fade-left',
      fadeDownLeft:'fade-down-left'
    }
  },
  methods:{
    removeAnimation(){
      this.fadeUpLeft = ''
      this.fadeLeft = ''
      this.fadeDownLeft = ''
    },
    recoverAnimation(){
      this.fadeUpLeft = 'fade-up-left'
      this.fadeLeft = 'fade-left'
      this.fadeDownLeft = 'fade-down-left'
    },
    resizeHandler(e){
      window.innerWidth < 768 ? this.removeAnimation() : this.recoverAnimation()
    }
  },
  computed:{
    ...mapState({
      selectedCountyId: state => state.selectedCountyId
    })
  },
  created(){
    window.addEventListener('resize', this.resizeHandler)
    window.innerWidth < 768 ? this.removeAnimation() : this.recoverAnimation()
  },
  destroyed(){
    window.removeEventListener('resize', this.resizeHandler)
  }

}
</script>

<style>

</style>