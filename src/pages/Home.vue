<script setup lang="ts">
import { inject, onMounted, provide, reactive, watch } from 'vue';
import type { Ref } from 'vue';
import axios from 'axios';

import CardList from '../components/CardList.vue';

import type { Item, SortType } from '../App.vue';

interface CartInjectProps {
  deleteCartHandler: (item: Item) => void;
  addCartHandler: (item: Item) => void;
  cartItems: Ref<Item[]>;
}

const items = inject('items') as Ref<Item[]>;

const { deleteCartHandler, addCartHandler, cartItems } = inject('cart') as CartInjectProps;

const { favoriteHandler } = inject('favorite') as { favoriteHandler: (item: Item) => {} };

const filters = reactive<{
  sortBy: SortType;
  query: string;
}>({
  sortBy: 'name',
  query: ''
});

provide('filters', filters);

const fetchItems = async () => {
  try {
    const params: { sortBy: SortType; title?: string } = {
      sortBy: filters.sortBy
    };

    if (filters.query) {
      params.title = `*${filters.query}*`;
    }

    const { data } = await axios.get(`https://6c57370b184da33c.mokky.dev/items`, {
      params
    });

    items.value = data;
  } catch (error) {
    console.log('Ooops....watch Errors!!!!');
  }
};

onMounted(async () => {
  const cart: Item[] = JSON.parse(localStorage.getItem('cart') || '[]');
  cartItems.value = cart;

  await fetchItems();

  items.value = items.value.map((item: Item) => ({
    ...item,
    isAdded: cartItems.value.some((el: Item) => el.id === item.id)
  }));
});

watch(filters, async () => {
  const cart: Item[] = JSON.parse(localStorage.getItem('cart') || '[]');
  cartItems.value = cart;

  await fetchItems();

  items.value = items.value.map((item: Item) => ({
    ...item,
    isAdded: cartItems.value.some((el: Item) => el.id === item.id)
  }));

  cartItems.value = cartItems.value.map((item: Item) => ({
    ...item,
    isAdded: cart.some((el: Item) => el.id === item.id)
  }));
});

watch(cartItems, () => {
  items.value = items.value.map((el) => ({
    ...el,
    isAdded: false
  }));
});

watch(
  cartItems,
  (cart) => {
    cart.forEach((item) => {
      const current = items.value.find((el) => el.id === item.id) as Item;

      items.value.splice(items.value.indexOf(current), 1, item);
    });
  },
  { deep: true }
);
</script>

<template>
  <CardList
    title="Все кроссовки"
    showSearch
    :items="items"
    @favoriteHandler="favoriteHandler"
    @addCartHandler="addCartHandler"
    @deleteCartHandler="deleteCartHandler"
  />
</template>
