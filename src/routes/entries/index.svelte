<script context="module">
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ fetch }) {
		const url = `/entries.json`;
		const res = await fetch(url);
		const body = await res.json();

		if (!res.ok) {
			return {
				status: res.status,
				error: new Error(`Could not load ${url}`)
			};
		}

		return {
			props: {
				entries: body.entries
			}
		};
	}
</script>

<script lang="ts">
	import type { Entry } from 'src/store';
	export let entries: Entry[];
</script>

<h1>These are the entries {JSON.stringify(entries)}</h1>
