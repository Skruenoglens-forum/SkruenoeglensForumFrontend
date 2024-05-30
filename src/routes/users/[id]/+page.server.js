import { redirect } from '@sveltejs/kit';
import { API_HOST } from '$env/static/private';

export const load = async ({ locals, params }) => {
	// redirect user if not logged in TODO: remember to only allow to edit owned users
	if (!locals.user) {
		throw redirect(302, '/login');
	}

	let user = [];

	let res = await fetch(`${API_HOST}/users/${params.id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	user = await res.json();

	let cars = [];

	res = await fetch(`${API_HOST}/cars/users/${params.id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	cars = await res.json();

	return {
		user,
		cars,
		API_HOST
	};
};

const deleteCar = async ({ request, locals }) => {
	const data = await request.formData();
	const carID = data.get('carID');

	// MAKE DELETE REQUEST
	await fetch(`${API_HOST}/cars/${carID}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${locals.user.jwt}`
		}
	});

	// redirect the user
	throw redirect(302, `/users/${locals.user.uid}`);
};

export const actions = { deleteCar };
