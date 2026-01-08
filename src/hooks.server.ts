import { auth } from '$lib/server/auth';
import { svelteKitHandler } from 'better-auth/svelte-kit';
import { building } from '$app/environment';
import { userInit } from '$lib/server/userInit';

export async function init() {
	await userInit();
}

export async function handle({ event, resolve }) {
	return svelteKitHandler({ event, resolve, auth, building });
}
