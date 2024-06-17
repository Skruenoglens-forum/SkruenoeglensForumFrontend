import { redirect } from '@sveltejs/kit';
import { API_HOST } from '$env/static/private';

export const load = async ({ locals }) => {
	// redirect user if not logged in or admin role id
	if (!locals.user || locals.user.roleId != 1) {
		throw redirect(302, '/login');
	}

	const users = await getUsers()

	return {
		users
	};
};

const getUsers = async () => {
	const res = await fetch(`${API_HOST}/users`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	return await res.json();
}

const banUser = async ({ request, locals }) => {
	const data = await request.formData();
	const userID = data.get('userID');

	await fetch(`${API_HOST}/users/${userID}/ban`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${locals.user.jwt}`
		}
	});
};

const unbanUser = async ({ request, locals }) => {
	const data = await request.formData();
	const userID = data.get('userID');

	await fetch(`${API_HOST}/users/${userID}/unban`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${locals.user.jwt}`
		}
	});
};

const deleteUser = async ({ request, locals, cookies }) => {
	const data = await request.formData();
	const userID = data.get('userID');

	await fetch(`${API_HOST}/users/${userID}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${locals.user.jwt}`
		}
	});

	// If admin delete it self
	if (locals.user.uid == userID) {
		// eat the cookie
		cookies.set('jwt', '', {
			path: '/',
			httpOnly: true,
			maxAge: 0,
			secure: process.env.NODE_ENV === 'production'
		});

		throw redirect(302, '/signup');
	}
};

export const actions = { deleteUser, banUser, unbanUser };
