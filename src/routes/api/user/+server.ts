import { json } from '@sveltejs/kit';
import { searchuser } from '$lib/server/utilsUser'

export const GET = async ({ url }) => {
  const user = url.searchParams.get("user")
  
  const id = Number(user)
  
  if (!user || isNaN(id)) {
    return json({
      error: "Silakan periksa querynya"
    }, {
      status: 404
    })
  }
  const [dataUser] = await searchuser.execute({
    id
  })
  if (!dataUser) {
    return json({
      error: "Tidak dapat menemukan user"
    }, {
      status: 404
    })
  }
  return json({
    message: dataUser
  })
}