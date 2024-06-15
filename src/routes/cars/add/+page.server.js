import { redirect } from '@sveltejs/kit';
import { API_HOST } from '$env/static/private';

export const load = async ({ locals }) => {
	// redirect user if not logged in
	if (!locals.user) {
		throw redirect(302, '/login');
	}	
};

const add = async ({ locals, request }) => {
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

	const response = await fetch(`${API_HOST}/cars`, {
		method: 'POST',
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

export const actions = { add };
