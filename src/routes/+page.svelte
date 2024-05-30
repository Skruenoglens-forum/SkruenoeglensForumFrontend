<script>
	import { page } from '$app/stores';

	import CategorySelector from '../lib/components/CategorySelector.svelte';
	import LicensePlateSearch from '../lib/components/LicensePlateSearch.svelte';
	import PostList from '../lib/components/PostList.svelte';

	export let data;

	let posts = data.posts;

	let categorySearch = '';
	async function getPostsByCategoryId(categoryId) {
		data.categoryId = categoryId
		let res
		if(data.car && categoryId){
			res = await fetch(`${$page.data.API_HOST}/posts/categories/${data.categoryId}/${data.car.brandnavn}/${data.car.modelnavn}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});
		}
		else if (categoryId) {
			categorySearch = data.categories[categoryId - 1].name;
			res = await fetch(`${$page.data.API_HOST}/posts/categories/${categoryId}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});

		} else {
			categorySearch = 'Alle';
			res = await fetch(`${$page.data.API_HOST}/posts`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});
		}
		posts = await res.json();

	}
	async function getPostsByLicensPlate (){
		let res;
		if(data.car && data.categoryId){
			res = await fetch(`${$page.data.API_HOST}/posts/categories/${data.categoryId}/${data.car.brandnavn}/${data.car.modelnavn}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});
		}
		else if(data.car){
			res = await fetch(`${$page.data.API_HOST}/posts/cars/${data.car.brandnavn}/${data.car.modelnavn}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});
		}
		else{
			categorySearch = 'Alle';
			res = await fetch(`${$page.data.API_HOST}/posts`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			
		}
		posts = await res.json();
	}
</script>

{#if $page.data.loggedInUser}
	<section>
		<div class="flex justify-center">
			<a
				href="/posts/add"
				class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
				>Tilføj opslag</a
			>
		</div>
	</section>
{/if}

<div class="mx-auto max-w-2xl px-6 py-6 lg:max-w-7xl">
	<div class="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-1 lg:grid-cols-2">
		<section>
			<LicensePlateSearch bind:car={data.car} handle = {getPostsByLicensPlate}  />
		</section>
		<section>
			<CategorySelector bind:categories={data.categories} handle={getPostsByCategoryId} />
		</section>
	</div>
</div>

<PostList {posts} {categorySearch} />
