import { redirect } from '@sveltejs/kit'
import { API_HOST } from '$env/static/private';

export const load = async ({ params }) => {
	let post = [];

	let res = await fetch(`${API_HOST}/posts/${params.id}`, {
		method: 'GET',
		headers: {
		  'Content-Type': 'application/json'
		},
	});

	post = await res.json()

	let images = [];

	res = await fetch(`${API_HOST}/posts/${params.id}/images`, {
		method: 'GET',
		headers: {
		  'Content-Type': 'application/json'
		},
	});

	images = await res.json()

	let comments = [];

	res = await fetch(`${API_HOST}/comments/posts/${params.id}`, {
		method: 'GET',
		headers: {
		  'Content-Type': 'application/json'
		},
	});

	comments = await res.json()

	return {
	  post,
	  images,
	  comments,
	  API_HOST
	};
}


const addComment = async ({ request, locals, params }) => {
	const data = await request.formData()
	const description = data.get('description')
	const parentId = data.get('parentId')

	// redirect user if not logged in
	if (!locals.user) {
		throw redirect(302, '/login')
	}
	
	// MAKE POST REQUEST
	await fetch(`${API_HOST}/comments/posts/${params.id}`, {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json',
		  'Authorization': `Bearer ${locals.user.jwt}`
		},
		body: JSON.stringify({description, parentId})
	});

	// redirect the user
	throw redirect(302, `/posts/${params.id}`)
}

const editComment = async ({ request, locals, params }) => {
	const data = await request.formData()
	const description = data.get('description')
	const commentId = data.get('commentId')

	// redirect user if not logged in
	if (!locals.user) {
		throw redirect(302, '/login')
	}
	
	// MAKE PUT REQUEST
	await fetch(`${API_HOST}/comments/${commentId}`, {
		method: 'PUT',
		headers: {
		  'Content-Type': 'application/json',
		  'Authorization': `Bearer ${locals.user.jwt}`
		},
		body: JSON.stringify({description})
	});

	// redirect the user
	throw redirect(302, `/posts/${params.id}`)
}

const markCommentAsSolution = async ({ request, locals, params }) => {
	const data = await request.formData()
	const commentId = data.get('commentId')
	
	// MAKE PUT REQUEST
	await fetch(`${API_HOST}/comments/${commentId}/solution/1`, {
		method: 'PUt',
		headers: {
		  'Content-Type': 'application/json',
		  'Authorization': `Bearer ${locals.user.jwt}`
		}
	});

	// redirect the user
	throw redirect(302, `/posts/${params.id}`)
}

const removeCommentAsSolution = async ({ request, locals, params }) => {
	const data = await request.formData()
	const commentId = data.get('commentId')
	
	// MAKE PUT REQUEST
	await fetch(`${API_HOST}/comments/${commentId}/solution/0`, {
		method: 'PUt',
		headers: {
		  'Content-Type': 'application/json',
		  'Authorization': `Bearer ${locals.user.jwt}`
		}
	});

	// redirect the user
	throw redirect(302, `/posts/${params.id}`)
}

const deleteComment = async ({ request, locals, params }) => {
	const data = await request.formData()
	const commentId = data.get('commentId')
	
	// MAKE DELETE REQUEST
	await fetch(`${API_HOST}/comments/${commentId}`, {
		method: 'DELETE',
		headers: {
		  'Content-Type': 'application/json',
		  'Authorization': `Bearer ${locals.user.jwt}`
		}
	});

	// redirect the user
	throw redirect(302, `/posts/${params.id}`)
}

const deletePost = async ({ locals, params }) => {	
	// MAKE DELETE REQUEST
	await fetch(`${API_HOST}/posts/${params.id}`, {
		method: 'DELETE',
		headers: {
		  'Content-Type': 'application/json',
		  'Authorization': `Bearer ${locals.user.jwt}`
		}
	});

	// redirect the user
	throw redirect(302, `/`)
}

export const actions = { addComment, editComment, markCommentAsSolution, removeCommentAsSolution, deleteComment, deletePost }