import bcrypt from 'bcryptjs'
import { register } from '$lib/server/utilsUser'
import { redirect, fail } from '@sveltejs/kit'
import { dev } from '$app/environment';
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '$env/static/private'

export const load = async ({ url, locals }) => {
  if (Object.keys(locals).length > 0) {
    redirect(303, "/")
  }
}

export const actions = {
  default: async ({ request, cookies }) => {
    let re = false
    try {
    const data = await request.formData()
    
    const password = await bcrypt.hash(data.get("password") as string, 10)
    
    const userData = {
      name: (data.get("name") as string).trim(),
      email: data.get("email"),
      password
    }
    
    if (userData.name.length === 0) {
      return fail(400, {
        message: "Mohon beri nama dengan benar! Jangan hanya spasi"
      })
    }
    
    const [dataUser] = await register.execute(userData)
    
    const {id, role } = dataUser
    
    const token = await new Promise<string | Error>((resolve, reject) => {
      jwt.sign({
      id,
      name: userData.name,
      role
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
      secure: !dev,
      sameSite: "lax"
    })
    
    re = !re
    
    } catch (e) {
      return fail(400, {
        message: "Database error atau ada data duplikat. Jika data duplikat, sialakan gunakan username atau email lain!"
      })
    }
    
    if (re) {
      redirect(303, "/")
    }
    
  }
}