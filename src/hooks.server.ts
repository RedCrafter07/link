import { building } from '$app/environment';
import { userInit } from '$lib/server/userInit';
import { svelteKitHandler } from 'better-auth/svelte-kit';

export async function init() {
	await userInit();
}

export async function handle({ event, resolve }) {
	const { auth } = await import('$lib/server/auth');
	return svelteKitHandler({ event, resolve, auth, building });
}
