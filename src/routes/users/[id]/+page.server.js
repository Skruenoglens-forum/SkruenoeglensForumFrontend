import { redirect, fail } from '@sveltejs/kit';
import { API_HOST } from '$env/static/private';

export const load = async ({ params }) => {
	const user = await getUser(params.id)
	const cars = await getCars(params.id)
	const posts = await getPosts(params.id)

	return {
		user,
		cars,
		posts
	};
};

const getUser = async (id) => {
	try {
		let res = await fetch(`${API_HOST}/users/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (!res.ok) {
			throw new Error('Bruger ikke fundet');
		}

		return await res.json();
	} catch (error) {
		throw redirect(302, '/');
	}
};

const getCars = async (id) => {
	try {
		let res = await fetch(`${API_HOST}/cars/users/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (!res.ok) {
			throw new Error('Kunne ikke hente biler');
		}

		return await res.json();
	} catch (error) {
		throw redirect(302, '/');
	}
}

const getPosts = async (id) => {
	try {
		let res = await fetch(`${API_HOST}/posts/users/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (!res.ok) {
			throw new Error('Error');
		}

		return await res.json();
	} catch (error) {
		throw redirect(302, '/');
	}
}

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

	// If user delete it self
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

const deleteCar = async ({ request, locals }) => {
	const data = await request.formData();
	const carID = data.get('carID');

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

	throw redirect(302, `/users/${locals.user.uid}`);
};

const deletePost = async ({ request, locals }) => {
	const data = await request.formData();
	const postId = data.get('postId');

	await fetch(`${API_HOST}/posts/${postId}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${locals.user.jwt}`
		}
	});

	throw redirect(302, `/users/${locals.user.uid}`);
};

export const actions = { deleteCar, deletePost, deleteUser };
