<template>
  <div class=" grid md:grid-cols-6 md:grid-rows-3 gap-5">
    <Map 
      data-aos="fade-right" 
      data-aos-duration="1300"
      data-aos-once="true"
      class=" md:col-start-1 md:col-end-3 md:row-start-1 md:row-end-4 shadow-lg rounded-lg ">
    </Map>
    <Static 
      :data-aos="fadeDownLeft"
      data-aos-duration="1300"
      data-aos-once="true"
      class="md:col-span-4 shadow-lg rounded-lg">
    </Static>
    <Abnormal 
      :data-aos="fadeLeft" 
      data-aos-duration="1300"
      data-aos-once="true"
      class="md:col-span-4 shadow-lg rounded-lg">
    </Abnormal>
    <DownloadStatic 
      :data-aos="fadeUpLeft"
      data-aos-duration="1300"
      data-aos-once="true"
      class="md:col-span-4 shadow-lg rounded-lg">
    </DownloadStatic>
  </div>
</template>

<script>
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