import { API_HOST } from '$env/static/private';

// get `locals.user` and pass it to the `page` store
export const load = async ({ locals }) => {
	return {
		loggedInUser: locals.user,
		API_HOST: API_HOST
	};
};
