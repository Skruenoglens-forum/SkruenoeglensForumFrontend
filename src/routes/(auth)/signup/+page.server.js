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
	if (data.get('password') !== data.get('repeat-password')) {
		return fail(400, { message: "Passwords matcher ikke" });
	}

	const formData = new FormData();
	formData.append('file', data.get('profileImage'));
	formData.append('name', data.get('name'));
	formData.append('email', data.get('email'));
	formData.append('description', data.get('description'));
	formData.append('password', data.get('password'));

	const response = await fetch(`${API_HOST}/users`, {
		method: 'POST',
		body: formData
	});

	const resp = await response.json();
	if (!response.ok) {
		return fail(400, { message: resp.error });
	}

	throw redirect(303, '/login');
};

export const actions = { signup };
