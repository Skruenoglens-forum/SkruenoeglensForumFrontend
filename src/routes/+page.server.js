export const load = async () => {
	let posts = [];

	let res = await fetch(`https://svendeapi.emilstorgaard.dk/api/v1/posts`, {
		method: 'GET',
		headers: {
		  'Content-Type': 'application/json'
		},
	});

	posts = await res.json()

	let categories = [];

	res = await fetch(`https://svendeapi.emilstorgaard.dk/api/v1/categories`, {
		method: 'GET',
		headers: {
		  'Content-Type': 'application/json'
		},
	});

	categories = await res.json()

	return {
	  posts,
	  categories
	};
}