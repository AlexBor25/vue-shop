<script setup lang="ts">
interface Props {
  imageUrl: string;
  title: string;
  price: number;
  isFavorite: boolean;
  isAdded?: boolean;
  addHandler: () => void;
  favoriteHandler: () => void;
}

const { imageUrl, title, price, isAdded, isFavorite, addHandler } = defineProps<Props>();
</script>

<template>
  <article
    class="flex flex-col justify-between relative border bg-white border-slate-100 rounded-3xl p-5 cursor-pointer hover:-translate-y-2 hover: shadow-xl transition"
  >
    <div class="flex flex-col flex-1">
      <img
        @click="favoriteHandler"
        class="absolute top-5 left-5"
        :src="isFavorite ? '/like-2.svg' : '/like-1.svg'"
        alt="favorite"
      />
      <img class="self-center w-[182px] h-40" :src="imageUrl" alt="sneaker" />
      <p class="mt-4 text-lg">{{ title }}</p>
    </div>

    <div class="flex justify-between items-center mt-5">
      <div class="flex flex-col">
        <span class="text-slate-400">Цена</span>
        <b>{{ price }} руб.</b>
      </div>

      <img @click="addHandler" :src="isAdded ? '/checked.svg' : '/plus.svg'" alt="add_to_cart" />
    </div>
  </article>
</template>
