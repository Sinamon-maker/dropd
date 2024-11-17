import { ref } from 'vue'
import { BASE_URL, TOKEN } from '../constants/url'

type ModelObj = Record<'model', string>

const useModels = (make: string, year?: number) => {
  const MODELS_URL = `${BASE_URL}models/?year=${year}&make=${make}&token=${TOKEN}`
  const models = ref<ModelObj[]>([])
  const error = ref('')

  const getModels = async () => {
    try {
      if (year && make) {
        const response = await fetch(MODELS_URL, {
          mode: 'no-cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`)
        }

        const json = await response.json()
        console.log(json)
        models.value = json
      }
    } catch (err) {
      error.value = err.message
    }
  }
  return { models, error, getModels }
}

export default useModels
