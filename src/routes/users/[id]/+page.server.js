import { redirect } from '@sveltejs/kit';
import { API_HOST } from '$env/static/private';

export const load = async ({ locals, params }) => {
	// redirect user if not logged in TODO: remember to only allow to edit owned users
	if (!locals.user) {
		throw redirect(302, '/login');
	}

	let user;
	try {
		let res = await fetch(`${API_HOST}/users/${params.id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		// Check if the response status is OK (status code 2xx)
		if (!res.ok) {
			throw new Error('User not found');
		}

		user = await res.json();
	} catch (error) {
		throw redirect(302, '/');
	}

	let cars = [];
	try {
		let res = await fetch(`${API_HOST}/cars/users/${params.id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		// Check if the response status is OK (status code 2xx)
		if (!res.ok) {
			throw new Error('Error');
		}

		cars = await res.json();
	} catch (error) {
		throw redirect(302, '/');
	}

	let posts = [];
	try {
		let res = await fetch(`${API_HOST}/posts/users/${params.id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		// Check if the response status is OK (status code 2xx)
		if (!res.ok) {
			throw new Error('Error');
		}

		posts = await res.json();
	} catch (error) {
		throw redirect(302, '/');
	}

	return {
		user,
		cars,
		posts
	};
};

const deleteCar = async ({ request, locals }) => {
	const data = await request.formData();
	const carID = data.get('carID');

	// MAKE DELETE REQUEST
	await fetch(`${API_HOST}/cars/${carID}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${locals.user.jwt}`
		}
	});

	// redirect the user
	throw redirect(302, `/users/${locals.user.uid}`);
};

const deletePost = async ({ request, locals }) => {
	const data = await request.formData();
	const postId = data.get('postId');

	// MAKE DELETE REQUEST
	await fetch(`${API_HOST}/posts/${postId}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${locals.user.jwt}`
		}
	});

	// redirect the user
	throw redirect(302, `/users/${locals.user.uid}`);
};

export const actions = { deleteCar, deletePost };
