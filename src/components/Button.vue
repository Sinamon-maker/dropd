<script setup lang="ts">
import Icon from './Icon.vue'
import type { PropType, ButtonHTMLAttributes } from 'vue'

const emit = defineEmits(['click'])
defineProps({
  title: {
    type: String,
    default: '',
  },
  btnType: {
    type: String as PropType<ButtonHTMLAttributes['type']>,
    default: 'buttton',
  },
  variant: { type: String as PropType<'trigger' | 'item'>, default: 'trigger' },
  isDisabled: {
    type: Boolean,
    default: false,
  },
  alt: {
    type: String,
    default: '',
  },
  iconName: {
    type: String,
    default: '',
  },
  iconColor: {
    type: String,
    default: '',
  },
})
</script>
<template>
  <button
    :type="btnType"
    :disabled="isDisabled"
    :data-disabled="isDisabled ? true : false"
    :aria-label="alt ? alt : undefined"
    :class="[
      'button',

      {
        [`button__${variant}`]: variant,
      },
    ]"
    @click="!isDisabled ? emit('click') : null"
  >
    <slot>{{ title }}</slot>
    <Icon :icon-name="iconName" :color="iconColor" />
  </button>
</template>
<style lang="less" scoped>
.button {
  display: flex;
  height: 40px;
  border-radius: 8px;
  padding: 7px 14px;
  align-items: center;
  overflow: hidden;
  border: 1px solid transparent;
  transition-property: background-color, color, border-color;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  cursor: pointer; //when disabled cursor shoold be none - do not forget
  background-color: white;

  &__trigger {
    width: 100%;
  }

  &__trigger[data-disabled='true'] {
    opacity: 0.8;
    cursor: not-allowed;
  }

  &__item {
    width: 100%;
    background-color: white;

    &:hover,
    &:focus-visible,
    &:active {
      background-color: rgb(204, 204, 255);
      border-color: rgb(135, 135, 217);
    }
  }
}
</style>
