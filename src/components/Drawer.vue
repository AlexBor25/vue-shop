<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';

import type { Item } from '@/App.vue';
import InfoBlock from './InfoBlock.vue';
import CartItem from './CartItem.vue';

interface Props {
  cartItems: Item[];
  total: number;
  disableOrderBtn: boolean;
}

onMounted(() => {
  const top = window.scrollY;

  document.body.style.position = 'fixed';
  document.body.style.top = `-${top}px`;
  document.body.style.left = '0px';
  document.body.style.right = '0px';
  document.body.style.height = '100%';
  document.body.style.overflow = 'hidden';
});

onUnmounted(() => {
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.left = '';
  document.body.style.right = '';
  document.body.style.overflow = 'auto';
});

const { cartItems, total, disableOrderBtn } = defineProps<Props>();

const emit = defineEmits(['closeCartHandler', 'deleteCartHandler', 'createOrder']);
</script>

<template>
  <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"></div>
  <div
    class="flex flex-col justify-between bg-white w-96 h-full fixed right-0 top-0 z-20 p-8 overflow-y-auto"
  >
    <div class="flex items-center gap-3 mb-5">
      <svg
        @click="() => emit('closeCartHandler')"
        class="rotate-180 cursor-pointer opacity-50 hover:opacity-100 transition hover:-translate-x-1"
        width="16"
        height="14"
        viewBox="0 0 16 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 7H14.7143"
          stroke="black"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M8.71436 1L14.7144 7L8.71436 13"
          stroke="black"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>

      <h2 class="text-2xl font-bold">Корзина</h2>
    </div>

    <InfoBlock
      v-if="!total"
      class="flex h-full justify-center"
      title="Корзина пустая"
      text="Здесь пока пусто :("
      imageUrl="/package-icon.png"
    />

    <div class="flex flex-col flex-1 gap-5" v-auto-animate>
      <CartItem
        v-for="item in cartItems"
        :key="item.id"
        :deleteHandler="() => emit('deleteCartHandler', item)"
        :title="item.title"
        :imageUrl="item.imageUrl"
        :price="item.price"
      />
    </div>

    <div class="mt-20 flex flex-col gap-5">
      <div class="flex gap-2">
        <span>Итого:</span>
        <div class="flex-1 border-b border-dashed"></div>
        <b>{{ total.toFixed(2) }} руб.</b>
      </div>

      <button
        :disabled="disableOrderBtn"
        @click="() => emit('createOrder')"
        class="mt-10 cursor-pointer bg-lime-400 w-full rounded-xl py-3 text-white hover:bg-lime-500 transition disabled:bg-slate-300 disabled:cursor-not-allowed"
      >
        Оформить заказ
      </button>
    </div>
  </div>
</template>
