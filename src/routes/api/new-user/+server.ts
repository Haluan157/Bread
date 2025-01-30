import { json } from '@sveltejs/kit';
import { manyuser } from '$lib/server/utilsUser'

export const GET = async () => {
  const data = await manyuser.execute()
  console.log(data)
  return json(data)
}