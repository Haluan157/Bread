import { integer, serial, varchar, date, text, unique, pgTable } from "drizzle-orm/pg-core";
import { relations, sql } from 'drizzle-orm';

export const users = pgTable('users', {
  id: serial().primaryKey(),
  name: varchar({ length: 50 }).unique().notNull(),
  email: varchar({ length: 100 }).unique().notNull(),
  password: varchar({ length: 255 }).notNull(),
  role: varchar({ length: 20, enum: ["admin", "mod", "user"] }).default("user"),
  bio: varchar({ length: 255 }),
  xp: integer().default(0)
})

export const userRelations = relations(users, ({ many }) => ({
  breadPosts: many(breadPosts),
  wishlist: many(wishlist)
}))

export const breadPosts = pgTable('bread_posts', {
  id: serial().primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  name: varchar({ length: 255 }).notNull().unique(),
  price: integer().notNull(),
  description: text(),
  release: date().default(sql`CURRENT_DATE`)
})

export const breadRelations = relations(breadPosts, ({ one, many }) => ({
  user: one(users, { fields: [breadPosts.userId], references: [users.id] }),
  wishlist: many(wishlist)
}))

export const wishlist = pgTable('wishlist', {
  userId: integer('user_id').notNull().references(() => users.id),
  breadId: integer('bread_id').notNull().references(() => breadPosts.id)
}, t => ({
  un: unique('unique_id').on(t.userId, t.breadId)
}))

export const wishlistRelations = relations(wishlist, ({ one }) => ({
  user: one(users, { fields: [ wishlist.userId ], references: [ users.id] }),
  breadPosts: one(breadPosts, { fields: [ wishlist.breadId ], references: [ breadPosts.id ] })
}))