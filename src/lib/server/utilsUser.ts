import { db } from './index'
import { users } from './schema'
import { eq, sql } from 'drizzle-orm'

// register, login, and delete

export const register = db.insert(users).values({
  name: sql.placeholder("name"),
  email: sql.placeholder("email"),
  password: sql.placeholder("password")
}).returning({ id: users.id, name: users.name }).prepare("register")

export const login = db.select({
    id: users.id,
    name: users.name,
    password: users.password
  })
  .from(users)
  .where(eq(users.email, sql.placeholder("email")))
  .limit(1)
  .prepare("login")
  
// select user

export const role = db.select({
    role: users.role
  })
  .from(users)
  .where(eq(users.id, sql.placeholder("id")))
  .limit(1)
  .prepare("role")
  
export const xp = db.select({
  xp: users.xp,
  bio: users.bio
})
.from(users)
.where(eq(users.id, sql.placeholder("id")))
.limit(1)
.prepare("xp")

export const searchuser = db.select({
  name: users.name,
  bio: users.bio,
  xp: users.xp,
  role: users.role
})
.from(users)
.where(eq(users.id, sql.placeholder("id")))
.prepare("searchuser")
// update bio and insert post

export const bioUpdate = db.update(users)
.set({ bio: sql.placeholder("bio") as any })
.where(eq(users.id, sql.placeholder("id")))
.prepare("bioUpdate")