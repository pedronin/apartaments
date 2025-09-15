<script setup lang="ts">
import type { TSortField } from "@/types";

const sorts: Record<string, { label: string; type: TSortField }> = {
  area: {
    label: "S, м²",
    type: "area",
  },
  floor: {
    label: "Этаж",
    type: "floor",
  },
  price: {
    label: "Цена, ₽",
    type: "price",
  },
};

const store = useProductsStore();
</script>

<template>
  <div class="header">
    <span class="header__static-title">Планировка</span>

    <span class="header__static-title">Квартира</span>

    <UiSortControl
      v-for="sort in sorts"
      :key="sort.type"
      :type="sort.type"
      :label="sort.label"
      :active-sort="store.sort"
      :disabled="store.isLoading"
      @update:value="store.setSort($event)"
    />
  </div>
</template>

<style lang="scss" scoped>
.header {
  @include p3-regular;

  position: sticky;
  top: 0;

  display: grid;
  grid-template-columns: 80px 281px 120px 120px 120px;

  column-gap: 20px;

  width: 100%;
  padding-top: 16px;
  padding-bottom: 24px;

  background: $color-white;

  @media ($screen-huge) {
    display: flex;

    &__static-title {
      display: none;
    }
  }
}
</style>
