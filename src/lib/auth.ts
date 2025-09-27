import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { openAPI } from "better-auth/plugins";
import { db } from "@/db/db";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
	}),
	// providers
	emailAndPassword: { enabled: true },
	plugins: [openAPI()],
});
