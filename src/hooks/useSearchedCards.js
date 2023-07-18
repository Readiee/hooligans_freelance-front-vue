import { computed, ref } from 'vue'

export default function useSearchedCards (cards) {
  console.log(cards.value)
  const searchQuery = ref('')

  const searchedCards = computed(() => {
    return cards.value.filter(card => card.title.toLocaleLowerCase().includes(searchQuery.value.toLocaleLowerCase()))
  })

  return { searchQuery, searchedCards }
}
