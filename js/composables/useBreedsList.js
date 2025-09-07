import { ref, computed } from 'vue'
import { DataUtils } from '../utils/DataUtils.js'

export function useBreedsList(catApiService) {
  const breeds = ref([])
  const searchTerm = ref('')
  const loading = ref(true)
  const error = ref(null)

  const filteredBreeds = computed(() => {
    if (!searchTerm.value) return breeds.value;

    const term = searchTerm.value.toLowerCase();
    return breeds.value.filter(breed =>
      breed.name.toLowerCase().includes(term) || breed.origin.toLowerCase().includes(term)
    );
  })

  const loadBreedsList = async () => {
    try {
      loading.value = true
      error.value = null

      const cachedData = loadFromCache()
      if (cachedData) {
        breeds.value = cachedData
        return
      }

      const breedsData = await catApiService.getBreeds()
      breeds.value = breedsData.map(breed => DataUtils.normalizeBreedData(breed))

      DataUtils.saveToStorage('breedsCache', {
        data: breeds.value,
        timestamp: Date.now()
      })
    } catch (err) {
      console.error('Ошибка загрузки пород:', err)

      const cachedData = loadFromCache()
      if (cachedData) {
        breeds.value = cachedData
      } else {
        error.value = DataUtils.formatError(err)
      }
    } finally {
      loading.value = false
    }
  }

  const loadFromCache = () => {
    const cached = DataUtils.loadFromStorage('breedsCache')
    if (cached?.data && Date.now() - cached.timestamp < 86400 * 1000) {
      return cached.data
    }
    return null
  }

  return {
    breeds,
    searchTerm,
    loading,
    error,
    filteredBreeds,
    loadBreedsList
  }
}
