import { redirect } from '@sveltejs/kit'
import { API_HOST } from '$env/static/private';

export const load = async ({ locals }) => {
	// redirect user if not logged in
	if (!locals.user) {
		throw redirect(302, `/`)
	}

	let categories = [];

	let res = await fetch(`${API_HOST}/categories`, {
		method: 'GET',
		headers: {
		  'Content-Type': 'application/json'
		},
	});

	categories = await res.json()

	let cars = [];

	res = await fetch(`${API_HOST}/cars/users/${locals.user.uid}`, {
		method: 'GET',
		headers: {
		  'Content-Type': 'application/json'
		},
	});

	cars = await res.json()

	return {
		categories,
		cars
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
	const response = await fetch(`${API_HOST}/posts`, {
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