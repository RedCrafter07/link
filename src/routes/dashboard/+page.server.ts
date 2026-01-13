import { db } from '$lib/server/db';

export const load = async ({ locals }) => {
	const redirects = await db.query.redirect.findMany({
		with: {
			logs: true
		}
	});
	const redirectCount = redirects.length;
	const redirectVisitCount = redirects.reduce((prev, c) => {
		return prev + c.logs.length;
	}, 0);

	return { user: locals.user, redirectCount, redirectVisitCount };
};
