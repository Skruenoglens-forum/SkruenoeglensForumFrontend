<script>
	import { page } from '$app/stores';
	import CarList from '../../../lib/components/CarList.svelte';
	import Profile from '../../../lib/components/Profile.svelte';

	export let data;
</script>

<div class="w-full h-screen px-10 pt-10">
	<Profile user={data.user} />

	<section class="bg-gray-0">
		<div class="flex flex-ol items-center justify-center px-6 py-8 mx-auto lg:py-0">
			<div class="flex items-center mb-6 text-2xl font-semibold text-gray-900">
				<h1>{data.user.name}'s biler</h1>
			</div>
		</div>
		{#if $page.data.loggedInUser.uid === data.user.id || $page.data.loggedInUser.roleId == 1}
			<div class="flex flex-ol items-center justify-center px-6 py-8 mx-auto lg:py-0">
				<div class="flex items-center mb-6 text-2xl font-semibold text-gray-900">
					<a
						href="/users/{data.user.id}/cars/add"
						class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-4"
						>Tilføj bil</a
					>
				</div>
			</div>
		{/if}
	</section>

	<CarList cars={data.cars} user={data.user} />
</div>
