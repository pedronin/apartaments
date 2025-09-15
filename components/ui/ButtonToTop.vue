<script setup lang="ts">
const isVisible = ref(false);

const handleClick = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const onScroll = () => {
  if (window.scrollY > 200) {
    isVisible.value = true;
  } else {
    isVisible.value = false;
  }
};

onMounted(() => {
  window.addEventListener("scroll", onScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
});
</script>

<template>
  <button
    class="button-top"
    :class="{ visible: isVisible }"
    @click="handleClick"
  >
    <img src="/icons/arrow-top.svg" alt="top" />
  </button>
</template>

<style lang="scss" scoped>
.button-top {
  position: fixed;
  right: 32px;
  bottom: 32px;
  z-index: 500;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 40px;
  height: 40px;

  border-radius: 50%;
  background: #95d0a1;

  opacity: 0;
  pointer-events: none;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0px 0px 20px 4px #95d0a1;
  }

  &.visible {
    opacity: 1;
    pointer-events: all;
  }
}
</style>
