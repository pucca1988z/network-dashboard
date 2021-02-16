<template>
  <div>
    <header 
      class="border rounded-t-lg h-12 purple-to-green-header flex items-center flex-row px-4">
      <div class="flex-1 flex space-x-2">
        <div>
          近期異常事件
        </div>
        <button class=" border border-blue-600 w-28 rounded-xl bg-blue-600 hover:bg-blue-700 duration-300">
          歷史紀錄
        </button>
      </div>
      <div class="flex space-x-2">
        <svg 
          class="h-5 w-5 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
        </svg>
      </div>
    </header>
    <main>table</main>
    <footer>tool bar</footer>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>