import { getServiceByIdApi } from '@/services/services_service'

export const getCreatorId = async (id) => {
  const serviceItem = await getServiceByIdApi(id)
  console.log(serviceItem)
  try {
    // return serviceItem.author.id
    const creatorId = serviceItem.authorId
    console.log(creatorId)
    return creatorId
  } catch (err) {
    console.log(err)
  }
}
