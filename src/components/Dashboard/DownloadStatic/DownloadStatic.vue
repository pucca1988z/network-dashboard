<template>
  <div>
    <header 
      class="border rounded-t-lg h-12 purple-to-green-header-light flex items-center flex-row px-4">
      <div class="flex-1 flex space-x-2 text-2xl">
        <div 
          @click="triggerEndingAnimation"
          :class="{
            'cursor-pointer': getLoadedCountiesCnt === 22 && isClickEndingAnimation !== true 
          }"
        >
          下載流量監測
        </div>
      </div>
      <div class="flex space-x-2">
      </div>
    </header>
    <DownloadTable></DownloadTable>
  </div>
</template>

<script>
import DownloadTable from "@/components/Dashboard/DownloadStatic/DownloadTable";
import { mapGetters, mapState } from "vuex";
export default {
  components:{
    DownloadTable
  },
  methods: {
    triggerEndingAnimation: function() {
      if (this.isClickEndingAnimation) return 
      if (this.getLoadedCountiesCnt === 22 ) {
        this.$store.commit('TRIGGER_ENDING_ANIMATION')
      } 
    }
  },
  computed: {
    ...mapGetters({
      getLoadedCountiesCnt: 'getLoadedCountiesCnt'
    }),
    ...mapState({
      isClickEndingAnimation: state => state.isClickEndingAnimation
    })
  }
}
</script>

<style>

</style>
