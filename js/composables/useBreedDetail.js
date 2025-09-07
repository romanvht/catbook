import { ref } from 'vue'
import { DataUtils } from '../utils/DataUtils.js'
import { ImageUtils } from '../utils/ImageUtils.js'

export function useBreedDetail(translationService) {
  const currentBreed = ref(null)
  const translatedDescription = ref(null)
  const isTranslating = ref(false)

  const handleImageError = (event) => {
    ImageUtils.handleImageError(event)
  }

  const getLifeSpan = (breed) => {
    return DataUtils.formatLifeSpan(breed.life_span)
  }

  const getWeight = (breed) => {
    return DataUtils.formatWeight(breed.weight)
  }

  const getHypoallergenic = (breed) => {
    return DataUtils.formatHypoallergenic(breed.hypoallergenic)
  }

  const getCharacteristicName = (key) => {
    return DataUtils.getCharacteristicName(key)
  }

  const setCurrentBreed = (breed) => {
    currentBreed.value = breed
  }

  const translateInfo = async (breed) => {
    try {
      isTranslating.value = true
      translatedDescription.value = await translationService.translateText(breed.description, 'ru')
    } catch (error) {
      console.warn('Ошибка перевода:', error)
      translatedDescription.value = breed.description
    } finally {
      isTranslating.value = false
    }
  }

  return {
    currentBreed,
    translatedDescription,
    isTranslating,
    handleImageError,
    getLifeSpan,
    getWeight,
    getHypoallergenic,
    getCharacteristicName,
    setCurrentBreed,
    translateInfo
  }
}
