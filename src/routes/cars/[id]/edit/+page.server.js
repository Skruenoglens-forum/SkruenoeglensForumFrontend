import { redirect } from '@sveltejs/kit';
import { API_HOST } from '$env/static/private';

export const load = async ({ locals, params }) => {
	try {
		// Redirect user if not logged in
		if (!locals.user) {
			throw redirect(302, '/login');
		}

		const car = await getCar(params.id)

		// Check if logged in user owns this car
		if (locals.user.uid != car.user_id && locals.user.roleId != 1) {
			throw redirect(302, `/`);
		}

		return {
			car
		};
	} catch (error) {
		throw redirect(302, '/');
	}
};

const getCar = async (id) => {
	const res = await fetch(`${API_HOST}/cars/${id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	if (!res.ok) {
		throw new Error('Kunne ikke hente bil');
	}

	return await res.json();
}

const edit = async ({ locals, request, params }) => {
	const data = await request.formData();

	const formData = new FormData();
	formData.append('file', data.get('carImage'));
	formData.append('licensePlate', data.get('licensePlate'));
	formData.append('brand', data.get('brand'));
	formData.append('model', data.get('model'));
	formData.append('motor', data.get('motor'));
	formData.append('type', data.get('type'));
	formData.append('firstRegistration', data.get('firstRegistration'));
	formData.append('vin', data.get('vin'));

	const response = await fetch(`${API_HOST}/cars/${params.id}`, {
		method: 'PUT',
		headers: {
			Authorization: `Bearer ${locals.user.jwt}`
		},
		body: formData
	});

	if (!response.ok) {
		console.log(response.status);
	}

	throw redirect(303, `/users/${locals.user.uid}`);
};

export const actions = { edit };
