import { computed, onMounted, onUpdated, ref } from 'vue'
import { getAllEmployeesApi } from '@/services/companies_service'

export default function useCompanyEmployees (companyId) {
  const companyEmployees = ref([])
  const fetching = async () => {
    try {
      const responseData = await getAllEmployeesApi(companyId)
      console.log(responseData)
      companyEmployees.value = responseData.filter(employee => employee.role !== 'Leader')
      console.log(companyEmployees.value)
    } catch (err) {
      console.log(err)
    }
  }

  onMounted(fetching)
  onUpdated(fetching)

  const currentEmployees = computed(() => {
    return companyEmployees.value.filter(employee => employee.name !== null)
  })

  const employeesSearchQuery = ref('')
  const searchedEmployees = computed(() => {
    return currentEmployees.value.filter(employee =>
      (employee.name.toLocaleLowerCase().includes(employeesSearchQuery.value.toLocaleLowerCase()) ||
      employee.email.toLocaleLowerCase().includes(employeesSearchQuery.value.toLocaleLowerCase())
      )
    )
  })

  const currentInvites = computed(() => {
    return companyEmployees.value.filter(employee => employee.name === null)
  })

  const inviteSearchQuery = ref('')
  const searchedInvites = computed(() => {
    return currentInvites.value.filter(invite =>
      (invite.email.toLocaleLowerCase().includes(inviteSearchQuery.value.toLocaleLowerCase()))
    )
  })

  return {
    currentEmployees, employeesSearchQuery, searchedEmployees, currentInvites, inviteSearchQuery, searchedInvites
  }
}
