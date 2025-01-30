import { json } from '@sveltejs/kit';
import { posts } from '$lib/server/utilsUser'

export const GET = async ({ url }) => {
  const postRaw = url.searchParams.get("post")
  
  const id = Number(postRaw)
  
  if (!postRaw || isNaN(id)) {
    return json({
      error: "Silakan periksa querynya"
    }, {
      status: 404
    })
  }
  
  const data = await posts.execute({id})
  
  if (!data) return json({
      error: "Tidak ada Post"
    }, {
      status: 404
    })
  return json({
    message: data
  })
}