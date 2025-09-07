import { ref, computed } from 'vue'
import { DataUtils } from '../utils/DataUtils.js'
import { ImageUtils } from '../utils/ImageUtils.js'

export function usePhotoGallery(catApiService) {
  const breedPhotos = ref([])
  const photosLoading = ref(false)
  const photosPerPage = ref(12)
  const currentPage = ref(1)
  const selectedPhoto = ref(null)
  const selectedPhotoIndex = ref(-1)

  const displayedPhotos = computed(() => {
    if (!breedPhotos.value || breedPhotos.value.length === 0) return []

    const start = (currentPage.value - 1) * photosPerPage.value
    const end = start + photosPerPage.value
    return breedPhotos.value.slice(start, end)
  })

  const totalPages = computed(() => {
    if (!breedPhotos.value || breedPhotos.value.length === 0) return 1
    return Math.ceil(breedPhotos.value.length / photosPerPage.value)
  })

  const visiblePages = computed(() => {
    const maxVisible = 5
    const pages = [];

    let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages.value, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  })

  const showPagination = computed(() => {
    return totalPages.value > 1
  })

  const paginationInfo = computed(() => {
    const totalPhotos = breedPhotos.value ? breedPhotos.value.length : 0
    const start = (currentPage.value - 1) * photosPerPage.value + 1
    const end = Math.min(start + photosPerPage.value - 1, totalPhotos)

    return {
      start,
      end,
      total: totalPhotos,
      hasNext: currentPage.value < totalPages.value,
      hasPrev: currentPage.value > 1
    }
  })

  const modalNavigationInfo = computed(() => {
    if (!breedPhotos.value || selectedPhotoIndex.value === -1) {
      return { hasNext: false, hasPrev: false }
    }

    return {
      hasNext: selectedPhotoIndex.value < breedPhotos.value.length - 1,
      hasPrev: selectedPhotoIndex.value > 0,
      currentIndex: selectedPhotoIndex.value + 1,
      totalPhotos: breedPhotos.value.length
    }
  })

  const loadPhotos = async (breedId, count = 24) => {
    try {
      photosLoading.value = true
      const photos = await catApiService.getBreedImages(breedId, count)
      breedPhotos.value = photos || []
      currentPage.value = 1
    } catch (error) {
      console.error('Ошибка загрузки фотографий:', error)
      breedPhotos.value = []
    } finally {
      photosLoading.value = false
    }
  }

  const resetGallery = () => {
    breedPhotos.value = []
    currentPage.value = 1
    selectedPhoto.value = null
    selectedPhotoIndex.value = -1
  }

  const previousPage = () => {
    if (paginationInfo.value.hasPrev) {
      currentPage.value--
    }
  }

  const nextPage = () => {
    if (paginationInfo.value.hasNext) {
      currentPage.value++
    }
  }

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value && page !== currentPage.value) {
      currentPage.value = page
    }
  }

  const openPhotoModal = (photo) => {
    selectedPhoto.value = photo
    selectedPhotoIndex.value = breedPhotos.value.findIndex(p => p.id === photo.id)
    document.body.style.overflow = 'hidden'
  }

  const closePhotoModal = () => {
    selectedPhoto.value = null
    selectedPhotoIndex.value = -1
    document.body.style.overflow = ''
  }

  const nextPhoto = () => {
    if (modalNavigationInfo.value.hasNext) {
      selectedPhotoIndex.value++
      selectedPhoto.value = breedPhotos.value[selectedPhotoIndex.value]
      const page = Math.floor(selectedPhotoIndex.value / photosPerPage.value) + 1
      if (page !== currentPage.value) {
        goToPage(page)
      }
    }
  }

  const previousPhoto = () => {
    if (modalNavigationInfo.value.hasPrev) {
      selectedPhotoIndex.value--
      selectedPhoto.value = breedPhotos.value[selectedPhotoIndex.value]
      const page = Math.floor(selectedPhotoIndex.value / photosPerPage.value) + 1
      if (page !== currentPage.value) {
        goToPage(page)
      }
    }
  }

  const handleImageError = (event) => {
    ImageUtils.handleImageError(event)
  }

  return {
    breedPhotos,
    photosLoading,
    photosPerPage,
    currentPage,
    selectedPhoto,
    selectedPhotoIndex,
    displayedPhotos,
    totalPages,
    visiblePages,
    showPagination,
    paginationInfo,
    modalNavigationInfo,
    loadPhotos,
    resetGallery,
    previousPage,
    nextPage,
    goToPage,
    openPhotoModal,
    closePhotoModal,
    nextPhoto,
    previousPhoto,
    handleImageError
  }
}
