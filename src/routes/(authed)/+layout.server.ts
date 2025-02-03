import { redirect } from '@sveltejs/kit'

export const load = async ({ url, locals }) => {
  if (Object.keys(locals).length === 0) {
    redirect(303, "/login")
  } else {
    return {
      user: locals
    }
  }
}