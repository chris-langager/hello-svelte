import type { Handle } from '@sveltejs/kit';
import * as store from '../store';

const initializing = initServer().catch((err) => {
	console.error(err);
	// Exit the app if setup has failed
	process.exit(-1);
});

export const handle: Handle = async ({ request, resolve }) => {
	await initializing;
	console.log('handle');
	return resolve(request);
};

async function initServer() {
	await store.migrate();
}
