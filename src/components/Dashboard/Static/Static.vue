<template>
  <div>
    <header 
      class="border rounded-t-lg h-12 purple-to-green-header flex items-center flex-row px-4">
      <div class="flex-1 flex space-x-2">
        <div class="flex flex-row space-x-4 text-xl">
          <div class=""> {{ getLoadedRecordsCountyLevel.length }} </div>
          <div>縣市統計資料</div>
        </div>
      </div>
      <div class="flex space-x-2">
        <svg 
          class="h-5 w-5 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
        </svg>
      </div>
    </header>

    <div class="flex justify-end pr-5 py-3">
      <div class="flex flex-row">
        <div>更新時間：</div>
        <div>{{ new Date().toLocaleString() }}</div>
      </div>
    </div>
    
    <main class="grid grid-cols-3 space-x-6 px-4 ">
      <div class="shadow-lg ">
        <header class="rounded-t-lg h-12 purple-to-green-header pt-3 px-4 flex flex-row space-x-2">
          <div>電路層監測</div>
          <div 
            class="-mt-1 rounded-full h-8 w-8 border-4 flex justify-center bg-white text-gray-400 "
          >
          {{getLoadedRecordsCountyLevel.length - circuitCnt}}
          </div>
        </header>
        <main 
          class="grid md:grid-cols-3 md:grid-rows-1 gap-x-2 my-2 px-4 justify-items-center"
        >
          <CircleInfo circleType="normal" :circuitCnt="circuitCnt"></CircleInfo>
          <CircleInfo circleType="watch"></CircleInfo>
          <CircleInfo circleType="warning"></CircleInfo>
        </main>
      </div>

      <div class="shadow-lg ">
        <header class="rounded-t-lg h-12 purple-to-green-header pt-3 px-4 flex flex-row space-x-2">
          <div>頻寬量測</div>
          <div 
            class="-mt-1 rounded-full h-8 w-8 border-4 flex justify-center bg-white text-gray-400 "
          >11</div>
        </header>
        <main 
          class="grid md:grid-cols-3 md:grid-rows-1 gap-x-2 my-2 px-4 justify-items-center"
        >
          <CircleInfo circleType="normal"></CircleInfo>
          <CircleInfo circleType="watch"></CircleInfo>
          <CircleInfo circleType="warning"></CircleInfo>
        </main>
      </div>
      
      <div class="shadow-lg ">
        <header class="rounded-t-lg h-12 purple-to-green-header pt-3 px-4 flex flex-row space-x-2">
          <div>資安通報</div>
          <div 
            class="-mt-1 rounded-full h-8 w-8 border-4 flex justify-center bg-white text-gray-400 "
          >11</div>
        </header>
        <main 
          class="grid md:grid-cols-3 md:grid-rows-1 gap-x-2 my-2 px-4 justify-items-center"
        >
          <CircleInfo circleType="normal"></CircleInfo>
          <CircleInfo circleType="watch"></CircleInfo>
          <CircleInfo circleType="warning"></CircleInfo>
        </main>
      </div>

    </main>
  </div>
</template>

<script>
import CircleInfo from "@/components/Dashboard/Static/CircleInfo.vue";
export default {
  components:{
    CircleInfo
  },
  computed:{
    getLoadedRecordsCountyLevel(){
      return this.$store.getters.getLoadedRecordsCountyLevel
    },
    circuitCnt(){
      return this.$store.state.circuitCnt
    }
  },
  mounted(){
    this.$store.dispatch('addCountyCircuitCnt')
  }
}
</script>

<style>

</style>