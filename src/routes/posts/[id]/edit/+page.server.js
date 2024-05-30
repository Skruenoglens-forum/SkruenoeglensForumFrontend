import { redirect } from '@sveltejs/kit';
import { API_HOST } from '$env/static/private';

export const load = async ({ params }) => {
	let post = [];

	let res = await fetch(`${API_HOST}/posts/${params.id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	post = await res.json();

	let categories = [];

	res = await fetch(`${API_HOST}/categories`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	categories = await res.json();

	return {
		post,
		categories
	};
};

const edit = async ({ locals, request, params }) => {
	// redirect user if not logged TODO: remember to only allow to edit owned users
	if (!locals.user) {
		throw redirect(302, '/login');
	}

	const data = await request.formData();
	const postImages = data.getAll('postImages');
	const title = data.get('title');
	const description = data.get('description');
	const carBrand = data.get('carBrand');
	const carModel = data.get('carModel');
	const carMotor = data.get('carMotor');
	const carType = data.get('carType');
	const carFirstRegistration = data.get('carFirstRegistration');
	const categoryId = data.get('categoryId');

	// Create form data
	const formData = new FormData();
	// Assuming postImages is an array of File objects
	postImages.forEach((file) => {
		formData.append('images', file);
	});
	formData.append('title', title);
	formData.append('description', description);
	formData.append('carBrand', carBrand);
	formData.append('carModel', carModel);
	formData.append('carMotor', carMotor);
	formData.append('carType', carType);
	formData.append('carFirstRegistration', carFirstRegistration);
	formData.append('categoryId', categoryId);

	// MAKE PUT REQUEST
	const response = await fetch(`${API_HOST}/posts/${params.id}`, {
		method: 'PUT',
		headers: {
			Authorization: `Bearer ${locals.user.jwt}`
		},
		body: formData
	});

	if (!response.ok) {
		console.log(response.status);
	}

	throw redirect(303, `/`);
};

export const actions = { edit };
