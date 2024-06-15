<script>
	import { page } from '$app/stores';

	import PostFilter from '$lib/components/PostFilter.svelte';
	import PostList from '$lib/components/PostList.svelte';

	export let data;

	let posts = data.posts;
	let categorySearch = '';

	let postInputs = {
		brand: '',
		model: '',
		categoryId: '',
		search: ''
	};

    // Function to build query string from postInputs
	const buildQueryString = (inputs) => {
		// Initialize an array to hold the query parameters
		let queryParams = [];

		// Conditionally add parameters to the queryParams array if they are defined
		if (postInputs.brand !== undefined) queryParams.push(`brand=${postInputs.brand}`);
		if (postInputs.model !== undefined) queryParams.push(`model=${postInputs.model}`);
		if (postInputs.categoryId !== undefined)queryParams.push(`category_id=${postInputs.categoryId}`);
		if (postInputs.search !== undefined) queryParams.push(`search=${postInputs.search}`);

		// Join the query parameters with '&' to form the query string
		return queryParams.length ? `?${queryParams.join('&')}` : '';
	};

	async function getPostsByInput() {
        const queryString = buildQueryString(postInputs);

        try {
			const res = await fetch(`${$page.data.API_HOST}/posts/${queryString}`, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' }
			});
			if (!res.ok) throw new Error('Kunne ikke hente opslag');
			posts = await res.json();
		} catch (error) {
			console.error(error);
		}
	}
</script>

<PostFilter bind:postInputs {getPostsByInput} categories={data.categories} />

<PostList {posts} {categorySearch} />
