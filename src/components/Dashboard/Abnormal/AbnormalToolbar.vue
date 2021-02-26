<template>
  <div class="flex justify-end ">
    <div class="flex flex-row space-x-8 pt-1 pr-4">
      <div 
        class="px-4 py-1 rounded-lg border-2 text-white cursor-pointer bg-gray-700 duration-500"
        @click="previousPage"
      >
        上一頁
      </div>
      <div 
        class="px-4 py-1 rounded-lg border-2 text-white cursor-pointer bg-gray-700 duration-500"
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