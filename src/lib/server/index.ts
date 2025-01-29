import { DATABASE_URL } from '$env/static/private'
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from './schema'
// You can specify any property from the postgres-js connection options
export const db = drizzle({ connection: { url: DATABASE_URL, ssl: false }, schema });