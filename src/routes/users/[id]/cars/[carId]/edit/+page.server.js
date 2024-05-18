import { redirect } from '@sveltejs/kit'

export const load = async ({ locals, params }) => {
	// redirect user if not logged TODO: remember to only allow to edit owned users
    if (!locals.user) {
		throw redirect(302, '/login')
	}

	let car = [];

	const res = await fetch(`https://svendeapi.emilstorgaard.dk/api/v1/cars/${params.carId}`, {
		method: 'GET',
		headers: {
		  'Content-Type': 'application/json',
		  'Authorization': `Bearer ${locals.user.jwt}`
		},
	});

	car = await res.json()

	return {
	  car
	};
}

const edit = async ({ locals, request, params }) => {
	const data = await request.formData()
    const licensePlate = data.get('licensePlate')
	const brand = data.get('brand')
	const model = data.get('model')
	const motor = data.get('motor')
	const type = data.get('type')
	const firstRegistration = data.get('firstRegistration')
	const vin = data.get('vin')

	// MAKE PUT REQUEST
	const response = await fetch(`https://svendeapi.emilstorgaard.dk/api/v1/cars/${params.carId}`, {
		method: 'PUT',
		headers: {
		  'Content-Type': 'application/json',
		  'Authorization': `Bearer ${locals.user.jwt}`
		},
		body: JSON.stringify({brand, motor, firstRegistration, model, type, licensePlate, vin})
	});
	
	if (!response.ok) {
		console.log(response.status)
	}

	throw redirect(303, `/users/${params.id}`)
}

export const actions = { edit }