<template>
  <div class="flex justify-end ">
    <div class="flex flex-row space-x-8 pt-1 pr-4">
      <div 
        class="px-4 py-1 rounded-lg border-2 bg-gray-400 text-white cursor-pointer hover:bg-gray-700 duration-500"
        @click="previousPage"
      >
        上一頁
      </div>
      <div 
        class="px-4 py-1 rounded-lg border-2 bg-gray-400 text-white cursor-pointer hover:bg-gray-700 duration-500"
        @click="nextPage"
      >
        下一頁
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods:{
    nextPage:function(){
      console.log('nextPage')
    },
    previousPage:function(){
      console.log('previousPage')
    }
  }
}
</script>

<style>

</style>