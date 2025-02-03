import { db } from './index'
import { users, breadPosts } from './schema'
import { desc, eq, sql, asc } from 'drizzle-orm'

// UTILS FOR SERVER
// register, login, and delete

export const register = db.insert(users).values({
  name: sql.placeholder("name"),
  email: sql.placeholder("email"),
  password: sql.placeholder("password")
}).returning({ id: users.id, role: users.role }).prepare("register")

export const login = db.select({
    id: users.id,
    name: users.name,
    password: users.password,
    role: users.role,
  })
  .from(users)
  .where(eq(users.email, sql.placeholder("email")))
  .limit(1)
  .prepare("login")
  
// select user
  
export const xp = db.select({
  xp: users.xp,
  bio: users.bio
})
.from(users)
.where(eq(users.id, sql.placeholder("id")))
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

export const manyuser = db.select({
  id: users.id,
  name: users.name,
  role: users.role
}).from(users)
.orderBy(desc(users.id))
.prepare("manyuser")

export const posts = db.select({
  id: breadPosts.id,
  name: breadPosts.name,
  price: breadPosts.price,
  description: breadPosts.description,
  release: breadPosts.release
})
.from(breadPosts)
.where(eq(breadPosts.userId, sql.placeholder("id")))
.orderBy(desc(breadPosts.release))
.prepare("posts")

export const newposts = db.query.breadPosts.findMany({
    columns: {
      id: true,
      name: true,
      price: true,
      description: true,
      release: true
    },
    limit: 10,
    orderBy: [desc(breadPosts.release)],
    with: {
      user: {
        columns: {
          id: true,
          name: true,
          role: true
        }
      }
    }
  }).prepare("newposts")

// update bio and insert post
export const bioUpdate = db.update(users)
.set({ bio: sql.placeholder("bio") as any })
.where(eq(users.id, sql.placeholder("id")))
.prepare("bioUpdate")

export const sendpost = db.insert(breadPosts)
.values({ userId: sql.placeholder("userId"), name: sql.placeholder("name"), price: sql.placeholder("price"), description: sql.placeholder("description") })
.prepare("sendpost")