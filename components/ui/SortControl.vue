<script setup lang="ts">
import type { ISort, TSortField } from "@/types";

interface IProps {
  type: TSortField;
  label: string;
  activeSort: ISort | null;
  disabled?: boolean;
}

const props = defineProps<IProps>();
const emits = defineEmits<{ (e: "update:value", value: ISort | null): void }>();

const store = useProductsStore();

const isActive = computed(() => {
  return props.activeSort?.type === props.type;
});

const handleClick = () => {
  let newValue: ISort | null = {
    type: props.type,
    order: "asc",
  };

  if (isActive.value) {
    if (props.activeSort?.order === "asc") {
      newValue.order = "desc";
    } else {
      newValue = null;
    }
  }

  emits("update:value", newValue);
};
</script>

<template>
  <button
    class="sort-control"
    :class="{ active: isActive }"
    :disabled="disabled"
    @click="handleClick"
  >
    <span>{{ label }}</span>

    <div class="sort-control__arrows">
      <IconsChevron
        :class="{
          active: isActive && store.sort?.order === 'asc',
        }"
      />

      <IconsChevron
        :class="{
          active: isActive && store.sort?.order === 'desc',
        }"
      />
    </div>
  </button>
</template>

<style lang="scss" scoped>
.sort-control {
  display: flex;
  align-items: center;
  column-gap: 8px;

  cursor: pointer;

  transition: color 0.2s ease;

  &:hover {
    color: $color-ming-green;
  }

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  &.active {
    color: $color-ming-green;
  }

  &__arrows {
    display: flex;
    flex-direction: column;
    gap: 2px;

    svg {
      color: #9da2b0;

      &:nth-child(2) {
        transform: rotate(180deg);
      }

      &.active {
        color: $color-ming-green;
      }
    }
  }
}
</style>
