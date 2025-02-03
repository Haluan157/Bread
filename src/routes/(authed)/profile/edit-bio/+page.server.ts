import { bioUpdate } from '$lib/server/utilsUser'
import { redirect } from '@sveltejs/kit'

export const load = async ({ locals }) => {
  return {
    bio: locals.bio || ""
  }
}

export const actions = {
  default: async ({ locals, request, cookies }) => {
    const data = await request.formData()
    const bio = data.get("bio")
    
    if (locals.bio !== bio) {
      await bioUpdate.execute({ bio , id: locals.id })
      redirect(303, "/profile")
    }
  }
}