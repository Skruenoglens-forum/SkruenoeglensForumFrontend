import { fail, redirect } from '@sveltejs/kit';
import { API_HOST } from '$env/static/private';

export const load = async ({ locals }) => {
	// redirect user if logged in
	if (locals.user) {
		throw redirect(302, `/`);
	}
};

const signup = async ({ request }) => {
	const data = await request.formData();
	const name = data.get('name');
	const email = data.get('email');
	const profileImage = data.get('profileImage');
	const description = data.get('description');
	const password = data.get('password');
	const repeatPassword = data.get('repeat-password');

	if (
		typeof name !== 'string' ||
		typeof email !== 'string' ||
		typeof password !== 'string' ||
		typeof description !== 'string' ||
		!email ||
		!password
	) {
		return fail(400, { invalid: true });
	}

	if (password !== repeatPassword) {
		return fail(400, { pwdMatch: true });
	}

	// Create form data
	const formData = new FormData();
	formData.append('file', profileImage);
	formData.append('name', name);
	formData.append('email', email);
	formData.append('description', description);
	formData.append('password', password);

	// MAKE POST SIGNUP REQUEST
	const response = await fetch(`${API_HOST}/users`, {
		method: 'POST',
		body: formData
	});

	if (!response.ok) {
		console.log(response.status);
		return fail(400, { user: true });
	}

	throw redirect(303, '/login');
};

export const actions = { signup };
