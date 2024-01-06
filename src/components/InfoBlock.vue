<script setup lang="ts">
interface Props {
  title: string;
  text: string;
  imageUrl: string;
}

const { title, text, imageUrl } = defineProps<Props>();
</script>

<template>
  <div class="flex flex-col items-center text-center mx-auto w-72">
    <img width="70" height="70" :src="imageUrl" alt="info image" />
    <h2 class="text-2xl">{{ title }}</h2>
    <p class="text-gray-400 mt-2">{{ text }}</p>
  </div>
</template>
