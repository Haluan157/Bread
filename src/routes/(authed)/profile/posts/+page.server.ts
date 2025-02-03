import { sendpost } from '$lib/server/utilsUser'
import { redirect } from '@sveltejs/kit'

export const actions = {
  default: async ({ locals, request }) => {
    const data = await request.formData()
    const [name, price, description] = [data.get("name") as string, Number(data.get("price") as string), data.get("description") as string]
    await sendpost.execute({
      userId: locals.id,
      name,
      price,
      description
    })
    redirect(303, "/profile")
  }
}

export const ssr = false