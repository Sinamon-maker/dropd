import { ref } from 'vue'
import { BASE_URL, TOKEN } from '../constants/url'

type MakeObj = Record<'make', string>

const useMakes = (year?: number) => {
  const MAKES_URL = `${BASE_URL}makes/?year=${year}&token=${TOKEN}`
  const makes = ref<MakeObj[]>([])
  const error = ref('')

  const getMakes = async () => {
    try {
      if (year) {
        const response = await fetch(MAKES_URL, {
          mode: 'no-cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
        console.log(response)
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`)
        }

        const json = await response.json()
        console.log(json)
        makes.value = json
      }
    } catch (err) {
      error.value = err.message
    }
  }
  return { makes, error, getMakes }
}

export default useMakes
