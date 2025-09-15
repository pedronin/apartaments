<script setup lang="ts">
const store = useProductsStore();

const resetFilters = () => {
  store.resetFilters();
};
</script>

<template>
  <div class="products">
    <template v-if="store.items.length > 0">
      <ul class="products__list">
        <ProductsHeader />

        <ProductsItem
          v-for="product in store.items"
          :key="product.id"
          :product="product"
        />
      </ul>

      <button
        v-if="store.hasMoreItems || store.isLoadingMore"
        class="products__button"
        :disabled="store.isLoading"
        @click="store.showMore()"
      >
        Загрузить еще
      </button>
    </template>

    <div v-else>
      <h2>К сожалению, по вашему запросу ничего не найдено</h2>

      <UiButton
        v-if="store.hasFilters || store.isFiltersLoading"
        text="Сбросить настройки"
        :disabled="store.isFiltersLoading"
        @click="resetFilters"
      >
        <img src="/icons/cross.svg" alt="" />
      </UiButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.products {
  &__list {
    display: flex;
    flex-direction: column;

    margin-bottom: 48px;

    @media ($screen-huge) {
      row-gap: 4px;

      margin-bottom: 24px;
    }
  }

  &__button {
    @include p2_regular;

    padding: 8px 24px;

    border-radius: 16px;
    border: 1px solid $border-color-gray;
    transition: all 0.3s ease;

    &:disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    &:hover {
      box-shadow: $box-shadow-button;
    }
  }
}
</style>
