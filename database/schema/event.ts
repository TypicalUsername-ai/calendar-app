import { timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import ApiSchema from "./apiSchema";
import { usersInAuth } from "../drizzle/schema";

const EventsTable = ApiSchema.table('events', {
    id: uuid('id').primaryKey().defaultRandom(),
    owner: uuid('owner').references(() => usersInAuth.id),
    name: varchar('name').notNull(),
    location: varchar('location'),
    description: varchar('description'),
    start: timestamp('start').notNull(),
    end: timestamp('end').notNull()

})

export default EventsTable;
