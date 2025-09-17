<script setup lang="ts">
import VueSlider from "vue-3-slider-component";

interface IProps {
  value: number[];
  disabled?: boolean;
  min: number;
  max: number;
  step?: number;
  label: string;
}

defineProps<IProps>();
defineEmits<{ (e: "update:value", value: [number, number]): void }>();
</script>

<template>
  <div class="custom-range">
    <label class="custom-range__label">{{ label }}</label>

    <div class="display">
      <div v-if="value?.[0]" class="display__range">
        <span class="display__range-label">от</span>

        <span class="display__range-value">
          {{ value[0].toLocaleString() }}
        </span>
      </div>

      <div v-if="value?.[1]" class="display__range">
        <span class="display__range-label">до</span>

        <span class="display__range-value">
          {{ value[1].toLocaleString() }}
        </span>
      </div>
    </div>

    <VueSlider
      tooltip="none"
      :model-value="value"
      :disabled="disabled"
      :min="min"
      :max="max"
      :interval="step"
      @update:model-value="$emit('update:value', $event)"
    />
  </div>
</template>

<style lang="scss" scoped>
$box-shadow: 0.5px 0.5px 8px 3px #74d1a4;

.custom-range {
  &__label {
    @include p3-regular;

    display: block;
    margin-bottom: 8px;
  }

  .display {
    display: flex;

    margin-bottom: 6px;

    &__range {
      @include p2-regular;

      flex: 1;

      display: flex;
      column-gap: 8px;

      &-label {
        color: $font-color-gray;
      }
    }
  }

  &:deep(.vue-slider) {
    .vue-slider-rail {
      height: 3px;

      background: #cfdfd6;
      border-radius: 16px;
    }

    .vue-slider-process {
      background-color: $color-ming-green;
    }

    .vue-slider-dot-handle {
      width: 14px;
      height: 14px;

      background: $color-ming-green;
      box-shadow: none;
      transition: box-shadow 0.3s ease;

      &:hover {
        box-shadow: $box-shadow;
      }

      &:active {
        box-shadow: $box-shadow;
      }
    }
  }
}
</style>
