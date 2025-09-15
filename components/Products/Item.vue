<script setup lang="ts">
import type { IProduct } from "@/types";

interface IProps {
  product: IProduct;
}

defineProps<IProps>();
</script>

<template>
  <li class="product">
    <img width="80" :src="product.imgSrc" alt="" />

    <div class="product__content">
      <span class="product__content-cell">
        {{ product.title }}
      </span>

      <span class="product__content-cell">
        {{ product.area }}
      </span>

      <span class="product__content-cell product__floor">
        {{ product.floor }}

        <div class="product__floor-max">из {{ product.maxFloor }}</div>
      </span>

      <span class="product__content-cell">
        {{ product.price.toLocaleString() }}
      </span>
    </div>
  </li>
</template>

<style lang="scss" scoped>
.product {
  display: flex;
  column-gap: 20px;

  width: 100%;
  padding-top: 16px;
  padding-bottom: 24px;

  cursor: pointer;
  border-top: 1px solid $border-color-gray;

  &:last-child {
    border-bottom: 1px solid $border-color-gray;
  }

  @media ($screen-huge) {
    flex-direction: row-reverse;

    padding: 16px 24px;

    border-radius: 16px;
    border: 1px solid $border-color-gray;
  }

  &__content {
    display: flex;
    flex-wrap: wrap;
    gap: 16px 20px;

    width: 100%;

    @media ($screen-huge) {
      height: fit-content;
    }

    &-cell {
      width: 100%;

      white-space: nowrap;
      flex: 3;

      &:nth-child(1) {
        flex: 7;
      }

      @media ($screen-huge) {
        flex: 0;

        &:nth-child(1) {
          flex-basis: 100%;
          width: 100%;
        }
      }
    }
  }

  &__floor {
    display: flex;
    gap: 4px;

    &-max {
      color: $font-color-gray;
    }
  }
}
</style>
