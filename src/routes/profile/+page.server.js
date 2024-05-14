export const load = async ({ locals }) => {
    let userInfo = {};

    const res = await fetch(`https://api.emilstorgaard.dk/api/v1/users/${locals.user.uid}`, {
		method: 'GET',
		headers: {
		  'Content-Type': 'application/json',
		  'Authorization': `Bearer ${locals.user.jwt}`
		},
	});

	userInfo = await res.json();

	return {
		userInfo
	}
}