<script>
	import { page } from '$app/stores';
	import CarList from '../../../lib/components/CarList.svelte';
	import PostList from '../../../lib/components/PostList.svelte';
	import Profile from '../../../lib/components/Profile.svelte';

	export let data;
</script>

<div class="w-full pt-10">
	<Profile user={data.user} />

	<div class="flex flex-ol items-center justify-center px-6 py-8 mx-auto lg:py-0">
		<div class="flex items-center mb-6 text-2xl font-semibold text-gray-900">
			<h1>{data.user.name}'s biler</h1>
		</div>
	</div>
	{#if $page.data.loggedInUser?.uid === data.user.id}
		<div class="flex flex-ol items-center justify-center px-6 py-8 mx-auto lg:py-0">
			<div class="flex items-center text-2xl font-semibold text-gray-900">
				<a
					href="/cars/add"
					class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-4"
					>Tilføj bil</a
				>
			</div>
		</div>
	{/if}

	<CarList cars={data.cars} />

		<div class="flex flex-ol items-center justify-center px-6 py-8 mx-auto lg:py-0">
			<div class="flex items-center mb-6 text-2xl font-semibold text-gray-900">
				<h1>{data.user.name}'s opslag</h1>
			</div>
		</div>
		{#if $page.data.loggedInUser?.uid === data.user.id}
			<div class="flex flex-ol items-center justify-center px-6 py-8 mx-auto lg:py-0">
				<div class="flex items-center text-2xl font-semibold text-gray-900">
					<a
						href="../posts/add"
						class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-4"
						>Tilføj opslag</a
					>
				</div>
			</div>
		{/if}
	<PostList posts={data.posts} />
</div>
