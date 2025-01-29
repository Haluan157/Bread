import type { Handle } from '@sveltejs/kit';
import { role, xp } from '$lib/server/utilsUser'
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '$env/static/private'

interface JwtPayload {
  id: number
  name: string
  [key: string]: unknown
}

export const handle: Handle = async ({ event, resolve }) => {
  const rawData = event.cookies.get("user")
  
  if (rawData) {
    try {
    let data = await new Promise<JwtPayload>((resolve, reject) => {
      jwt.verify(rawData, SECRET_KEY, (err, token) => {
        if (err) {
          reject(err)
        } else {
          resolve(token as JwtPayload)
        }
      })
    })
    
    const [[userRole],[x]] = await Promise.all([
      role.execute({ id: data.id }),
      event.url.pathname.startsWith("/profile") ? xp.execute({ id: data.id }) : Promise.resolve([])
    ])
    
    event.locals.role = userRole.role
    event.locals.name = data.name
    event.locals.id = data.id
    
    if (x) {
      event.locals.xp = x.xp
      event.locals.bio = x.bio
    }
    } catch (e) {
      return new Response("invalid token", {
        status: 401
      })
    }
  }
  
  const response = await resolve(event)
  
  return response
}