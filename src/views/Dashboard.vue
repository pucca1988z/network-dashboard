<template>
  <div class=" grid grid-cols-6 grid-rows-3 gap-2">
    <Map 
      data-aos="flip-left" 
      data-aos-duration="1300"
      class=" col-start-1 col-end-3 row-start-1 row-end-4 shadow-lg rounded-lg ">
    </Map>
    <Static 
      data-aos="fade-down-left"
      data-aos-duration="1300"
      class="col-span-4 shadow-lg rounded-lg">
    </Static>
    <Abnormal 
      data-aos="fade-left" 
      data-aos-duration="1300"
      class="col-span-4 shadow-lg rounded-lg">
    </Abnormal>
    <DownloadStatic 
      data-aos="fade-up-left"
      data-aos-duration="1300"
      class="col-span-4 shadow-lg rounded-lg">
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
  }

}
</script>

<style>

</style>