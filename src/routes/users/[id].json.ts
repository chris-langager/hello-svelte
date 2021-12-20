import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async (request) => {
	console.log('this should be on the server side');
	return {
		body: {
			id: request.params.id,
			name: 'some name'
		}
	};
};
