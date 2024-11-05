<script setup>
import { useSwipe, useWindowSize } from "@vueuse/core";
import { onMounted, onUpdated, ref, watch, useTemplateRef } from "vue";

const {
  itemsToShow,
  buttons,
  navigation,
  breakpoints,
  autoPlay,
  gap,
  animationType,
  stagger
} = defineProps([
  "items-to-show",
  "buttons",
  "navigation",
  "breakpoints",
  "auto-play",
  "gap",
  "animation-type",
  "stagger"
]);

const { width } = useWindowSize();
let counter = defineModel();
const element = useTemplateRef("element");

const { isSwiping, direction } = useSwipe(element);

const innerWidth = ref("w-0");
const itemToShow = ref(itemsToShow);
const finalWidth = ref(0);
const gapProp = ref(gap ? gap : "10");
const gapClass = ref(`gap: ${gapProp.value}px`);
const moveTranslate = ref("transform:translateX(0px)");
const translation = ref("");
const slideElements = ref(0);
const duration = ref("duration-200");
const animationName = ref(animationType)

const animation = ref({
  translateUp: ["translate-up-off", "translate-up-on"],
  translateDown: ["translate-down-off", "translate-down-on"],
  scale: ["scale-off", "scale-on"],
  rotate:["circle-off", "circle-on"],
  none: ["none", "none"],
});
if (animationType == undefined) {
  animationName.value = "none";
}

const correction = animation.value[animationName.value][0];


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
function moveSlider(direction) {
  if (direction == "right") {
    if (counter.value < slideElements.value - itemToShow.value) {
      counter.value++;
      goToAnimate(1);
    } else {
      counter.value = 0;
      goToAnimate(1);
    }
  } else {
    if (counter.value != 0) {
      counter.value--;
      goToAnimate(2);
    } else {
      counter.value = slideElements.value - itemToShow.value;
      goToAnimate(2);
    }
  }

  translation.value =
    (innerWidth.value + parseInt(gapProp.value)) * counter.value;
  moveTranslate.value = "transform:translateX(" + translation.value + "px)";
}
function moveAnimation(miliseconds) {
  let count = 0;
  const interval = setInterval(() => {
    if (count < itemToShow.value) {
      element.value.children[count].classList.add(
        animation.value[animationName.value][1]
      );
      element.value.children[count].classList.remove(
        animation.value[animationName.value][0]
      );
      count++;
    } else {
      count = 0;
      clearInterval(interval);
    }
  }, miliseconds);
}
function goTo(pos) {
  counter.value = pos;
  translation.value =
    (innerWidth.value + parseInt(gapProp.value)) * counter.value;
  moveTranslate.value = "transform:translateX(" + translation.value + "px)";
  goToAnimate(4);
}
function goToAnimate(pos) {
  let index = 0;

  const goToInterval = setInterval(() => {
    if (index >= counter.value && index < itemToShow.value + counter.value) {
      element.value.children[index].classList.remove(
        animation.value[animationName.value][0]
      );
      element.value.children[index].classList.add(
        animation.value[animationName.value][1]
      );
    } else {
      element.value.children[index].classList.remove(
        animation.value[animationName.value][1]
      );
      element.value.children[index].classList.add(
        animation.value[animationName.value][0]
      );
    }

    index++;

    if (index == slideElements.value) {
      clearInterval(goToInterval);
    }
  }, 25);
}
function autoplay() {
  setInterval(() => {
    moveSlider("right");
  }, autoPlay);
}

if (counter.value == undefined) {
  counter = ref(0);
}
if (itemToShow.value == undefined) {
  checkBreakpoint();
}


if (autoPlay) {
  autoplay();
}

watch(isSwiping, () => {
  if (isSwiping) {
    if (direction.value == "right") {
      moveSlider("left");
    } else {
      moveSlider("right");
    }
  }
});

watch(counter, () => {
  translation.value =
    (innerWidth.value + parseInt(gapProp.value)) * -counter.value;
  moveTranslate.value = "transform:translateX(" + translation.value + "px)";
});

watch(width, () => {
  checkBreakpoint();
});

onMounted(() => {
  slideElements.value = element.value.childElementCount;
  innerWidth.value = element.value.children[0].offsetWidth;

  finalWidth.value =
    innerWidth.value * itemToShow.value +
    gapProp.value * (itemToShow.value - 1);
  for (let index = 0; index < element.value.children.length; index++) {
    element.value.children[index].classList.add(correction);
  }
  moveAnimation(stagger?stagger:100);
});

onUpdated(() => {
  slideElements.value = element.value.childElementCount;
  innerWidth.value = element.value.children[0].offsetWidth;
  finalWidth.value =
    innerWidth.value * itemToShow.value +
    gapProp.value * (itemToShow.value - 1);
});
</script>

<template>
  <section class="flex flex-col justify-center items-center">
    <div class="flex items-center gap-4">
      <button
        v-if="buttons"
        class="block w-10 p-2 translate-x-14 relative z-[1]"
        @click="moveSlider('left')"
      >
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

      <section
        :style="`width: ${finalWidth}px`"
        class="h-fit py-10 overflow-hidden"
      >
        <div
          ref="element"
          :style="[gapClass, moveTranslate]"
          :class="duration"
          class="flex justify-start w-fit ease-in-out relative"
        >
          <slot></slot>
        </div>
      </section>

      <button
        v-if="buttons"
        class="block p-2 w-10 -translate-x-14 relative z-[1]"
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
          :class="[counter == -items + 1 ? 'bg-gray-600' : 'bg-gray-400']"
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
          :class="[counter == -items + 1 ? 'bg-gray-600' : 'bg-gray-400']"
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
          :class="[counter == -items + 1 ? 'bg-gray-600' : 'bg-gray-400']"
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
          :class="[counter == -items + 1 ? 'bg-gray-600' : 'bg-transparent']"
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
          :class="[counter == -items + 1 ? 'bg-gray-600' : 'bg-transparent']"
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
          :class="[counter == -items + 1 ? 'bg-gray-600' : 'bg-transparent']"
          class="border border-gray-700 w-3 h-3 hover:bg-gray-600 duration-200"
          @click="goTo(items - 1)"
        ></button>
      </div>
    </div>
  </section>
</template>


<style scoped>
:slotted(.translate-up-off) {
  transform: translateY(120%);
  opacity: 0;
}

:slotted(.translate-up-on) {
  animation: showUp 0.7s ease-in-out;
}

:slotted(.translate-down-off) {
  transform: translateY(-120%);
  opacity: 0;
}
:slotted(.translate-down-on) {
  animation: showDown 0.7s ease-in-out;
}

:slotted(.scale-off) {
  transform: scale(0);
  opacity: 0;
}
:slotted(.scale-on) {
  animation: scale 0.3s ease-in-out;
}
:slotted(.circle-off) {
  transform: rotate(360deg) scale(0);

  opacity: 0;
}
:slotted(.circle-on) {
  animation: rotate 0.3s ease-in-out;
}

@keyframes showUp {
  0% {
    transform: translateY(2000%);
    opacity: 0;
  }
  70% {
    transform: translateY(-20%);
  }
  90% {
    transform: translateY(5%);
    opacity: 1;
  }
  100% {
    transform: translateY(0%);
  }
}

@keyframes showDown {
  0% {
    transform: translateY(-2000%);
    opacity: 0;
  }
  70% {
    transform: translateY(20%);
  }
  90% {
    transform: translateY(-5%);
    opacity: 1;
  }
  100% {
    transform: translateY(0%);
  }
}

@keyframes scale {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  70% {
    opacity: 1;
  }

  100% {
    transform: scale(1);
  }
}

@keyframes rotate {
  0% {
    transform: rotate(360deg) scale(0);
    opacity: 0;
  }

  100% {
    transform: rotate(0deg) scale(1);
  }
}

</style>