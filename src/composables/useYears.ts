import { ref } from 'vue'
import { BASE_URL, TOKEN } from '../constants/url'
const YEARS_URL = `${BASE_URL}years/?token=${TOKEN}`
type YearObj = Record<'year', string>

const useYears = () => {
  const years = ref<YearObj[]>([])
  const error = ref('')

  const getYears = async () => {
    try {
      const response = await fetch(YEARS_URL, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      })
      console.log(response)
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`)
      }

      const json = await response.json()
      console.log(json)
      years.value = json
    } catch (err) {
      error.value = err.message
    }
  }
  return { years, error, getYears }
}

export default useYears
