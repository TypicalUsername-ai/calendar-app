import postgres from "postgres";
import config from "../drizzle.config"
import { drizzle } from 'drizzle-orm/postgres-js'
import { policies as eventPolicies } from './event'

const conn = postgres(config.dbCredentials);
const db = drizzle(conn)

for (var [policy, query] of Object.entries(eventPolicies)) {
    console.warn(`[events] executing policy: ${policy}`);
    try {
        const res = await db.execute(query);
        console.info(res);
    } catch (error) {
        console.error(error.name + error.code)
    }
}

conn.end()
