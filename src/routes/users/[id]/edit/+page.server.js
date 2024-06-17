import { fail, redirect } from '@sveltejs/kit';
import { API_HOST } from '$env/static/private';

export const load = async ({ locals, params }) => {
	// Redirect if user is not logged in
	if (!locals.user) {
		throw redirect(302, '/login');
	}

	// Redirect if not owner of user or is not admin
	if (locals.user.uid != params.id && locals.user.roleId != 1) {
		throw redirect(302, `/users/${params.id}`);
	}

	const user = await getUser(params.id)

	return {
		user
	};
};

const getUser = async (id) => {
	const res = await fetch(`${API_HOST}/users/${id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	return await res.json();
}

const edit = async ({ locals, request, params }) => {
	const data = await request.formData();

	const formData = new FormData();
	formData.append('file', data.get('profileImage'));
	formData.append('name', data.get('name'));
	formData.append('email', data.get('email'));
	formData.append('description', data.get('description'));

	const response = await fetch(`${API_HOST}/users/${params.id}`, {
		method: 'PUT',
		headers: {
			Authorization: `Bearer ${locals.user.jwt}`
		},
		body: formData
	});

	if (!response.ok) {
		console.log(response.status);
		return fail(400, { user: true });
	}

	throw redirect(302, `/users/${params.id}`);
};

const newpassword = async ({ locals, request, params }) => {
	const data = await request.formData();
	const newPassword = data.get('new-password');

	if (typeof newPassword !== 'string' || !newPassword) {
		return fail(400, { invalid: true });
	}

	const response = await fetch(`${API_HOST}/auth/new/password/${params.id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${locals.user.jwt}`
		},
		body: JSON.stringify({ newPassword: newPassword })
	});

	if (!response.ok) {
		console.log(response.status);
		return fail(400, { user: true });
	}

	throw redirect(302, `/users/${params.id}`);
};

export const actions = { edit, newpassword };
