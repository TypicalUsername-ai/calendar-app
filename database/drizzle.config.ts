import 'dotenv/config';
import type { Config } from 'drizzle-kit'


export default {
    dialect: "postgresql",
    schema: "./schema/*.ts",
    dbCredentials: {
        user: process.env.DB_USER ?? "postgres",
        password: process.env.DB_PASSWORD ?? "",
        host: process.env.DB_HOST ?? "localhost",
        database: process.env.DB_NAME ?? "postgres",
        ssl: false
    },
    schemaFilter: ['api', 'public'],
    verbose: true,
    strict: true,
    out: './drizzle'
} satisfies Config;
