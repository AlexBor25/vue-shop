<script setup lang="ts">
interface Props {
  total: number;
  favoritesLength: number;
}

const { total, favoritesLength } = defineProps<Props>();

const emit = defineEmits(['openCartHandler']);
</script>

<template>
  <header class="flex justify-between border-b border-slate-300 px-8 py-4">
    <router-link to="/">
      <div class="flex items-center gap-4">
        <img class="w-10" src="/logo.png" alt="logo" />
        <div>
          <h2 class="text-xl font-bold uppercase">Vue Shop</h2>
          <p class="text-slate-400">Магазин кроссовок</p>
        </div>
      </div>
    </router-link>

    <nav class="flex items-center gap-5 text-gray-500">
      <div
        @click="() => emit('openCartHandler')"
        class="flex gap-2 hover:text-black cursor-pointer"
      >
        <img src="/cart.svg" alt="Cart" />
        <b>{{ total.toFixed(2) }} руб.</b>
      </div>
      <router-link to="/favorites">
        <div class="flex gap-2 hover:text-black cursor-pointer">
          <img src="/heart.svg" alt="Favorite" />
          <span>Избранное ({{ favoritesLength }})</span>
        </div>
      </router-link>
    </nav>
  </header>
</template>
