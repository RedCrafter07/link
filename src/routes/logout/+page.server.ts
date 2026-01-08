import { auth } from '$lib/server/auth.js';
import { redirect } from '@sveltejs/kit';

export const load = async ({ request, locals }) => {
	if (locals.session)
		await auth.api.signOut({
			headers: await request.headers
		});
	return redirect(307, '/auth');
};
