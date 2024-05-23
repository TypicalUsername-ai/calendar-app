import { defineConfig } from "drizzle-kit";
import 'dotenv/config';


export default defineConfig({
    dialect: "postgresql",
    schema: "./schema/*.ts",
    dbCredentials: {
        user: process.env.DB_USER ?? "postgres",
        password: process.env.DB_PASSWORD ?? "",
        host: process.env.DB_HOST ?? "localhost",
        database: process.env.DB_NAME ?? "postgres",
        ssl: true
    },
    verbose: true,
    strict: true,
    out: './drizzle'
});
