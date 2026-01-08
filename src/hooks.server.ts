import { building } from '$app/environment';
import { userInit } from '$lib/server/userInit';
import { svelteKitHandler } from 'better-auth/svelte-kit';
import chalk from 'chalk';

export async function init() {
	chalk.level = 3;
	await userInit();
}

export async function handle({ event, resolve }) {
	const { auth } = await import('$lib/server/auth');
	return svelteKitHandler({ event, resolve, auth, building });
}
