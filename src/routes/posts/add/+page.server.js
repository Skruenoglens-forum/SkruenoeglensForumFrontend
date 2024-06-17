import { redirect } from '@sveltejs/kit';
import { API_HOST } from '$env/static/private';

export const load = async ({ locals }) => {
	// redirect user if not logged in
	if (!locals.user) {
		throw redirect(302, '/login');
	}

	const categories = await getCategories()
	const cars = await getCars(locals.user.uid)

	return {
		categories,
		cars
	};
};

const getCategories = async () => {
	let res = await fetch(`${API_HOST}/categories`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	return await res.json();
}

const getCars = async (id) => {
	const res = await fetch(`${API_HOST}/cars/users/${id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	return await res.json();
}

const add = async ({ locals, request }) => {
	const data = await request.formData();

	const formData = new FormData();
	data.getAll('postImages').forEach((file) => {formData.append('images', file)});
	formData.append('title', data.get('title'));
	formData.append('description', data.get('description'));
	formData.append('carBrand', data.get('carBrand'));
	formData.append('carModel', data.get('carModel'));
	formData.append('carMotor', data.get('carMotor'));
	formData.append('carType', data.get('carType'));
	formData.append('carFirstRegistration', data.get('carFirstRegistration'));
	formData.append('categoryId', data.get('categoryId'));

	const response = await fetch(`${API_HOST}/posts`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${locals.user.jwt}`
		},
		body: formData
	});

	if (!response.ok) {
		console.log(response.status);
	}

	throw redirect(302, `/users/${locals.user.uid}`);
};

export const actions = { add };
