import { redirect } from '@sveltejs/kit'

export const load = async ({ locals, params }) => {
	// redirect user if not logged in TODO: remember to only allow to edit owned users
    if (!locals.user) {
		throw redirect(302, '/login')
	}

	let user = [];

	const res = await fetch(`https://svendeapi.emilstorgaard.dk/api/v1/users/${params.id}`, {
		method: 'GET',
		headers: {
		  'Content-Type': 'application/json',
		  'Authorization': `Bearer ${locals.user.jwt}`
		},
	});

	user = await res.json()

	return {
	  user
	};
}