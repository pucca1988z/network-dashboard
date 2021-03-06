<template>
  <div v-show="selectedCountyId" class="flex justify-end ">
    <div class="flex flex-row space-x-2 py-2 pr-4">
      <div 
        class=" px-4 py-1 rounded-lg border-2 text-custPurple text-sm"
        @click="previousPage"
        :class="{
          'cursor-pointer': abnormalPage > 0 ,
          'cursor-not-allowed': abnormalPage == 0,
          'bg-custPurpleForHeader': abnormalPage > 0, 
          'bg-gray-300': abnormalPage == 0
        }"
      >
        上一頁
      </div>
      <div 
        class="px-4 py-1 rounded-lg border-2 text-custPurple text-sm"
        :class="{
          'cursor-not-allowed': getLoadedRawDataByCountyId(selectedCountyId, selectedDistrictId).length <= pagingSize ,
          'cursor-pointer': getLoadedRawDataByCountyId(selectedCountyId, selectedDistrictId).length > pagingSize ,
          'bg-gray-300': getLoadedRawDataByCountyId(selectedCountyId, selectedDistrictId).length <= pagingSize ,
          'bg-custPurpleForHeader':getLoadedRawDataByCountyId(selectedCountyId, selectedDistrictId).length > pagingSize ,
        }"
        @click="nextPage"
      >
        下一頁
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  methods:{
    nextPage:function(){
      if(this.$store.state.abnormalPage +1 * this.pagingSize >= this.getLoadedRawDataByCountyId(this.selectedCountyId, this.selectedDistrictId).length) return
      this.$store.state.abnormalPage ++
    },
    previousPage:function(){
      this.$store.state.abnormalPage == 0 ? 
        0 : 
        this.$store.state.abnormalPage --
    }
  },
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