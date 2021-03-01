<template>
  <div class="px-6 pb-4 -mt-36">
    <div class=" font-bold text-gray-700 ">圖示說明</div>
    <div class=" text-xs space-y-1">
      <div class="flex space-x-2">
        <div 
          class="w-4 h-4 border border-gray-400"
          :style="{'background-color':hintColor.get('normal')}"
        ></div>
        <div>正常</div>
      </div>
      <div class="flex space-x-2">
        <div 
          class="w-4 h-4 border border-gray-400"
          :style="{'background-color':hintColor.get('watch')}"        
        ></div>
        <div>注意</div>
      </div>
      <div class="flex space-x-2">
        <div 
          class="w-4 h-4 border border-gray-400"
          :style="{'background-color':hintColor.get('warning')}"        
        ></div>
        <div>告警</div>
      </div>
      <div class="flex space-x-2">
        <div 
          class="w-4 h-4 border border-gray-400"
          :style="{'background-color':hintColor.get('noData')}"        
        ></div>
        <div>無資料/資料異常</div>
      </div>
      <div class="flex space-x-2">
        <div 
          class="w-4 h-4 border border-gray-400"
          :style="{'background-color':hintColor.get('selected')}"        
        ></div>
        <div>選取區域</div>
      </div>

    </div>
  </div>
</template>

<script>
import * as d3 from 'd3'
import { mapState } from "vuex";
export default {
  mounted(){

  },
  computed:{
    ...mapState({
      hintColor: state => state.hintColor
    })
  }
}
</script>

<style>

</style>