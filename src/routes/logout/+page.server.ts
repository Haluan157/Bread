import { redirect } from '@sveltejs/kit'

export const actions = {
  default: async ({ request, cookies }) => {
    cookies.delete("user", { path: "/" })
    
    redirect(303, '/login')
  }
}