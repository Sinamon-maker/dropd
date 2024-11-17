<script setup lang="ts">
defineProps({
  iconName: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: '#c3c3c3',
  },
  size: {
    type: String,
    default: '18px',
  },
})
</script>

<template>
  <font-awesome-icon :icon="iconName" class="icon" />
</template>

<style>
.icon {
  margin-left: 12px;
  font-size: v-bind('size');
  color: v-bind('color');
}
</style>
