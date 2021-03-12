<template>
  <div>
    <header 
      class="border rounded-t-lg h-12 purple-to-green-header-light flex items-center flex-row px-4">
      <div class="flex-1 flex space-x-2 text-2xl">
        <div>
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
export default {
  components:{
    DownloadTable
  }
}
</script>

<style>

</style>
