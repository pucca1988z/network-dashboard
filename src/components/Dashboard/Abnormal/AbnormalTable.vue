<template>
  <div class="py-2 px-4 flex flex-col content-center ">
    <div class="flex flex-row  border-gray-400 border bg-indigo-400 font-bold text-center">
      <div class="flex-1 border  border-gray-400">縣市</div>
      <div class="flex-1 border  border-gray-400">行政區</div>
      <div class="flex-1 border  border-gray-400">單位</div>
      <div class="flex-1 border  border-gray-400">事件類別</div>
      <div class="flex-1 border  border-gray-400">事件內容</div>
    </div>
    <div 
      class="border-gray-400 border-4 h-36 border-dashed text-center pt-14 text-gray-400 text-3xl font-extrabold"
      v-if="!selectedCountyId || getRawDataByCountyId(selectedCountyId).length == 0"
    >
      尚無資料
    </div>
    <div 
      class="flex flex-row  border-gray-400 border-b "
      data-aos="fade-left"
      v-else
      v-for="(data, key) in getRawDataByCountyId(selectedCountyId).slice(abnormalPage * 5, abnormalPage * 5 + 5)" :key="key"
    >
      <div class="flex-1 border  border-gray-400 px-2">{{ data.county }}</div>
      <div class="flex-1 border  border-gray-400 px-2">{{ data.district }}</div>
      <div class="flex-1 border  border-gray-400 px-2">{{ data.name }}</div>
      <div class="flex-1 border  border-gray-400 px-2">連線狀態</div>
      <div class="flex-1 border  border-gray-400 px-2">已連線</div>
    </div>
    
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  computed:{
    ...mapGetters({
      getRawDataByCountyId:'getRawDataByCountyId'
    }),
    ...mapState({
      selectedCountyName: state => state.selectedCountyName,
      selectedCountyId: state => state.selectedCountyId,
      selectedDistrict: state => state.selectedDistrict, 
      selectedDistrictId: state => state.selectedDistrictId,
      abnormalPage: state => state.abnormalPage
    })
  }
}
</script>

<style>

</style>