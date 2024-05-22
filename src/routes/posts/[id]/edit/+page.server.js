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

	let categories = [];

	res = await fetch(`https://svendeapi.emilstorgaard.dk/api/v1/categories`, {
		method: 'GET',
		headers: {
		  'Content-Type': 'application/json'
		},
	});

	categories = await res.json()

	return {
	  post,
	  comments,
	  categories
	};
}

const edit = async ({ locals, request, params }) => {
	// redirect user if not logged TODO: remember to only allow to edit owned users
	if (!locals.user) {
		throw redirect(302, '/login')
	}

	const data = await request.formData()
    const title = data.get('title')
	const description = data.get('description')
	const carBrand = data.get('carBrand')
	const carModel = data.get('carModel')
	const carMotor = data.get('carMotor')
	const carType = data.get('carType')
	const carFirstRegistration = data.get('carFirstRegistration')
	const categoryId = data.get('categoryId')

	// MAKE PUT REQUEST
	const response = await fetch(`https://svendeapi.emilstorgaard.dk/api/v1/posts/${params.id}`, {
		method: 'PUT',
		headers: {
		  'Content-Type': 'application/json',
		  'Authorization': `Bearer ${locals.user.jwt}`
		},
		body: JSON.stringify({title, description, carBrand, carModel, carMotor, carFirstRegistration, carType, categoryId})
	});
	
	if (!response.ok) {
		console.log(response.status)
	}

	throw redirect(303, `/`)
}

export const actions = { edit }