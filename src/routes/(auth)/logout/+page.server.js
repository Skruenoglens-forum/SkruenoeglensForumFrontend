import { redirect } from '@sveltejs/kit';

export const load = async () => {
	throw redirect(302, '/');
};

export const actions = {
	default({ cookies }) {
		// eat the cookie
		cookies.set('jwt', '', {
			path: '/',
			httpOnly: true,
			maxAge: 0,
			secure: process.env.NODE_ENV === 'production'
		});

		throw redirect(302, '/login');
	}
};
