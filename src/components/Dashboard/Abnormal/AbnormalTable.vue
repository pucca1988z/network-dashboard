<template>
  <div class="py-2 px-4 flex flex-col content-center ">
    <div class="flex flex-row bg-custPurpleForHeader text-center">
      <div class="flex-1 border  border-black border-opacity-20">縣市</div>
      <div class="flex-1 border  border-black border-opacity-20">行政區</div>
      <div class="flex-1 border  border-black border-opacity-20">單位</div>
      <div class="flex-1 border  border-black border-opacity-20">事件類別</div>
      <div class="flex-1 border  border-black border-opacity-20">事件內容</div>
    </div>
    <div 
      class="h-44 text-center pt-14 text-pink-500 text-3xl font-normal"
      v-if="!selectedCountyId || getLoadedRawDataByCountyId(selectedCountyId, selectedDistrictId).length == 0"
    >
      尚無資料
    </div>
    <div 
      class="flex flex-row  border-gray-400 h-9 "
      data-aos="fade-left"
      v-else
      v-for="(data, key) in getLoadedRawDataByCountyId(selectedCountyId, selectedDistrictId).slice(abnormalPage * pagingSize, abnormalPage * pagingSize + pagingSize)" :key="key"
    >
      <div class="flex-1 border  border-black border-opacity-20 px-2 py-1">{{ data.county }}</div>
      <div class="flex-1 border  border-black border-opacity-20 px-2 py-1">{{ data.district }}</div>
      <div class="flex-1 border  border-black border-opacity-20 px-2 py-1 text-normal-green">{{ data.name }}</div>
      <div class="flex-1 border  border-black border-opacity-20 px-2 py-1">連線狀態</div>
      <div class="flex-1 border  border-black border-opacity-20 px-2 py-1 text-normal-green">已連線</div>
    </div>
    
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  computed:{
    ...mapGetters({
      getLoadedRawDataByCountyId:'getLoadedRawDataByCountyId'
    }),
    ...mapState({
      selectedCountyName: state => state.selectedCountyName,
      selectedCountyId: state => state.selectedCountyId,
      selectedDistrict: state => state.selectedDistrict, 
      selectedDistrictId: state => state.selectedDistrictId,
      abnormalPage: state => state.abnormalPage,
      pagingSize: state => state.pagingSize
    })
  }
}
</script>

<style>

</style>