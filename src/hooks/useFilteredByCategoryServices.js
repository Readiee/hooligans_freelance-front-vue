import { onUpdated, ref } from 'vue'
import { axiosInstance } from '@/plugins/axios'

export default function useFilteredByCategoryServices (category) {
  const filteredByCategoryServices = ref([])
  const fetching = async () => {
    try {
      const response = await axiosInstance.get('/category/products/' + String(category.id))
      console.log(response.data)
      filteredByCategoryServices.value = response.data.products
    } catch (err) {
      console.log(err)
    }
  }

  onUpdated(fetching)
  return {
    filteredByCategoryServices
  }
}
