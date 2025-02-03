ALTER TABLE "bread_posts" DROP CONSTRAINT "bread_posts_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "wishlist" DROP CONSTRAINT "wishlist_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "wishlist" DROP CONSTRAINT "wishlist_bread_id_bread_posts_id_fk";
--> statement-breakpoint
ALTER TABLE "bread_posts" ADD CONSTRAINT "bread_posts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wishlist" ADD CONSTRAINT "wishlist_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wishlist" ADD CONSTRAINT "wishlist_bread_id_bread_posts_id_fk" FOREIGN KEY ("bread_id") REFERENCES "public"."bread_posts"("id") ON DELETE cascade ON UPDATE no action;