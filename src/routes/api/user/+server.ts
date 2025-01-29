import { json } from '@sveltejs/kit';
import { searchuser } from '$lib/server/utilsUser'

export const GET = async ({ url }) => {
  const user = url.searchParams.get("user")
  const num = Number.isNaN(Number(user))
  if (!user || num) {
    return json({
      error: "Tidak dapat menemukan user"
    }, {
      status: 404
    })
  }
  
}