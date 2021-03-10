<template>
  <div 
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