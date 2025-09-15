<script setup lang="ts">
import type { IChoiceOption } from "@/types";

interface IProps {
  value: number | null;
  options: IChoiceOption[];
  name: string;
  disabled?: boolean;
}

defineProps<IProps>();
defineEmits<{ (e: "update:value", value: number): void }>();
</script>

<template>
  <ul class="choice">
    <li v-for="option in options" :key="option.value">
      <label
        class="choice__item"
        :for="`choice-${option.value}`"
        :class="{
          checked: option.value === value,
          disabled: disabled || option.disabled,
        }"
      >
        <input
          :id="`choice-${option.value}`"
          class="choice__item-input"
          type="radio"
          :name="name"
          :value="option.value"
          :checked="option.value === value"
          :disabled="disabled || option.disabled"
          @change="$emit('update:value', option.value)"
        />

        {{ option.label }}
      </label>
    </li>
  </ul>
</template>

<style scoped lang="scss">
$box-shadow: 0px 6px 20px 0px #95d0a1;

.choice {
  display: flex;
  column-gap: 16px;

  &__item {
    @include p2_regular;

    width: 44px;
    height: 44px;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
    border-radius: 50%;
    background-color: $color-white;

    transition: all 0.3s ease;

    &:hover {
      box-shadow: $box-shadow;
    }

    &.checked {
      color: $color-white;
      background-color: $color-ming-green;

      box-shadow: $box-shadow;
    }

    &.disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    &-input {
      display: none;
    }
  }
}
</style>
