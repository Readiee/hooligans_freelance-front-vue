import { onMounted, ref } from 'vue'
import { axiosInstance } from '@/plugins/axios'
import { useRoute } from 'vue-router'

export default function useSearchedServices () {
  const route = useRoute()

  const searchedServices = ref([])
  const searchQuery = ref(route.params.query)
  const isPostsLoading = ref(true)
  const fetching = async () => {
    try {
      isPostsLoading.value = true
      const response = await axiosInstance.get('/services/search', {
        params: {
          query: searchQuery
        }
      })
      searchedServices.value = response.data
    } catch (err) {
      console.log(err)
    } finally {
      isPostsLoading.value = false
    }
  }

  onMounted(fetching)
  return {
    searchedServices, searchQuery, isPostsLoading
  }
}
