<template>
  <div id="app" class="h-screen">
    <router-view class=" px-0 py-0 md:px-4 md:py-4 min-h-screen overflow-x-hidden overflow-y-hidden "/>
  </div>
</template>

<script>
import './assets/styles/styles.css'

import AOS from 'aos'
import 'aos/dist/aos.css'

export default {
  created(){
    AOS.init()
  }  
}
</script>

<style>

</style>
