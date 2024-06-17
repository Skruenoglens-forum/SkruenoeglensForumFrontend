import { redirect } from '@sveltejs/kit';
import { API_HOST } from '$env/static/private';

export const load = async ({ params, locals }) => {
	if (!locals.user) {
		throw redirect(302, '/login');
	}

	const post = await getPost(params.id)

	// Check if logged in user owns this post
	if (locals.user.uid != post.user_id && locals.user.roleId != 1) {
		throw redirect(302, `/`);
	}

	const categories = await getCategories()

	return {
		post,
		categories
	};
};

const getPost = async (id) => {
	const res = await fetch(`${API_HOST}/posts/${id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	return await res.json();
}

const getCategories = async () => {
	const res = await fetch(`${API_HOST}/categories`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	return await res.json();
}

const edit = async ({ locals, request, params }) => {
	// redirect user if not logged
	if (!locals.user) {
		throw redirect(302, '/login');
	}

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

	throw redirect(303, `/posts/${params.id}`);
};

export const actions = { edit };