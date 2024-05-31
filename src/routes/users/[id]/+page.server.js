import { redirect, fail } from '@sveltejs/kit';
import { API_HOST } from '$env/static/private';

export const load = async ({ params }) => {
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

const deleteUser = async ({ request, locals, cookies }) => {
	const data = await request.formData();
	const userID = data.get('userID');

	// MAKE POST LOGIN REQUEST
	await fetch(`${API_HOST}/users/${userID}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${locals.user.jwt}`
		}
	});

	// If user delete it self
	if (locals.user.uid == userID) {
		// eat the cookie
		cookies.set('jwt', '', {
			path: '/',
			httpOnly: true,
			//expires: new Date(Date.now() - 3600000), // new Date(0)
			maxAge: 0,
			secure: process.env.NODE_ENV === 'production'
		});

		// redirect the user
		throw redirect(302, '/signup');
	} else {
		// redirect the user
		throw redirect(302, '/admin');
	}
};

const deleteCar = async ({ request, locals }) => {
	const data = await request.formData();
	const carID = data.get('carID');

	// MAKE DELETE REQUEST
	const response = await fetch(`${API_HOST}/cars/${carID}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${locals.user.jwt}`
		}
	});

	const resp = await response.json();
	if (!response.ok) {
		return fail(400, { message: resp.error });
	}

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

export const actions = { deleteCar, deletePost, deleteUser };
