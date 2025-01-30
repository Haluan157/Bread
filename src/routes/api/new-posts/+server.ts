import { json } from '@sveltejs/kit';
import { newposts } from '$lib/server/utilsUser'

export const GET = async () => {
  const data = await newposts.execute()
  return json(data)
}