import { env } from '$env/dynamic/private';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { admin, username } from 'better-auth/plugins';
import { db } from './db';

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: 'sqlite'
	}),
	plugins: [admin(), username()],
	emailAndPassword: {
		enabled: true,
		disableSignUp: true,
		requireEmailVerification: false
	},
	account: {
		accountLinking: {
			allowDifferentEmails: true
		}
	},
	baseURL: env.BETTER_AUTH_URL,
	secret: env.BETTER_AUTH_SECRET
});
