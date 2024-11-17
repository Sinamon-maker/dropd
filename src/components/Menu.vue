<script setup lang="ts">
import { ref, computed, type PropType, onMounted, onBeforeUnmount } from 'vue'
import Button from './Button.vue'

const emit = defineEmits(['update: modelValue'])
defineProps({
  placeholder: {
    type: String,
    default: '',
  },

  alt: {
    type: String,
    default: '',
  },
  modelValue: {
    type: [String, Number, null] as PropType<string | number>,
    default: '',
  },
  options: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
})
const option = ref('')
const isOpen = ref(false)
const dropdown = ref<HTMLDivElement | null>(null)

const isPlaceholder = computed(() => {
  return option.value ? false : true
})
const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const closeDropDown = (el: { target: any }) => {
  if (dropdown && dropdown.value !== null && !dropdown.value.contains(el?.target)) {
    isOpen.value = false
  }
}

const chooseItem = (data: string) => {
  emit('update: modelValue', data)
  option.value = data
  isOpen.value = false
}

onMounted(() => {
  window.addEventListener('click', closeDropDown)
})
onBeforeUnmount(() => {
  window.removeEventListener('click', closeDropDown)
})
</script>
<template>
  <div class="menu" ref="dropdown">
    <div class="menu__trigger">
      <Button
        :isDisabled="options.length === 0"
        :alt="alt"
        icon-name="fa-solid fa-chevron-down"
        icon-color="#c3c3c3"
        @click="options.length === 0 ? null : toggleDropdown()"
        ><span class="menu__trigger-text" :data-placeholder="isPlaceholder ? true : false">{{
          isPlaceholder ? placeholder : option
        }}</span>
      </Button>
    </div>
    <ul v-if="options.length !== 0" :data-open="isOpen ? true : false" class="menu__content">
      <Li v-for="item in options" class="menu__item">
        <Button
          variant="item"
          :icon-name="option === item ? 'fa-solid fa-check' : ''"
          icon-color="rgb(135, 135, 217)"
          @click="chooseItem(item)"
        >
          <span class="menu__item-text">{{ item }}</span>
        </Button>
      </Li>
    </ul>
  </div>
</template>

<style lang="less" scoped>
.menu {
  position: relative;
  min-width: 140px;
  max-width: 1000px;
  &__trigger {
    width: 100%;
    height: 100%;
  }
  &__content {
    position: absolute;
    overflow: hidden;
    border-radius: 8px;
    background-color: white;
    box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.14);
    height: 0;
    opacity: 0;
    min-width: 100px;
    min-width: 200px;
    min-width: 400px;
    max-height: 400px;
    transition-property: background-color, height, opacity;
    transition-duration: 0.3s;
    transition-timing-function: ease;
    z-index: 100;
    padding: 8px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  &__content[data-open='true'] {
    opacity: 1;
    height: auto;
  }
  &__trigger-text {
    color: #4e4e4e;
    flex-grow: 1;
    text-align: left;
  }
  &__trigger-text[data-placeholder='true'] {
    color: #acacac;
  }

  &__item {
    padding: 2px;
  }
  &__item-text {
    flex-grow: 1;
    text-align: left;
  }
}
</style>
