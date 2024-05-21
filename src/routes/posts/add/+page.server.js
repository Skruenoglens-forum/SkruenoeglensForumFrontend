import { redirect } from '@sveltejs/kit'

const add = async ({ locals, request }) => {
	const data = await request.formData()
    const title = data.get('title')
	const description = data.get('description')
	const carBrand = data.get('carBrand')
	const carModel = data.get('carModel')
	const carMotor = data.get('carMotor')
	const carType = data.get('carType')
	const carFirstRegistration = data.get('carFirstRegistration')

	// MAKE POST REQUEST
	const response = await fetch(`https://svendeapi.emilstorgaard.dk/api/v1/posts`, {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json',
		  'Authorization': `Bearer ${locals.user.jwt}`
		},
		body: JSON.stringify({title, description, carBrand, carModel, carMotor, carFirstRegistration, carType})
	});
	
	if (!response.ok) {
		console.log(response.status)
	}

	throw redirect(303, `/`)
}

export const actions = { add }