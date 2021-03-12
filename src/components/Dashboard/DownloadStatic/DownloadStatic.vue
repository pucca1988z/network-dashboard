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
        <!-- 
        <svg 
          class="h-5 w-5 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
        </svg> 
        -->
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
