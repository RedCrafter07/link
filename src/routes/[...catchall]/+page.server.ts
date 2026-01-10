import { db } from '$lib/server/db/index.js';
import { redirect as redirects } from '$lib/server/db/schema/redirect.js';
import { error, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export const load = async ({ url }) => {
	const path = url.pathname;

	const query = await db.select().from(redirects).where(eq(redirects.from, path));

	if (query.length > 1) return error(501, 'Multiple redirect found.');
	else if (query.length == 1) {
		await db
			.update(redirects)
			.set({
				...query[0],
				accessCount: query[0].accessCount + 1
			})
			.where(eq(redirects.from, query[0].from));

		return redirect(307, query[0].to);
	}

	return error(404, 'Page not found');
};
