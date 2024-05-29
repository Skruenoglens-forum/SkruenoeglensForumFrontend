import { fail, redirect } from '@sveltejs/kit'
import { API_HOST } from '$env/static/private';

export const load = async ({ locals, params }) => {
	// redirect user if not logged TODO: remember to only allow to edit owned users
    if (!locals.user) {
		throw redirect(302, '/login')
	}

	let user = [];

	const res = await fetch(`${API_HOST}/users/${params.id}`, {
		method: 'GET',
		headers: {
		  'Content-Type': 'application/json',
		  'Authorization': `Bearer ${locals.user.jwt}`
		},
	});

	user = await res.json()

	return {
	  user
	};
}

const edit = async ({ locals, request, params }) => {
    const data = await request.formData();
    const profileImage = data.get('profileImage');
    const name = data.get('name');
    const email = data.get('email');
    const description = data.get('description');

	// Create form data
	const formData = new FormData();
	formData.append('file', profileImage);
	formData.append('name', name);
	formData.append('email', email);
	formData.append('description', description);

	// Make PUT request to the endpoint
	const response = await fetch(`${API_HOST}/users/${params.id}`, {
		method: 'PUT',
		headers: {
			'Authorization': `Bearer ${locals.user.jwt}`
		},
		body: formData
	});

	if (!response.ok) {
		console.log(response.status);
		return fail(400, { user: true });
	}

	throw redirect(303, `/users/${params.id}`);
};

const newpassword = async ({ locals, request, params }) => {
	const data = await request.formData()
    const newPassword = data.get('new-password')

	if (typeof newPassword !== 'string' || !newPassword) {
		return fail(400, { invalid: true });
	}

	// MAKE PUT NEW PASSWORD REQUEST
	const response = await fetch(`${API_HOST}/auth/new/password/${params.id}`, {
		method: 'PUT',
		headers: {
		  'Content-Type': 'application/json',
		  'Authorization': `Bearer ${locals.user.jwt}`
		},
		body: JSON.stringify({ "newPassword": newPassword })
	});

	if (!response.ok) {
		console.log(response.status)
		return fail(400, { user: true });
	}

	throw redirect(303, `/`)
}

export const actions = { edit, newpassword }