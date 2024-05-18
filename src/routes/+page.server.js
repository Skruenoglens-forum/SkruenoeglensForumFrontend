export const load = async () => {
	let posts = [];

	const res = await fetch(`https://svendeapi.emilstorgaard.dk/api/v1/posts`, {
		method: 'GET',
		headers: {
		  'Content-Type': 'application/json'
		},
	});

	posts = await res.json()

	return {
	  posts
	};
}