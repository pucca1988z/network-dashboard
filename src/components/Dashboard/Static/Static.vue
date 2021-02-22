<template>
  <div>
    <header 
      class="border rounded-t-lg h-12 purple-to-green-header flex items-center flex-row px-4">
      <div class="flex-1 flex space-x-2">
        <div>
          縣市統計資料
        </div>
      </div>
      <div class="flex space-x-2">
        <svg 
          class="h-5 w-5 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
        </svg>
      </div>
    </header>

    <div class="grid grid-cols-3">
      <div class="col-start-3 col-end-4 flex flex-row">
        <div>更新時間：</div>
        <div>{{ new Date().toLocaleString() }}</div>
      </div>
    </div>
    
    <main class="grid grid-cols-3 space-x-6 px-4">
      <div class="shadow-lg">
        <header class="rounded-t-lg h-12 purple-to-green-header pt-3 px-4">電路層監測</header>
        <main 
          class="grid grid-cols-3 grid-rows-1 gap-x-2 my-2 px-4"
        >
          <CircleInfo></CircleInfo>
          <CircleInfo></CircleInfo>
          <CircleInfo></CircleInfo>
        </main>
      </div>
      <div class="shadow-lg">
        <header class="rounded-t-lg h-12 purple-to-green-header pt-3 px-4">頻寬量測</header>
        <main 
          class="grid grid-cols-3 grid-rows-1 gap-x-2 my-2 px-4"
        >
          <CircleInfo></CircleInfo>
          <CircleInfo></CircleInfo>
          <CircleInfo></CircleInfo>
        </main>
      </div>
      <div class="shadow-lg">
        <header class="rounded-t-lg h-12 purple-to-green-header pt-3 px-4">資安通報</header>
        <main 
          class="grid grid-cols-3 grid-rows-1 gap-x-2 my-2 px-4"
        >
          <CircleInfo></CircleInfo>
          <CircleInfo></CircleInfo>
          <CircleInfo></CircleInfo>
        </main>
      </div>
    </main>
  </div>
</template>

<script>
import CircleInfo from "@/components/Dashboard/Static/CircleInfo.vue";
export default {
  components:{
    CircleInfo
  }
}
</script>

<style>

</style>