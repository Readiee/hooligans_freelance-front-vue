import { onMounted, ref } from 'vue'
import { axiosInstance } from '@/plugins/axios'

export default function useCategories () {
  const categories = ref([])
  const fetching = async () => {
    try {
      const response = await axiosInstance.get('/category')
      categories.value = response.data
      // categories.value = [
      //   { id: 1, name: 'Copywriting', label: 'Копирайтинг' },
      //   { id: 2, name: 'Webdesign', label: 'Веб-дизайн' },
      //   { id: 3, name: 'Translation', label: 'Перевод' },
      //   { id: 4, name: 'Illustrations', label: 'Иллюстрации' },
      //   { id: 5, name: 'Mobiledevelopment', label: 'Мобильная разработка' },
      //   { id: 6, name: 'Photo', label: 'Фотография' },
      //   { id: 7, name: 'Other', label: 'Другое' }
      // ]
    } catch (err) {
      console.log(err)
    }
  }

  onMounted(fetching)
  return {
    categories
  }
}
