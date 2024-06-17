import { redirect } from '@sveltejs/kit';
import { API_HOST } from '$env/static/private';

export const load = async ({ params }) => {
	const post = await getPost(params.id)
	const images = await getImages(params.id)
	const comments = await getComments(params.id)

	return {
		post,
		images,
		comments
	};
};

const getPost = async (id) => {
	const res = await fetch(`${API_HOST}/posts/${id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	return await res.json();
}

const getImages = async (id) => {
	const res = await fetch(`${API_HOST}/posts/${id}/images`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	return await res.json();
}

const getComments = async (id) => {
	const res = await fetch(`${API_HOST}/comments/posts/${id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	return await res.json();
}

const addComment = async ({ request, locals, params }) => {
	const data = await request.formData();
	const description = data.get('description');
	const parentId = data.get('parentId');

	// redirect user if not logged in
	if (!locals.user) {
		throw redirect(302, '/login');
	}

	await fetch(`${API_HOST}/comments/posts/${params.id}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${locals.user.jwt}`
		},
		body: JSON.stringify({ description, parentId })
	});
};

const editComment = async ({ request, locals }) => {
	const data = await request.formData();
	const description = data.get('description');
	const commentId = data.get('commentId');

	// redirect user if not logged in
	if (!locals.user) {
		throw redirect(302, '/login');
	}

	await fetch(`${API_HOST}/comments/${commentId}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${locals.user.jwt}`
		},
		body: JSON.stringify({ description })
	});
};

const markCommentAsSolution = async ({ request, locals }) => {
	const data = await request.formData();
	const commentId = data.get('commentId');

	await fetch(`${API_HOST}/comments/${commentId}/solution/1`, {
		method: 'PUt',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${locals.user.jwt}`
		}
	});
};

const removeCommentAsSolution = async ({ request, locals }) => {
	const data = await request.formData();
	const commentId = data.get('commentId');

	await fetch(`${API_HOST}/comments/${commentId}/solution/0`, {
		method: 'PUt',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${locals.user.jwt}`
		}
	});
};

const deleteComment = async ({ request, locals }) => {
	const data = await request.formData();
	const commentId = data.get('commentId');

	await fetch(`${API_HOST}/comments/${commentId}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${locals.user.jwt}`
		}
	});
};

const deletePost = async ({ locals, params }) => {
	await fetch(`${API_HOST}/posts/${params.id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${locals.user.jwt}`
		}
	});

	throw redirect(303, `/users/${locals.user.uid}`);
};

export const actions = {
	addComment,
	editComment,
	markCommentAsSolution,
	removeCommentAsSolution,
	deleteComment,
	deletePost
};
