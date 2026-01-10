import { db } from '$lib/server/db/index.js';
import { accessLog } from '$lib/server/db/schema/accessLog.js';
import { redirect as redirectTable } from '$lib/server/db/schema/redirect.js';
import { error, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export const load = async ({ url }) => {
	const path = url.pathname;

	const query = await db.select().from(redirectTable).where(eq(redirectTable.from, path));

	if (query.length > 1) return error(501, 'Multiple redirect found.');
	else if (query.length == 1) {
		await db.insert(accessLog).values({
			url: query[0].from
		});
		return redirect(307, query[0].to);
	}

	return error(404, 'No page or redirect found');
};
