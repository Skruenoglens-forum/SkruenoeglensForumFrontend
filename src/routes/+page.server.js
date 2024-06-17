import { API_HOST } from '$env/static/private';
import { redirect } from '@sveltejs/kit';

export const load = async () => {
	let posts = await getPosts();
	let categories = await getCategories();

	return {
		posts,
		categories
	};
};

const getPosts = async () => {
	const res = await fetch(`${API_HOST}/posts`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	return await res.json();
};

const getCategories = async () => {
	const res = await fetch(`${API_HOST}/categories`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	return await res.json();
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

	throw redirect(302, "/")
};

export const actions = { deletePost };
