CREATE TYPE "contactStatus" AS ENUM('new', 'replied', 'spam');--> statement-breakpoint
CREATE TABLE "contacts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"subject" text NOT NULL,
	"message" text NOT NULL,
	"status" "contactStatus" NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
