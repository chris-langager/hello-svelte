<script context="module">
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ page, fetch, session, stuff }) {
		const url = `/users/${page.params.id}.json`;
		const res = await fetch(url);

		if (!res.ok) {
			return {
				status: res.status,
				error: new Error(`Could not load ${url}`)
			};
		}

		return {
			props: {
				user: await res.json()
			}
		};
	}
</script>

<script>
	export let user;
</script>

<h1>This is the user page for user {JSON.stringify(user)}</h1>
