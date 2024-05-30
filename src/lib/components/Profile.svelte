<script>
	import { page } from '$app/stores';
	import { getDateTime } from '../utils/utils';
	export let user;
</script>

<div class="relative mt-16 mb-32 max-w-sm mx-auto mt-24">
	<div class="rounded overflow-hidden shadow-md bg-white">
		<div class="absolute -mt-20 w-full flex justify-center">
			<div class="h-32 w-32">
				<img
					src="{$page.data.API_HOST}/users/{user.id}/image"
					alt="profile"
					class="rounded-full object-cover h-full w-full shadow-md"
				/>
			</div>
		</div>
		<div class="px-6 mt-16">
			<h1 class="font-bold text-3xl text-center mb-1">{user.name}</h1>
			<p class="text-gray-800 text-sm text-center">{user.email}</p>
			<p class="text-center text-gray-600 text-base pt-3 font-normal">
				{user.description}
			</p>
			<div class="px-6 mt-4">
				<p class="text-gray-600 text-base">
					<strong>Oprettet:</strong>
					{getDateTime(user.created_at)}<br />
					<strong>Redigeret:</strong>
					{getDateTime(user.updated_at)}<br />
				</p>
			</div>
		</div>
		<div class="mt-8 flex justify-center pb-6">
			<a
				href="/users/{user.id}/edit"
				class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">Rediger</a
			>
			<a href="/login" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
				>Slet</a
			>
		</div>
	</div>
</div>
