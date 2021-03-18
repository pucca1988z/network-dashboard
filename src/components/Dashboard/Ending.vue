<template>
  <div>
    <iframe 
      class="w-screen h-screen" 
      src="/ending.html"  
      ref="endingiframe" 
    >
    </iframe>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data(){
    return {}
  },
  methods: {
    clickEndingAnimation: function () {
      this.$store.dispatch('clickEndingAnimation', true)
    }
  },
  created () {
    let self = this
    window.onIframeClick = () => {
      self.clickEndingAnimation()
    }
  },
  computed: {
    ...mapState({
      isClickEndingAnimation: state => state.isClickEndingAnimation
    })
  }
}
</script>

<style>

</style>