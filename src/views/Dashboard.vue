<template>
  <div>
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
    <Loading></Loading>
    <transition>
      <Ending 
        class="border absolute h-screen w-screen top-0 left-0 rounded-md text-sm overflow-y-hidden overflow-x-hidden"
        v-if="isClickEndingAnimation!=null && !isClickEndingAnimation"
      >
      </Ending >
    </transition>
    <audio ref="loadedAudio">
      <source src="/online.mp3" type="audio/mpeg">
    </audio>
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
import Ending from '@/components/Dashboard/Ending'

export default {
  components:{
    Map,
    Static,
    Abnormal,
    DownloadStatic,
    CrossHeader, 
    Loading,
    Ending
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
  watch:{
    getLoadedCountiesCnt: function () {
      // if(this.selectedCountyId == null) this.$refs.loadedAudio.play()
    }
  },
  computed:{
    ...mapState({
      selectedCountyId: state => state.selectedCountyId,
      isClickOpeningAnimation: state => state.isClickOpeningAnimation,
      isClickEndingAnimation: state => state.isClickEndingAnimation
    }),
    ...mapGetters({
      getLoadedCountiesCnt: 'getLoadedCountiesCnt'
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
  .v-leave {
    opacity: 1;
  }
  .v-leave-active {
    transition: opacity 0.5s;
  }
  .v-leave-to {
    opacity: 0;
  }
  .v-enter {
    opacity: 0;
  }
  .v-enter-active {
    transition: opacity 0.5s;
  }
  .v-enter-to {
    opacity: 1;
  }
</style>