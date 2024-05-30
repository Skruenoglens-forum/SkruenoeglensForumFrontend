import { redirect } from '@sveltejs/kit';
import { API_HOST } from '$env/static/private';

export const load = async ({ locals, params }) => {
	// redirect user if not logged TODO: remember to only allow to edit owned users
	if (!locals.user) {
		throw redirect(302, '/login');
	}

	let car = [];

	const res = await fetch(`${API_HOST}/cars/${params.carId}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${locals.user.jwt}`
		}
	});

	car = await res.json();

	return {
		car
	};
};

const edit = async ({ locals, request, params }) => {
	const data = await request.formData();
	const carImage = data.get('carImage');
	const licensePlate = data.get('licensePlate');
	const brand = data.get('brand');
	const model = data.get('model');
	const motor = data.get('motor');
	const type = data.get('type');
	const firstRegistration = data.get('firstRegistration');
	const vin = data.get('vin');

	// Create form data
	const formData = new FormData();
	formData.append('file', carImage);
	formData.append('licensePlate', licensePlate);
	formData.append('brand', brand);
	formData.append('model', model);
	formData.append('motor', motor);
	formData.append('type', type);
	formData.append('firstRegistration', firstRegistration);
	formData.append('vin', vin);

	// MAKE PUT REQUEST
	const response = await fetch(`${API_HOST}/cars/${params.carId}`, {
		method: 'PUT',
		headers: {
			Authorization: `Bearer ${locals.user.jwt}`
		},
		body: formData
	});

	if (!response.ok) {
		console.log(response.status);
	}

	throw redirect(303, `/users/${params.id}`);
};

export const actions = { edit };
