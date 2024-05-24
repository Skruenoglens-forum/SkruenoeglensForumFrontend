import { redirect } from '@sveltejs/kit'
import { API_HOST } from '$env/static/private';

export const load = async ({ locals, params }) => {
	// redirect user if not logged TODO: remember to only allow to edit owned users
    if (!locals.user) {
		throw redirect(302, '/login')
	}

	let car = [];

	const res = await fetch(`${API_HOST}/cars/${params.carId}`, {
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
	const carImage = data.get('carImage');
    const licensePlate = data.get('licensePlate')
	const brand = data.get('brand')
	const model = data.get('model')
	const motor = data.get('motor')
	const type = data.get('type')
	const firstRegistration = data.get('firstRegistration')
	const vin = data.get('vin')

	let base64String = null;
	if (carImage && carImage instanceof Blob) {
		const arrayBuffer = await carImage.arrayBuffer();
		base64String = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
	}

	// MAKE PUT REQUEST
	const response = await fetch(`${API_HOST}/cars/${params.carId}`, {
		method: 'PUT',
		headers: {
		  'Content-Type': 'application/json',
		  'Authorization': `Bearer ${locals.user.jwt}`
		},
		body: JSON.stringify({brand, motor, firstRegistration, model, type, licensePlate, vin, image: base64String})
	});
	
	if (!response.ok) {
		console.log(response.status)
	}

	throw redirect(303, `/users/${params.id}`)
}

export const actions = { edit }