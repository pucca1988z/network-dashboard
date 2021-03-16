<template>
  <!-- <div class=" grid md:grid-cols-6 md:grid-rows-3 gap-5"> -->
  <div>
    <Loading></Loading>
    <CrossHeader v-if="isClickOpeningAnimation" ></CrossHeader>
    <div 
      class="flex space-x-2 border-l border-b border-r rounded-b-lg border-gray-300 pt-4 pb-10"
      v-if="isClickOpeningAnimation"
    >
      <Map 
        v-if="isClickOpeningAnimation"
        data-aos="fade-right" 
        data-aos-duration="1300"
        data-aos-once="true"
        class="rounded-lg ">
      </Map>
      <div class="flex flex-col flex-1 space-y-4">
        <Static 
          :data-aos="fadeDownLeft"
          data-aos-duration="1300"
          data-aos-once="true"
          class="rounded-lg">
        </Static>
        <Abnormal 
          :data-aos="fadeLeft" 
          data-aos-duration="1300"
          data-aos-once="true"
          class="rounded-lg px-4 flex-1">
        </Abnormal>
        <DownloadStatic 
          :data-aos="fadeUpLeft"
          data-aos-duration="1300"
          data-aos-once="true"
          class="rounded-lg px-4">
        </DownloadStatic>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

import Map from '@/components/Dashboard/Map/Map'
import Static from '@/components/Dashboard/Static/Static'
import Abnormal from '@/components/Dashboard/Abnormal/Abnormal'
import DownloadStatic from '@/components/Dashboard/DownloadStatic/DownloadStatic'
import CrossHeader from '@/components/Dashboard/CrossHeader'
import Loading from '@/components/Dashboard/Loading/Loading'

export default {
  components:{
    Map,
    Static,
    Abnormal,
    DownloadStatic,
    CrossHeader, 
    Loading
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
      selectedCountyId: state => state.selectedCountyId,
      isClickOpeningAnimation: state => state.isClickOpeningAnimation
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