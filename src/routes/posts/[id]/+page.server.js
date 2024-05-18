export const load = async ({ params }) => {
	let post = [];

	const res = await fetch(`https://svendeapi.emilstorgaard.dk/api/v1/posts/${params.id}`, {
		method: 'GET',
		headers: {
		  'Content-Type': 'application/json'
		},
	});

	post = await res.json()

	return {
	  post
	};
}