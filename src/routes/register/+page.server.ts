import bcrypt from 'bcryptjs'
import { register } from '$lib/server/utilsUser'
import { redirect } from '@sveltejs/kit'
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '$env/static/private'

export const actions = {
  default: async ({ request, cookies }) => {
    let re = false
    try {
    const data = await request.formData()
    
    const password = await bcrypt.hash(data.get("password") as string, 10)
    
    const userData = {
      name: data.get("name"),
      email: data.get("email"),
      password
    }
    
    const [dataUser] = await register.execute(userData)
    
    const {id, name } = dataUser
    
    const token = await new Promise<string | Error>((resolve, reject) => {
      jwt.sign({
      id,
      name
    }, SECRET_KEY, {
      expiresIn: "1h"
    }, (err, token) => {
    if (err) {
      reject(err as Error)
    } else {
      resolve(token as string)
    }
    })
    })
    
    cookies.set("user", token as string, {
      path: '/',
      httpOnly: true,
      maxAge: 60 * 60,
    })
    
    re = !re
    
    } catch (e) {
      console.error(e)
    }
    
    if (re) {
      redirect(303, "/")
    }
    
  }
}