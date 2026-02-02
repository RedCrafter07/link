import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	if (locals.user.role !== 'admin') return redirect(307, '/dash');
};
