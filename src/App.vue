<script setup>
import { computed, onMounted, ref, useTemplateRef, watch } from "vue";
import SliderVue from "./components/SliderVue.vue";

const item = useTemplateRef("item");
const itemRef = ref();
const country = ref("");
const region = ref("");
const breakpoints = {
  1050: 5,
  850: 4,
  650: 3,
  450: 2,
  200: 1,
};
const counter = ref(0);
const total = 10;
const active = ref(false);
const debug = ref("animate-close-door");

onMounted(() => {
  itemRef.value = item.value;
});
const rotation = computed(() => {
  return active.value ? "rotation" : "";
});
function openCover() {
  // setTimeout(()=>{
  // 	debug.value = "animate-open-flip"
  // },2000)
  if (debug.value == "animate-close-door") {
    debug.value = "animate-open-flip";
  } else {
    debug.value = "animate-close-door";
  }
}


// openCover()
</script>

<template>
  <main class="duration-200 bg-background">
    <section class="body h-screen w-full">
    

      <SliderVue
      :breakpoints="breakpoints"
      buttons="rounded"
      navigation="outline-morph-bars" 
      :infinite="true"
      >
        <div
          v-for="i in 10"
          :key="i"
          class="w-[200px] h-[200px] bg-green-500"
        ></div>
      </SliderVue>

    </section>
  </main>
</template>

<style scoped>
.open-cover {
  display: none !important;
}
</style>
