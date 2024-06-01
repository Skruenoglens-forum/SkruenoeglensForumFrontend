<script>
	import { page } from '$app/stores';

	import PostList from '../lib/components/PostList.svelte';
	import PostSearchAdd from '../lib/components/PostSearchAdd.svelte';

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

<PostSearchAdd bind:car={data.car} handleLicensePlate={getPostsByLicensPlate} bind:categories={data.categories} handleCategory={getPostsByCategoryId} />

<PostList {posts} {categorySearch} />
