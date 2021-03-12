<template>
  <!-- <div 
    class="rounded-full h-24 w-24 border flex items-center justify-center  "
    :class="{ 
      'bg-normal-green' : classObj.normal,
      'bg-watch': classObj.watch, 
      'bg-warning':classObj.warning,

    }"
  >
    <div class="text-3xl text-white ">
      {{ circuitCnt }}
    </div>
  </div> -->
  <div>
    <svg 
      class="h-24 w-24 fill-current" 
      :class="{ 
        'text-normal-green' : classObj.normal,
        'text-watch': classObj.watch, 
        'text-warning':classObj.warning,
      }"
      version="1.1" viewBox="0 0 16 16">
      <g>
        <circle cx="8" cy="8" r="8">
        </circle>
        <text x="50%" y="50%" text-anchor="middle" fill="white" font-size="6px" font-family="Arial" dx="0em" dy=".4em">
          {{ circuitCnt }}
        </text>
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  props:{
    circleType:String,
    circuitCnt:Number
  },
  data(){
    return{
      classObj:{
        normal: this.circleType == 'normal' ? true : false,
        watch: this.circleType == 'watch' ? true : false, 
        warning: this.circleType == 'warning' ? true : false
      }
    }
  },
  computed:{},
  mounted(){

  }
}
</script>

<style>

</style>
