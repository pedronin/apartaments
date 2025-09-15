<template>
  <div class="container">
    <slot />

    <UiButtonToTop />
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  gap: 80px;

  margin: 0 auto;
  max-width: 1440px;
  padding: 96px 80px;

  display: grid;
  grid-template-columns: 1fr 400px;

  @media ($screen-huge) {
    gap: 28px;

    padding: 48px 54px;
    grid-template-columns: 1fr 318px;
  }
}
</style>
