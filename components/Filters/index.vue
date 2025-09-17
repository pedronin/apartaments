<script setup lang="ts">
import type { IChoiceOption } from "@/types";

const store = useProductsStore();

const resetFilters = () => {
  store.resetFilters();
};

const applyFilters = () => {
  store.applyFilters();
};

const roomOptions = computed<IChoiceOption[]>(() => {
  const res = [];
  if (!store.filterLimits.rooms) {
    return [];
  }

  for (
    let i = store.filterLimits.rooms.min;
    i <= store.filterLimits.rooms.max;
    i++
  ) {
    res.push({
      value: i,
      label: `${i}К`,
      disabled: false,
    });
  }

  return res;
});
</script>

<template>
  <div class="filters">
    <UiChoiceGroup
      v-if="store.filterLimits.rooms"
      name="rooms"
      :value="store.filters.rooms"
      :disabled="store.isLoading"
      :options="roomOptions"
      @update:value="store.setFilters({ rooms: $event })"
    />

    <UiRangeSlider
      v-if="store.filterLimits.price"
      label="Стоимость квартиры, ₽"
      :value="
        store.filters.price ?? [
          store.filterLimits.price.min,
          store.filterLimits.price.max,
        ]
      "
      :disabled="store.isLoading"
      :min="store.filterLimits.price.min"
      :max="store.filterLimits.price.max"
      :step="100000"
      @update:value="store.setFilters({ price: $event })"
    />

    <UiRangeSlider
      v-if="store.filterLimits.area"
      label="Площадь, м²"
      :value="
        store.filters.area ?? [
          store.filterLimits.area.min,
          store.filterLimits.area.max,
        ]
      "
      :disabled="store.isLoading"
      :min="store.filterLimits.area.min"
      :max="store.filterLimits.area.max"
      @update:value="store.setFilters({ area: $event })"
    />

    <div class="filters__buttons">
      <UiButton
        text="Сбросить"
        :disabled="!store.hasFilters || store.isLoading"
        @click="resetFilters"
      >
        <img src="/icons/cross.svg" alt="" />
      </UiButton>

      <UiButton
        text="Применить"
        :disabled="!store.hasNotAppliedFilters || store.isLoading"
        @click="applyFilters"
      >
        <img src="/icons/check.svg" alt="" />
      </UiButton>
    </div>
  </div>
</template>

<style scoped lang="scss">
.filters {
  position: sticky;
  top: 0;

  display: flex;
  flex-direction: column;
  row-gap: 24px;

  max-width: 400px;
  min-width: 318px;
  width: 100%;
  height: fit-content;
  padding: 40px;

  border-radius: 16px;
  background-color: #e5f5e6;

  &__buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  @media ($screen-huge) {
    padding: 20px 19px;
  }
}
</style>
