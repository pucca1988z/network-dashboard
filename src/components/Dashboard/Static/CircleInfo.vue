<template>
  <div 
    class="rounded-full h-24 w-24 border-12 flex items-center justify-center  "
    :class="{ 
      'border-normal-green' : classObj.normal,
      'border-watch': classObj.watch, 
      'border-warning':classObj.warning,
      'text-normal-green' : classObj.normal,
      'text-watch': classObj.watch, 
      'text-warning':classObj.warning
    }"
  >
    <div class="text-3xl ">
      {{ circuitCnt }}
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
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