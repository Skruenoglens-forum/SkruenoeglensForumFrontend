import { redirect } from '@sveltejs/kit'

export const load = async () => {
	let categories = [];

	const res = await fetch(`https://svendeapi.emilstorgaard.dk/api/v1/categories`, {
		method: 'GET',
		headers: {
		  'Content-Type': 'application/json'
		},
	});

	categories = await res.json()

	return {
		categories
	};
}

const add = async ({ locals, request }) => {
	const data = await request.formData()
    const title = data.get('title')
	const description = data.get('description')
	const carBrand = data.get('carBrand')
	const carModel = data.get('carModel')
	const carMotor = data.get('carMotor')
	const carType = data.get('carType')
	const carFirstRegistration = data.get('carFirstRegistration')
	const categoryId = data.get('categoryId')

	// MAKE POST REQUEST
	const response = await fetch(`https://svendeapi.emilstorgaard.dk/api/v1/posts`, {
		method: 'POST',
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

export const actions = { add }