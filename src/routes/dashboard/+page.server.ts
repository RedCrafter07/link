import { db } from '$lib/server/db/index.js';
import { redirect as redirectTable } from '$lib/server/db/schema/redirect.js';
import { error, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import z from 'zod';

export const load = async ({ locals }) => {
	if (!locals.session) return redirect(307, '/auth');

	const redirects = await db.query.redirect.findMany({
		with: {
			user: true,
			logs: true
		}
	});

	return {
		redirects
	};
};

const redirectInput = z.object({
	from: z.string().startsWith('/'),
	to: z.url()
});

export const actions = {
	'new-redirect': async ({ locals, request }) => {
		if (!locals.session) return error(401);
		const formData = await request.formData();

		const formDataObject = {
			from: formData.get('from'),
			to: formData.get('to')
		};

		const validation = redirectInput.safeParse(formDataObject);

		if (!validation.success) {
			console.log(validation.error);
			return error(400);
		}

		await db.insert(redirectTable).values({
			addedBy: locals.user.id,
			from: validation.data.from,
			to: validation.data.to
		});
	},
	'delete-redirect': async ({ locals, request }) => {
		if (!locals.session) return error(401);
		const from = (await request.formData()).get('from')?.toString();

		if (!from) return error(400);

		await db.delete(redirectTable).where(eq(redirectTable.from, from));
	}
};
