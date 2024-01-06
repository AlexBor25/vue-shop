<script setup lang="ts">
interface Props {
  imageUrl: string;
  title: string;
  price: number;
  deleteHandler: () => void;
}

const { imageUrl, title, price, deleteHandler } = defineProps<Props>();
</script>

<template>
  <article class="flex items-center border border-slate-200 p-4 rounded-xl gap-5">
    <img class="w-16 h-16" @click="deleteHandler" :src="imageUrl" alt="sneaker" />

    <div class="flex flex-col w-full">
      <p>{{ title }}</p>

      <div class="flex justify-between mt-2">
        <b class="mt-1">{{ price }} руб.</b>

        <img
          @click="deleteHandler"
          class="opacity-40 hover:opacity-100 cursor-pointer transition"
          src="/close.svg"
          alt="close_cart"
        />
      </div>
    </div>
  </article>
</template>
