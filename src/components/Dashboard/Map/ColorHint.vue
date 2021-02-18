<template>
  <div class="px-6 pb-4 -mt-32 md:-mt-0">
    <div class=" font-bold text-gray-700 ">圖示說明</div>
    <div class=" text-xs space-y-1">
      <div class="flex space-x-2">
        <div 
          class="w-4 h-4 border border-gray-400"
          :style="{'background-color':hintColor.get('normal')}"
        ></div>
        <div>normal</div>
      </div>
      <div class="flex space-x-2">
        <div 
          class="w-4 h-4 border border-gray-400"
          :style="{'background-color':hintColor.get('watch')}"        
        ></div>
        <div>watch</div>
      </div>
      <div class="flex space-x-2">
        <div 
          class="w-4 h-4 border border-gray-400"
          :style="{'background-color':hintColor.get('warning')}"        
        ></div>
        <div>warning</div>
      </div>
      <div class="flex space-x-2">
        <div 
          class="w-4 h-4 border border-gray-400"
          :style="{'background-color':hintColor.get('noData')}"        
        ></div>
        <div>noData</div>
      </div>
      <div class="flex space-x-2">
        <div 
          class="w-4 h-4 border border-gray-400"
          :style="{'background-color':hintColor.get('selected')}"        
        ></div>
        <div>selected</div>
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