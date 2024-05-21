import { redirect } from '@sveltejs/kit'

export const load = async ({ params }) => {
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
		  'Content-Type': 'application/json'
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

	// redirect user if not logged in
	if (!locals.user) {
		throw redirect(302, '/login')
	}
	
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