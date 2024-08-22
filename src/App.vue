<script setup>
import { ref } from 'vue';
import SliderVue from './components/SliderVue.vue';

const breakpoints = {
  '720':3,
  '480':1
}

</script>

<template>
  <main  class="duration-200 bg-background">

    <div class=" w-full">
      <SliderVue :buttons="true" navigation="rectangle" :breakpoints="breakpoints" >
        <div class="h-[300px] w-96  bg-green-100">1</div>
        <div class="h-[300px] w-96  bg-green-200">1</div>
        <div class="h-[300px] w-96  bg-green-300">1</div>
        <div class="h-[300px] w-96  bg-green-300">1</div>
        <div class="h-[300px] w-96  bg-green-300">1</div>
        <div class="h-[300px] w-96  bg-green-300">1</div>
      
        
       
      </SliderVue>
      <SliderVue :buttons="true" navigation="rectangle" :breakpoints="breakpoints" >
        <div class="h-[300px] w-96  bg-green-100">1</div>
        <div class="h-[300px] w-96  bg-green-200">1</div>
        <div class="h-[300px] w-96  bg-green-300">1</div>
        <div class="h-[300px] w-96  bg-green-300">1</div>
        <div class="h-[300px] w-96  bg-green-300">1</div>
        <div class="h-[300px] w-96  bg-green-300">1</div>
      
        
       
      </SliderVue>
    </div>
 

  </main>
</template>
