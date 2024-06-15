ALTER TABLE "api"."events" DROP CONSTRAINT "events_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "api"."events" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "api"."events" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "api"."events" ALTER COLUMN "id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "api"."events" ADD COLUMN "owner" uuid;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "api"."events" ADD CONSTRAINT "events_owner_users_id_fk" FOREIGN KEY ("owner") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
