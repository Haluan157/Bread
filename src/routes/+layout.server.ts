import { redirect } from '@sveltejs/kit'

export const load = async ({ url, locals }) => {
  const key = Object.keys(locals).length
  
  if (key === 0 && url.pathname !== '/login' && url.pathname !== '/register') {
    redirect(303, "/login")
  } else if (key !== 0 && (url.pathname === '/login' || url.pathname === '/register')) {
    redirect(303, '/')
  }
  
  if (key !== 0) {
    return {
      user: locals
    }
  }
}