<script setup lang="ts">
import { inject } from 'vue';

import CardList from '@/components/CardList.vue';
import type { Item } from '@/App.vue';

const { favoriteItems, favoriteHandler } = inject('favorite') as {
  favoriteItems: Item[];
  favoriteHandler: (item: Item) => {};
};

const { deleteCartHandler, addCartHandler } = inject('cart') as {
  deleteCartHandler: (item: Item) => {};
  addCartHandler: (item: Item) => {};
};
</script>

<template>
  <CardList
    title="Избранное"
    :showSearch="false"
    :items="favoriteItems"
    @favoriteHandler="favoriteHandler"
    @addCartHandler="addCartHandler"
    @deleteCartHandler="deleteCartHandler"
  />
</template>
