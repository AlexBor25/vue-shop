<script setup lang="ts">
import { inject } from 'vue';
import debounce from 'lodash.debounce';

import Card from './Card.vue';
import type { Item, SortType } from '../App.vue';

interface Props {
  title: string;
  showSearch: boolean;
  items: Item[];
}

const { title, showSearch, items } = defineProps<Props>();

const filters = inject<{
  sortBy: SortType;
  query: string;
}>('filters');

const onSelectChange = (e: Event) => {
  filters!.sortBy = (e.target as HTMLSelectElement).value as SortType;
};

const onInputChange = debounce((e: Event) => {
  filters!.query = (e.target as HTMLInputElement).value;
}, 500);

const emits = defineEmits(['favoriteHandler', 'addCartHandler', 'deleteCartHandler']);

const clickHandler = (item: Item) => {
  if (!item.isAdded) {
    emits('addCartHandler', item);
  } else {
    emits('deleteCartHandler', item);
  }
};
</script>

<template>
  <section class="p-8">
    <div class="flex justify-between items-center">
      <h2 class="text-3xl font-bold">{{ title }}</h2>

      <div v-if="showSearch" class="flex gap-4">
        <select @change="onSelectChange" class="py-2 px-3 border rounded-md outline-none">
          <option value="name">По умолчанию</option>
          <option value="price">Дешевле</option>
          <option value="-price">Дороже</option>
        </select>

        <div class="relative">
          <img class="absolute left-3 top-3" src="/search.svg" alt="search_icon" />

          <input
            @input="onInputChange"
            class="border rounded-md py-2 pl-10 pr-4 outline-none focus:border-gray-400"
            type="text"
            placeholder="Поиск..."
          />
        </div>
      </div>
    </div>

    <div class="grid grid-cols-3 gap-5 mt-10" v-auto-animate>
      <Card
        v-for="item in items"
        :key="item.id"
        :addHandler="() => clickHandler(item)"
        :favoriteHandler="() => emits('favoriteHandler', item)"
        :isAdded="item?.isAdded"
        :isFavorite="item.favorite"
        :title="item.title"
        :price="item.price"
        :imageUrl="item.imageUrl"
      />
    </div>
  </section>
</template>
