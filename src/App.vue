<script setup>
import { ref } from 'vue';
import SliderVue from './components/SliderVue.vue';

const breakpoints = {
  '720':5,
  '480':1
}
const counter = ref(0)

</script>

<template>
  <main  class="duration-200 bg-background">

    <div class=" w-full">
        <SliderVue :buttons="true" navigation="rounded" :breakpoints="breakpoints"   >
          <div v-for="i in 9" :class="`bg-green-${i}00`" class="h-[300px] w-60  bg-green-100 flex items-center justify-center text-3xl" :key="i">{{ i }}</div>
            <!-- <div  class="h-[300px] w-60  bg-green-100 flex items-center justify-center text-3xl" >1</div>
            <div  class="h-[300px] w-60  bg-green-100 flex items-center justify-center text-3xl" >2</div>
            <div  class="h-[300px] w-60  bg-green-100 flex items-center justify-center text-3xl" >3</div>
            <div  class="h-[300px] w-60  bg-green-100 flex items-center justify-center text-3xl" >4</div> -->

        </SliderVue>
        <button class="border p-3" @click="counter--">
          <
        </button>
        <button class="border p-3" @click="counter++">
          >
        </button>
   
    </div>
 

  </main>
</template>
