<script setup lang="ts">
import MainContent from './components/MainContent.vue'
</script>

<template>
  <main class="root">
    <div class="root__content">
      <MainContent />
    </div>
  </main>
</template>

<style lang="less">
.root {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(89, 201, 126);

  &__content {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;

    @media (min-width: 768px) {
      width: 100%;
      max-width: 1200px;
      grid-template-columns: 1fr 1fr 1fr;
    }

    @media (min-width: 1200px) {
      width: 100%;
      max-width: 1400px;
    }
  }
}
</style>
