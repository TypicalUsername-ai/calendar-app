import { timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import ApiSchema from "./apiSchema";
import { usersInAuth } from "./authSchema";
import { sql } from 'drizzle-orm'

const EventsTable = ApiSchema.table('events', {
    id: uuid('id').primaryKey().defaultRandom(),
    owner: uuid('owner').references(() => usersInAuth.id),
    name: varchar('name').notNull(),
    location: varchar('location'),
    description: varchar('description'),
    start: timestamp('start').notNull(),
    end: timestamp('end').notNull()

})

export const policies = {
    set_rls: sql`ALTER TABLE api.event ENABLE ROW LEVEL SECURITY;`,
    client_own_access: sql`CREATE POLICY user_own_access ON api.events TO client USING (events.owner = auth.uid());`,
    client_grant_access: sql`GRANT ALL ON api.events TO client;`
}

export default EventsTable;
