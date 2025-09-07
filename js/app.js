import { createApp } from 'vue'

import { CatApiService } from './api/CatApiService.js'
import { TranslationService } from './api/TranslationService.js'
import { useBreedsList } from './composables/useBreedsList.js'
import { useBreedDetail } from './composables/useBreedDetail.js'
import { usePhotoGallery } from './composables/usePhotoGallery.js'
import { DataUtils } from './utils/DataUtils.js'

const CatBreedsApp = createApp({
  setup() {
    const apiKey = 'live_BtPuDtvTVm0qlDpwFkSYPm87uYXZOPTfDFwAMuol3SlFNp2TN1pyE5QdyFsxlmGM'

    const catApiService = new CatApiService(apiKey)
    const translationService = new TranslationService()

    const breedsList = useBreedsList(catApiService)
    const breedDetail = useBreedDetail(translationService)
    const photoGallery = usePhotoGallery(catApiService)

    const initialize = async () => {
      try {
        translationService.deleteOld()
        await breedsList.loadBreedsList()
      } catch (error) {
        console.error('Ошибка инициализации приложения:', error)
        handleError(error)
      }
    }

    const selectBreed = (breed) => {
      breedDetail.setCurrentBreed(breed)
      breedDetail.translateInfo(breed)
      photoGallery.resetGallery()
      photoGallery.loadPhotos(breed.id)
      updateUrl(breed.id)
    }

    const goHome = () => {
      breedDetail.currentBreed.value = null
      photoGallery.resetGallery()
      updateUrl()
    }

    const updateUrl = (breedId = null) => {
      if (history.pushState) {
        const url = breedId ? `#breed=${breedId}` : '#'
        history.pushState(null, null, url)
      }
    }

    const handleError = (error) => {
      const message = DataUtils.formatError(error)
      breedsList.error.value = message
      console.error('Application error:', error)
    }

    const retry = async () => {
      await breedsList.loadBreedsList()
    }

    initialize()

    return {
      ...breedsList,
      ...breedDetail,
      ...photoGallery,
      selectBreed,
      goHome,
      retry,
      handleError
    }
  }
})

CatBreedsApp.mount('#app')
