import { fail, redirect } from '@sveltejs/kit';
import { API_HOST } from '$env/static/private';

export const load = async ({ locals }) => {
	// redirect user if logged in
	if (locals.user) {
		throw redirect(302, `/`);
	}
};

const login = async ({ cookies, request }) => {
	const data = await request.formData();
	const email = data.get('email');
	const password = data.get('password');

	if (typeof email !== 'string' || typeof password !== 'string' || !email || !password) {
		return fail(400, { invalid: true });
	}

	const response = await fetch(`${API_HOST}/auth/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ email, password })
	});

	const resp = await response.json();
	if (!response.ok) {
		return fail(400, { message: resp.error });
	}

	cookies.set('jwt', resp.token, {
		path: '/',
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		maxAge: 60 * 60
	});

	throw redirect(302, '/');
};

export const actions = { login };
