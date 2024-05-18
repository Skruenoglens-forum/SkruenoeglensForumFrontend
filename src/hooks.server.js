import jwt from 'jsonwebtoken';

export const handle = async ({ event, resolve }) => {
	// get cookies from browser
	const token = event.cookies.get('jwt')

	if (!token) {
		// if there is no token load page as normal
		return await resolve(event)
	}

	try {
		// VALIDATE JWT TOKEN
		const decodedToken = jwt.verify(token, 'gfg_jwt_secret_key');
	
		// GET CLAIMS FROM JWT TOKEN
		const { email, uid, roleId } = decodedToken;
	
		// if `user` exists set `events.local`
		if (email && uid && roleId) {
			event.locals.user = {
				email: email,
				uid: uid,
				roleId: roleId,
				jwt: token,
			}
		}

		// load page as normal
		return await resolve(event)

	} catch (error) {
		// handle invalid token error
		console.error(error);
		return new Response('Invalid token', { status: 401 });
	}
}