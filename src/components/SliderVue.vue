<script setup>
import { ref, onMounted, computed, watch, onUpdated } from "vue";
import { useWindowSize } from "@vueuse/core";
const { width, height } = useWindowSize();

const { itemsToShow, buttons, navigation, breakpoints, autoPlay, gap } = defineProps(
  ["items-to-show", "buttons", "navigation", "breakpoints", "autoPlay","gap"]
);

let count = defineModel();


const el = ref(null);
const innerWidth = ref("w-0");
const itemToShow = ref(itemsToShow);
const finalWidth = ref(0);
const gapProp = ref(gap?gap:"10");
const gapClass = ref(`gap: ${gapProp.value}px`);
const moveTranslate = ref("transform:translateX(0px)");
const translation = ref("");
const slideElements = ref("");

if (count.value == undefined) {
  count = ref(0);
}

function searchBreakpoints(keys) {
  let pos = 0;
  for (let index = 0; index < keys.length; index++) {
    if (keys[index] <= width.value) {
      pos = index;
    }
  }
  return keys[pos];
  
}
function checkBreakpoint() {
  let keys = [];
  let values = [];
  for (const [key, value] of Object.entries(breakpoints)) {
    keys.push(parseInt(key));
    values.push(parseInt(value));
  }

  let actualPosition = searchBreakpoints(keys);
  itemToShow.value = breakpoints[actualPosition]; 
  
  
}
checkBreakpoint();

watch(width,()=>{
  checkBreakpoint();
  console.log(itemToShow.value);
})

function moveSlider(direction) {
  if (direction == "right") {
    if (count.value != -(slideElements.value - itemToShow.value)) {
      count.value = count.value - 1;
    } else {
      count.value = 0;
    }
  } else {
    console.log("left");

    if (count.value != 0) {
      count.value = count.value + 1;
    } else {
      count.value = -(slideElements.value - itemToShow.value);
    }
  }

  translation.value = (innerWidth.value + parseInt(gapProp.value)) * count.value;
  moveTranslate.value = "transform:translateX(" + translation.value + "px)";
}
function goTo(pos) {
  count.value = -pos;
  translation.value = (innerWidth.value + parseInt(gapProp.value)) * count.value;
  moveTranslate.value = "transform:translateX(" + translation.value + "px)";
}

function autoplay() {
  setInterval(() => {
    moveSlider("right");
  }, autoPlay);
}

if (autoPlay) {
  autoplay();
}

onMounted(() => {
  slideElements.value = el.value.childElementCount;
  innerWidth.value = el.value.children[0].offsetWidth;
  finalWidth.value = innerWidth.value * itemToShow.value + gapProp.value * (itemToShow.value - 1);
});

onUpdated(()=>{
  slideElements.value = el.value.childElementCount;
  innerWidth.value = el.value.children[0].offsetWidth;
  finalWidth.value = innerWidth.value * itemToShow.value + gapProp.value * (itemToShow.value - 1);
})
</script>

<template>
  <section class="flex flex-col items-center">
    <div class="flex items-center gap-4">
      <button v-if="buttons" class="block w-10 p-2" @click="moveSlider('left')">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          class="w-full fill-gray-400 hover:fill-gray-600 duration-200"
        >
          <path
            d="M512 256A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM271 135c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-87 87 87 87c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L167 273c-9.4-9.4-9.4-24.6 0-33.9L271 135z"
          />
        </svg>
      </button>

      <section :style="`width: ${finalWidth}px`" class="overflow-x-hidden">
        <div
          ref="el"
          :style="[gapClass, moveTranslate]"
          class="flex justify-start w-fit duration-200 ease-in-out"
        >
          <slot></slot>
        </div>
      </section>
      <button
        v-if="buttons"
        class="block p-2 w-10"
        @click="moveSlider('right')"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          class="w-full fill-gray-400 hover:fill-gray-600 duration-200"
        >
          <path
            d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM241 377c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l87-87-87-87c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L345 239c9.4 9.4 9.4 24.6 0 33.9L241 377z"
          />
        </svg>
      </button>
    </div>
    <div
      id="rounded"
      v-if="slideElements != 0 && navigation == 'rounded'"
      class="flex gap-1"
    >
      <div v-for="items in slideElements - itemToShow + 1" :key="items">
        <button
          :class="[count == -items + 1 ? 'bg-gray-600' : 'bg-gray-400']"
          class="border w-4 h-4 rounded-full hover:bg-gray-600 duration-200"
          @click="goTo(items - 1)"
        ></button>
      </div>
    </div>
    <div
      id="rectangle"
      v-if="slideElements != 0 && navigation == 'rectangle'"
      class="flex gap-1"
    >
      <div v-for="items in slideElements - itemToShow + 1" :key="items">
        <button
          :class="[count == -items + 1 ? 'bg-gray-600' : 'bg-gray-400']"
          class="border w-4 h-2 hover:bg-gray-600 duration-200"
          @click="goTo(items - 1)"
        ></button>
      </div>
    </div>
    <div
      id="square"
      v-if="slideElements != 0 && navigation == 'square'"
      class="flex gap-1"
    >
      <div v-for="items in slideElements - itemToShow + 1" :key="items">
        <button
          :class="[count == -items + 1 ? 'bg-gray-600' : 'bg-gray-400']"
          class="border w-3 h-3 hover:bg-gray-600 duration-200"
          @click="goTo(items - 1)"
        ></button>
      </div>
    </div>
    <div
      id="border-rounded"
      v-if="slideElements != 0 && navigation == 'border-rounded'"
      class="flex gap-1"
    >
      <div v-for="items in slideElements - itemToShow + 1" :key="items">
        <button
          :class="[count == -items + 1 ? 'bg-gray-600' : 'bg-transparent']"
          class="border border-gray-700 w-4 h-4 rounded-full hover:bg-gray-600 duration-200"
          @click="goTo(items - 1)"
        ></button>
      </div>
    </div>
    <div
      id="border-rectangle"
      v-if="slideElements != 0 && navigation == 'border-rectangle'"
      class="flex gap-1"
    >
      <div v-for="items in slideElements - itemToShow + 1" :key="items">
        <button
          :class="[count == -items + 1 ? 'bg-gray-600' : 'bg-transparent']"
          class="border border-gray-700 w-4 h-2 hover:bg-gray-600 duration-200"
          @click="goTo(items - 1)"
        ></button>
      </div>
    </div>
    <div
      id="border-square"
      v-if="slideElements != 0 && navigation == 'border-square'"
      class="flex gap-1"
    >
      <div v-for="items in slideElements - itemToShow + 1" :key="items">
        <button
          :class="[count == -items + 1 ? 'bg-gray-600' : 'bg-transparent']"
          class="border border-gray-700 w-3 h-3 hover:bg-gray-600 duration-200"
          @click="goTo(items - 1)"
        ></button>
      </div>
    </div>
  </section>
</template>


