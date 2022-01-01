import type { RequestHandler } from '@sveltejs/kit';

import * as store from '../../store';

export const get: RequestHandler = async (request) => {
	const entries = await store.listEntries();

	if (entries.length === 0) {
		const entry = await store.createEntry({
			someTextField: 'Default Entry'
		});

		entries.push(entry);
	}

	return {
		body: {
			entries
		}
	};
};
