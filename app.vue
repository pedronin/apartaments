<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const store = useProductsStore();

watch(
  () => ({ filters: store.filtersApplied, sort: store.sort }),
  (newVal) => {
    const query: Record<string, string> = {};

    if (newVal.filters.rooms !== null) {
      query.rooms = String(newVal.filters.rooms);
    }

    if (newVal.filters.price) {
      query.price = newVal.filters.price.join(",");
    }

    if (newVal.filters.area) {
      query.area = newVal.filters.area.join(",");
    }

    if (newVal.sort) {
      query.sort = `${newVal.sort.type}:${newVal.sort.order}`;
    }

    router.replace({ query });
  },
  { deep: true }
);

store.initFiltersAndSortFromQuery(route.query);
await store.fetchData();
</script>

<template>
  <NuxtLayout>
    <h2 v-if="store.error">
      {{ store.error }}
    </h2>

    <template v-else>
      <div class="content">
        <h1 class="content__title">Квартиры</h1>

        <Products />
      </div>

      <Filters />
    </template>
  </NuxtLayout>
</template>

<style lang="scss" scoped>
.content {
  width: 100%;

  &__title {
    @include h1;

    margin-bottom: 32px;

    @media ($screen-huge) {
      margin-bottom: 8px;
    }
  }
}
</style>
