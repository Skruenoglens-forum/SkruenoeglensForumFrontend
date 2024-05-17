import jwt from 'jsonwebtoken';

/*
	You can use a custom redirect if you want...

	function redirect(location: string) {
		return new Response(undefined, {
			status: 303,
			headers: { location },
		})
	}

	...and redirect pages inside hooks.server.ts

	if (!session) {
		if (event.url.pathname === '/admin') {
			return redirect('/')
		}

		return await resolve(event)
	}

	...but doing it inside `load` for the protected
	routes you can invalidate the data on the page
*/

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
