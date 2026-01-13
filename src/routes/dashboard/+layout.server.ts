import { redirect } from '@sveltejs/kit';

export const load = ({ locals }) => {
	if (!locals.session) return redirect(307, '/auth');
};
