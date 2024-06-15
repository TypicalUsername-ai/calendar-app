CREATE SCHEMA "api";
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "api"."events" (
	"id" uuid,
	"name" varchar NOT NULL,
	"location" varchar,
	"description" varchar,
	"start" timestamp NOT NULL,
	"end" timestamp NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "api"."events" ADD CONSTRAINT "events_id_users_id_fk" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
