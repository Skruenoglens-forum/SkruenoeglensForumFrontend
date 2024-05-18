import { redirect } from '@sveltejs/kit'

const add = async ({ locals, request, params }) => {
	const data = await request.formData()
    const licensePlate = data.get('licensePlate')
	const brand = data.get('brand')
	const model = data.get('model')
	const motor = data.get('motor')
	const type = data.get('type')
	const firstRegistration = data.get('firstRegistration')
	const vin = data.get('vin')

	// MAKE POST REQUEST
	const response = await fetch(`https://svendeapi.emilstorgaard.dk/api/v1/cars`, {
		method: 'POST',
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

export const actions = { add }