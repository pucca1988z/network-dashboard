<template>
  <div>
    <!-- 
    <header 
      class="border rounded-t-lg h-12 purple-to-green-header flex items-center flex-row px-4">
      <div v-if="!selectedCountyName" class="flex-1 flex space-x-2">
        <div class="flex flex-row space-x-4 text-2xl">
          <div class=" text-blue-400 "> {{ getCountiesLoadingRecord.length }} </div>
          <div>縣市統計資料</div>
        </div>
      </div>

      <div 
        v-else
        class="flex-1"
      >
        <div class="flex flex-row space-x-2 text-2xl">
          <div class=""> {{ selectedDistrict ? selectedDistrict : selectedCountyName }} </div>
          <div>共</div>
          <div class="text-blue-400" > {{ selectedDistrict ? getDistrictsLoadingRecord.length :  getTotalSchoolsByCountyId(selectedCountyId) }} </div>
          <div>所學校統計資料</div>
        </div>
      </div>

      <div class="flex space-x-2">
        
        <svg 
          class="h-5 w-5 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
        </svg> 
        
      </div>
    </header>
    -->
    <main class="grid grid-cols-3 space-x-6 px-4">
      <div class="shadow-lg h-44">
        <header class="rounded-t-lg h-12 purple-to-green-header-light pt-3 px-4 flex flex-row space-x-2">
          <div class="text-2xl">電路監測</div>
          <!-- 
          <div 
            v-if="!selectedCountyName"
            class="-mt-1 rounded-full h-8 w-8 border-4 flex justify-center bg-white text-gray-400 "
          >
          {{ getCountiesLoadingRecord.length - getLoadedCountiesCnt }}
          </div>
          <div
            class="-mt-1 rounded-full h-8 w-8 border-4 flex justify-center bg-white text-gray-400 "
            v-else
          >
          {{
            selectedDistrict ? 
            getDistrictsLoadingRecord.length - getDistrictsLoadingRecord.filter( x => x.loaded == true).length :
            getTotalSchoolsByCountyId(selectedCountyId) - getLoadedSchoolsByCountyId(selectedCountyId)
          }}
          </div> 
          -->
        </header>
        <main 
          class="grid md:grid-cols-3 md:grid-rows-1 gap-x-2 pt-4  px-4 justify-items-center"
        >
          <CircleInfo 
            circleType="normal" 
            :circuitCnt="getCircleCnt()"
          >
          </CircleInfo>
          <CircleInfo circleType="watch" :circuitCnt="0"></CircleInfo>
          <CircleInfo circleType="warning" :circuitCnt="0"></CircleInfo>
        </main>
      </div>

      <div class="shadow-lg h-44">
        <header class="rounded-t-lg h-12 purple-to-green-header-light pt-3 px-4 flex flex-row space-x-2">
          <div class="text-2xl">頻寬量測</div>
          <!-- 
          <div 
            v-if="!selectedCountyName"
            class="-mt-1 rounded-full h-8 w-8 border-4 flex justify-center bg-white text-gray-400 "
          >
          {{ getCountiesLoadingRecord.length - getLoadedCountiesCnt }}
          </div>
          <div
            class="-mt-1 rounded-full h-8 w-8 border-4 flex justify-center bg-white text-gray-400 "
            v-else
          >
          {{
            selectedDistrict ? 
            getDistrictsLoadingRecord.length - getDistrictsLoadingRecord.filter( x => x.loaded == true).length :
            getTotalSchoolsByCountyId(selectedCountyId) - getLoadedSchoolsByCountyId(selectedCountyId)
          }}
          </div> 
          -->
        </header>
        <main 
          class="grid md:grid-cols-3 md:grid-rows-1 gap-x-2 pt-4  px-4 justify-items-center"
        >
          <CircleInfo 
            circleType="normal" 
            :circuitCnt="getCircleCnt()"
          >
          </CircleInfo>
          <CircleInfo circleType="watch" :circuitCnt="0"></CircleInfo>
          <CircleInfo circleType="warning" :circuitCnt="0"></CircleInfo>
        </main>
      </div>
      
      <div class="shadow-lg h-44">
        <header class="rounded-t-lg h-12 purple-to-green-header-light pt-3 px-4 flex flex-row space-x-2">
          <div class="text-2xl">資安通報</div>
          <!-- 
          <div 
            v-if="!selectedCountyName"
            class="-mt-1 rounded-full h-8 w-8 border-4 flex justify-center bg-white text-gray-400 "
          >
          {{ getCountiesLoadingRecord.length - getLoadedCountiesCnt }}
          </div>
          <div
            class="-mt-1 rounded-full h-8 w-8 border-4 flex justify-center bg-white text-gray-400 "
            v-else
          >
          {{
            selectedDistrict ? 
            getDistrictsLoadingRecord.length - getDistrictsLoadingRecord.filter( x => x.loaded == true).length :
            getTotalSchoolsByCountyId(selectedCountyId) - getLoadedSchoolsByCountyId(selectedCountyId)
          }}
          </div> 
          -->
        </header>
        <main 
          class="grid md:grid-cols-3 md:grid-rows-1 gap-x-2 pt-4  px-4 justify-items-center"
        >
          <CircleInfo 
            circleType="normal" 
            :circuitCnt="getCircleCnt()"
          >
          </CircleInfo>
          <CircleInfo circleType="watch" :circuitCnt="0"></CircleInfo>
          <CircleInfo circleType="warning" :circuitCnt="0"></CircleInfo>
        </main>
      </div>

    </main>
  </div>
</template>

<script>
import CircleInfo from "@/components/Dashboard/Static/CircleInfo.vue";
import { mapState, mapGetters } from "vuex";
export default {
  methods:{
    getCircleCnt(){
      if(this.selectedCountyId == null && this.selectedDistrictId == null){
        return this.getLoadedCountiesCnt
      }else if(this.selectedCountyId != null && this.selectedDistrictId == null){
        return this.getLoadedSchoolsByCountyId(this.selectedCountyId)
      }else{
        return this.getDistrictsLoadingRecord.filter( x => x.loaded == true).length
      }
    }
  },
  components:{
    CircleInfo
  },
  computed:{
    ...mapGetters({
      getLoadedCountiesCnt:'getLoadedCountiesCnt',
      getCountiesLoadingRecord:'getCountiesLoadingRecord',
      getLoadedSchoolsByCountyId:'getLoadedSchoolsByCountyId',
      getTotalSchoolsByCountyId:'getTotalSchoolsByCountyId',
      getDistrictsLoadingRecord:'getDistrictsLoadingRecord'
    }),
    ...mapState({
      selectedCountyName: state => state.selectedCountyName,
      selectedCountyId: state => state.selectedCountyId,
      selectedDistrict: state => state.selectedDistrict, 
      selectedDistrictId: state => state.selectedDistrictId
    })
  },
  mounted(){ }
}
</script>

<style>

</style>
