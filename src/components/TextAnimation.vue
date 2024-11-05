<script setup>
import { onMounted, ref, useTemplateRef } from "vue";
const item = useTemplateRef("item");
const animate = ref("");
const time = ref(50)

function initializeTextAnimation(miliseconds) {
  const text = item.value.textContent;
  let textToInsert = "";
  for (let index = 0; index < text.length; index++) {
    const element = text[index];
    textToInsert += `<p>${element == " " ? "&nbsp;" : element}</p>`;
  }

  item.value.innerHTML = textToInsert;

  for (let index = 0; index < item.value.children.length; index++) {
    const element = item.value.children[index];
    element.classList.add("duration-500");
    element.style = "transform: translateY(200%) rotate(20deg)";
  }

  let counter = 0;
  const interval = setInterval(() => {
    if (counter <= item.value.children.length - 1) {
      item.value.children[counter].style =
        "animation: showUp 0.7s ease-in-out;";

      counter++;
    } else {
      clearInterval(interval);
    }
  }, miliseconds);
}
function initializeAnimation(miliseconds) {
 

  for (let index = 0; index < item.value.length; index++) {
    const element = item.value.children[index];
    element.classList.add("duration-500");
    element.style = "transform: translateY(200%) rotate(20deg)";
  }

  let counter = 0;
  const interval = setInterval(() => {
    if (counter <= item.value.children.length - 1) {
      item.value.children[counter].style =
        "animation: showUp 0.7s ease-in-out;";

      counter++;
    } else {
      clearInterval(interval);
    }
  }, miliseconds);
}

onMounted(() => {
  initializeTextAnimation(50)
});
</script>

<template>
  <!-- <input type="number" v-model="time">
  <button @click="initializeTextAnimation(time)">Iniciar</button> -->
  <div class="flex items-center justify-center gap-3 border p-10">
    <!-- <h2
      ref="item"
      :class="animate"
      class="border-2 border-green-950 px-10 py-4 overflow-hidden bg-gradient-to-b from-green-700 to-green-400 backdrop-filter backdrop-blur-sm bg-opacity-70 flex items-center justify-center rounded-xl duration-200 text-2xl font-black"
    >
      Texto de prueba
    </h2> -->
    <div
 
      ref="item"
      :class="animate"
      class="border-2 border-green-950 px-10 py-4 overflow-hidden bg-gradient-to-b from-green-700 to-green-400 backdrop-filter backdrop-blur-sm bg-opacity-70 flex items-center justify-center rounded-xl duration-200 text-2xl font-black"
    >
      Texto de prueba
    </div>
  </div>
</template>

<style scoped>
.off {
  transform: translateY(120%) rotate(20deg);
  opacity: 0;
}

.on {
  animation: showUp 0.7s ease-in-out;
}

@keyframes showUp {
  0% {
    transform: translateY(2000%) rotate(20deg);
    opacity: 0;
  }

  70% {
    transform: translateY(-20%);
  }

  90% {
    transform: translateY(5%) rotate(0deg);
    opacity: 1;
  }

  100% {
    transform: translateY(0%);
  }
}
</style>

