<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import Menu from './Menu.vue'
import useYears from '@/composables/useYears'
import useMakes from '@/composables/useMakes'
import useModels from '@/composables/useModel'

const year = ref(undefined)
const make = ref()
const model = ref('')
const { years, error, getYears } = useYears()
const { makes, error: errMakes, getMakes } = useMakes(year.value)
const { models, error: errModels, getModels } = useModels(make.value, year.value)
onMounted(async () => {
  await getYears()
})

watch(
  () => year,
  (val) => {
    if (val) {
      getMakes()
      make.value = undefined
      model.value = ''
    }
  },
)

watch(
  () => make,
  (val) => {
    if (val) {
      getModels()
    } else {
      model.value = ''
    }
  },
)
</script>

<template>
  <Menu :options="years.map((year) => year.year)" placeholder="Choose year" :model-value="year" />
  <Menu :options="makes.map((make) => make.make)" placeholder="Choose make" :model-value="make" />
  <Menu
    :options="models.map((model) => model.model)"
    placeholder="Choose model"
    :model-value="model"
  />
</template>
