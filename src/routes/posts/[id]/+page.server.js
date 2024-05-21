import { redirect } from '@sveltejs/kit'

export const load = async ({ locals, params }) => {
	// redirect user if not logged in TODO: remember to only allow to edit owned users
	if (!locals.user) {
		throw redirect(302, '/login')
	}

	let post = [];

	let res = await fetch(`https://svendeapi.emilstorgaard.dk/api/v1/posts/${params.id}`, {
		method: 'GET',
		headers: {
		  'Content-Type': 'application/json'
		},
	});

	post = await res.json()

	let comments = [];

	res = await fetch(`https://svendeapi.emilstorgaard.dk/api/v1/posts/${params.id}/comments`, {
		method: 'GET',
		headers: {
		  'Content-Type': 'application/json',
		  'Authorization': `Bearer ${locals.user.jwt}`
		},
	});

	comments = await res.json()

	return {
	  post,
	  comments
	};
}


const addComment = async ({ request, locals, params }) => {
	const data = await request.formData()
	const title = data.get('title')
	const description = data.get('description')
	const parentId = params.id
	
	// MAKE POST REQUEST
	await fetch(`https://svendeapi.emilstorgaard.dk/api/v1/posts`, {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json',
		  'Authorization': `Bearer ${locals.user.jwt}`
		},
		body: JSON.stringify({title, description, parentId})
	});

	// redirect the user
	throw redirect(302, `/posts/${params.id}`)
}

export const actions = { addComment }