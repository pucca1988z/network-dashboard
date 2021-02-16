<template>
  <div id="app" class="h-screen">
    <router-view class=" px-10 py-6 h-full"/>
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
