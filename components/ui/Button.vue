<script setup lang="ts">
interface IProps {
  text: string;
  disabled?: boolean;
}

defineProps<IProps>();
</script>

<template>
  <button class="custom-button" :disabled="disabled">
    {{ text }}

    <slot />
  </button>
</template>

<style lang="scss" scoped>
.custom-button {
  @include p3_regular;

  display: flex;
  align-items: center;
  gap: 8px;

  width: fit-content;
  padding: 5px 16px 7px;

  border-radius: 16px;
  transition: all 0.3s ease;

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  &:hover {
    box-shadow: $box-shadow-button;
  }
}
</style>
