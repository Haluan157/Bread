import bcrypt from 'bcryptjs'
import { login } from '$lib/server/utilsUser'
import { redirect, fail } from '@sveltejs/kit'
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '$env/static/private'

export const actions = {
  default: async ({ request, cookies }) => {
    let re = false
    try {
    const data = await request.formData()
    
    const [dataUser] = await login.execute({
      email: data.get("email")
    })
    
    const pass = await bcrypt.compare(data.get("password") as string, dataUser.password)
    
    if (!pass) {
      return fail(400, { message: "Password atau email salah" })
    }
    
    const { id, name } = dataUser
    
    const token = await new Promise<string | Error>((resolve, reject) => {
      jwt.sign({
      id,
      name
    }, SECRET_KEY, {
      expiresIn: "1h"
    }, (r, tkn) => {
    if (r) {
      reject(r as Error)
    } else {
      resolve(tkn as string)
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