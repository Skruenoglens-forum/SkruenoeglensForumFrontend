import { redirect } from '@sveltejs/kit'
import { API_HOST } from '$env/static/private';

const add = async ({ locals, request, params }) => {
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

	// MAKE POST REQUEST
	const response = await fetch(`${API_HOST}/cars`, {
		method: 'POST',
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

export const actions = { add }