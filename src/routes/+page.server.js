import { redirect } from '@sveltejs/kit';
import { API_HOST } from '$env/static/private';

export const load = async () => {
	let posts = [];

	let res = await fetch(`${API_HOST}/posts`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	posts = await res.json();

	let categories = [];

	res = await fetch(`${API_HOST}/categories`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	categories = await res.json();

	return {
		posts,
		categories
	};
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
	throw redirect(302, `/`);
};

export const actions = { deletePost };