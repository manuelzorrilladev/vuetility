<script setup>
import { onMounted, ref, useTemplateRef, watch} from "vue";
import SliderVue from "./components/SliderVue.vue";

const item = useTemplateRef("item")
const itemRef = ref()
const breakpoints = { 
  720: 5,
  480: 1,
};
const counter = ref(0);
const total = 10;


onMounted(()=>{
  itemRef.value = item.value
 
})
</script>

<template>
  <main class="duration-200 bg-background">
    <section>
      <div
        class="w-full flex items-center justify-center border border-black h-screen gap-4"
      >
 
      <SliderVue
      :breakpoints="breakpoints"
      v-model="counter"
      navigation="border-rounded"
      :buttons="true"
      animationType="scale"
      :stagger="200"
         
        >
          <div
            v-for="i in 10"
            :key="i"
            class="duration-200 h-[300px] w-[200px] bg-gradient-to-b from-green-700 to-green-500 border-2 border-green-950 flex items-center justify-center rounded-lg "
          >
            {{ i }} Hola
          </div>
        </SliderVue>
       
       
      </div>
    </section>
  </main>
</template>

<style scoped>

</style>
