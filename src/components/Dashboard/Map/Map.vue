<template>
  <div class="">
    <header 
      class="border rounded-t-lg h-12 purple-to-green-header flex items-center flex-row px-4">
      <div class="flex-1 flex space-x-2">
        <svg 
          class="h-5 w-5 fill-current text-white cursor-pointer" 
          viewBox="0 1 511 511.999" xmlns="http://www.w3.org/2000/svg">
          <path d="m498.699219 222.695312c-.015625-.011718-.027344-.027343-.039063-.039062l-208.855468-208.847656c-8.902344-8.90625-20.738282-13.808594-33.328126-13.808594-12.589843 0-24.425781 4.902344-33.332031 13.808594l-208.746093 208.742187c-.070313.070313-.144532.144531-.210938.214844-18.28125 18.386719-18.25 48.21875.089844 66.558594 8.378906 8.382812 19.441406 13.234375 31.273437 13.746093.484375.046876.96875.070313 1.457031.070313h8.320313v153.695313c0 30.417968 24.75 55.164062 55.167969 55.164062h81.710937c8.285157 0 15-6.71875 15-15v-120.5c0-13.878906 11.292969-25.167969 25.171875-25.167969h48.195313c13.878906 0 25.167969 11.289063 25.167969 25.167969v120.5c0 8.28125 6.714843 15 15 15h81.710937c30.421875 0 55.167969-24.746094 55.167969-55.164062v-153.695313h7.71875c12.585937 0 24.421875-4.902344 33.332031-13.8125 18.359375-18.367187 18.367187-48.253906.027344-66.632813zm-21.242188 45.421876c-3.238281 3.238281-7.542969 5.023437-12.117187 5.023437h-22.71875c-8.285156 0-15 6.714844-15 15v168.695313c0 13.875-11.289063 25.164062-25.167969 25.164062h-66.710937v-105.5c0-30.417969-24.746094-55.167969-55.167969-55.167969h-48.195313c-30.421875 0-55.171875 24.75-55.171875 55.167969v105.5h-66.710937c-13.875 0-25.167969-11.289062-25.167969-25.164062v-168.695313c0-8.285156-6.714844-15-15-15h-22.328125c-.234375-.015625-.464844-.027344-.703125-.03125-4.46875-.078125-8.660156-1.851563-11.800781-4.996094-6.679688-6.679687-6.679688-17.550781 0-24.234375.003906 0 .003906-.003906.007812-.007812l.011719-.011719 208.847656-208.839844c3.234375-3.238281 7.535157-5.019531 12.113281-5.019531 4.574219 0 8.875 1.78125 12.113282 5.019531l208.800781 208.796875c.03125.03125.066406.0625.097656.09375 6.644531 6.691406 6.632813 17.539063-.03125 24.207032zm0 0"/>
        </svg>
        <div 
          id="zoomOutToCountry"
          class="cursor-pointer"
          :class="{'underline': selectedCountyName}"
          @click="zoomOut">
          全縣市
        </div>

        <div v-if="selectedCountyName">
          / 
        </div>
        <div 
          id="zoomOutToCounty"
          v-if="selectedCountyName" 
          :class="{ 
            'cursor-pointer' : selectedDistrict, 
            'underline' : selectedDistrict 
          }"
        >
          {{ selectedCountyName }} 
        </div>

        <div v-if="selectedDistrict">
          / 
        </div>
        <div v-if="selectedDistrict">
          {{ selectedDistrict }} 
        </div>

      </div>
      <div class="flex space-x-2">
        <svg 
          class="h-5 w-5 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
        </svg>
      </div>
    </header>
    <nav class="grid grid-cols-4 gap-4 text-center py-2 px-4">
      <div 
        v-for="(btn,ind) of btns" :key="ind" 
        class="blue-btn ">
        {{ btn.text }}
      </div>
    </nav>
    <main>
      <MapCore></MapCore>
    </main>
    <ColorHint></ColorHint>
  </div>
</template>

<script>
import { mapState } from "vuex";
import MapCore from '@/components/Dashboard/Map/MapCore'
import ColorHint from '@/components/Dashboard/Map/ColorHint'
export default {
  components:{
    MapCore, 
    ColorHint,

  },
  data(){
    return{
      btns:[
        {text:'總覽', clicked:false},
        {text:'電路層監測', clicked:false},
        {text:'頻寬量測', clicked:false},
        {text:'資安通報', clicked:false}
      ]
    }
  },
  computed:{
    ...mapState({
      selectedCountyName: state => state.selectedCountyName,
      selectedCountyId: state => state.selectedCountyId,
      selectedDistrict: state => state.selectedDistrict, 
      selectedDistrictId: state => state.selectedDistrictId
    })
  },
  methods:{
    zoomOut(){
      this.$store.dispatch('setSelectedPathData', {
        selectedCountyName: null,
        selectedCountyId: null,
        selectedDistrict: null, 
        selectedDistrictId: null,
      })
    }
  }
}
</script>

<style>

</style>