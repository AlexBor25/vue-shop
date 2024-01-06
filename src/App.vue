<script setup lang="ts">
import { ref, computed, provide, watch } from 'vue';
import axios from 'axios';

import Header from './components/Header.vue';
import Drawer from './components/Drawer.vue';

export type SortType = 'name' | 'price' | '-price' | '';

export interface Item {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  favorite: boolean;
  isAdded?: boolean;
}

const cartItems = ref<Item[]>([]);
const items = ref<Item[]>([]);
const openCart = ref<boolean>(false);
const isCreatingOrder = ref<boolean>(false);

const favoriteHandler = async (currentItem: Item) => {
  try {
    const { data } = await axios.patch<Item>(
      `https://6c57370b184da33c.mokky.dev/items/${currentItem.id}`,
      {
        favorite: !currentItem.favorite
      }
    );

    currentItem.favorite = data.favorite;
  } catch (error) {
    console.log('Ooops...patch Errors!!!!', error);
  }
};

const openCartHandler = () => {
  openCart.value = true;
};

const closeCartHandler = () => {
  openCart.value = false;
};

const addCartHandler = (item: Item) => {
  cartItems.value.push({ ...item, isAdded: true });

  item.isAdded = true;
};

const deleteCartHandler = (item: Item) => {
  const current = cartItems.value.find((el) => el.id === item.id) as Item;

  cartItems.value.splice(cartItems.value.indexOf(current), 1);

  item.isAdded = false;
};

const createOrder = () => {
  //need request to back
  isCreatingOrder.value = true;

  setTimeout(() => {
    cartItems.value = [];

    isCreatingOrder.value = false;
  }, 1500);
};

const totalPrice = computed(() => cartItems.value.reduce((acc, item) => (acc += item.price), 0));
const favoriteItems = computed(() => items.value.filter((item) => item.favorite));
const favoritesLength = computed(() => favoriteItems.value.length);
const disableOrderBtn = computed(() => isCreatingOrder.value || cartItems.value.length === 0);

provide('items', items);

provide('cart', {
  deleteCartHandler,
  addCartHandler,
  closeCartHandler,
  cartItems,
  totalPrice,
  openCart
});

provide('favorite', {
  favoriteHandler,
  favoriteItems
});

watch(
  cartItems,
  () => {
    localStorage.setItem('cart', JSON.stringify(cartItems.value));
  },
  { deep: true }
);
</script>

<template>
  <main class="w-4/5 m-auto bg-white rounded-xl shadow-xl my-14 pb-10">
    <Drawer
      v-if="openCart"
      @closeCartHandler="closeCartHandler"
      @deleteCartHandler="deleteCartHandler"
      @createOrder="createOrder"
      :cartItems="cartItems"
      :total="totalPrice"
      :disableOrderBtn="disableOrderBtn"
    />

    <Header
      @openCartHandler="openCartHandler"
      :total="totalPrice"
      :favoritesLength="favoritesLength"
    />

    <router-view></router-view>
  </main>
</template>

<style scoped></style>
