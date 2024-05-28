import { API_HOST } from '$env/static/private';

export const load = async () => {
	let posts = [];

	let res = await fetch(`${API_HOST}/posts`, {
		method: 'GET',
		headers: {
		  'Content-Type': 'application/json'
		},
	});

	posts = await res.json()

	let categories = [];

	res = await fetch(`${API_HOST}/categories`, {
		method: 'GET',
		headers: {
		  'Content-Type': 'application/json'
		},
	});

	categories = await res.json()

	return {
	  posts,
	  categories,
	  API_HOST
	};
}