import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '$env/static/private';

// Function to validate and decode JWT
const validateToken = (token) => {
	try {
        return jwt.verify(token, JWT_SECRET_KEY);
	} catch (error) {
		console.error('Token validation error:', error);
		return null;
	}
};

export const handle = async ({ event, resolve }) => {
	// get JWT from cookies
	const token = event.cookies.get('jwt');

	// If no token is present, proceed as usual
	if (!token) {
		return await resolve(event);
	}

	// Validate and decode token
	const decodedToken = validateToken(token);

	if (decodedToken) {
		const { email, uid, roleId } = decodedToken;

		// If the token contains the required claims, set them in locals
		if (email && uid && roleId) {
			event.locals.user = { email, uid, roleId, jwt: token };
		}
	} else {
		// If token validation failed, return a 401 response
		return new Response('Invalid or expired token', { status: 401 });
	}

	// Proceed with the request
	return resolve(event);
};
