<script>
	import { enhance } from "$app/forms"
	import { page } from '$app/stores';
	import { getDate } from '../utils/utils.js';

	export let post;
</script>

<div class="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
	<h1 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl mb-4">
		{post.title}
	</h1>
	{#if ($page.data.loggedInUser?.uid == post.user_id || $page.data.loggedInUser?.roleId == 1) && $page.data.loggedInUser}
	<div class="mt-4 sm:mt-0 sm:ml-auto flex items-center space-x-4">
		<span class="text-sm text-gray-500">
			<a
				href="/posts/{post.id}/edit"
				class="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out"
				>Rediger</a
			>
		</span>
		<span class="text-sm text-gray-500">
			<form action="?/deletePost" method="POST" use:enhance>
				<button
					type="submit"
					class="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out"
					>Slet</button
				>
			</form>
		</span>
	</div>
	{/if}
</div>
<div
	class="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6"
>
	<div class="space-y-6">
		<p class="text-base text-gray-900">{post.description}</p>
	</div>
	<div class="mt-10">
		<h3 class="text-sm font-medium text-gray-900">Mere information</h3>
		<div class="mt-4">
			<ul role="list" class="list-disc space-y-2 pl-4 text-sm">
				<li class="text-gray-400">
					<span class="text-gray-600">Mærke: {post.car_brand}</span>
				</li>
				<li class="text-gray-400">
					<span class="text-gray-600">Model: {post.car_model}</span>
				</li>
				<li class="text-gray-400">
					<span class="text-gray-600">Motor: {post.car_motor}</span>
				</li>
				<li class="text-gray-400">
					<span class="text-gray-600">Drivmiddel: {post.car_type}</span>
				</li>
				<li class="text-gray-400">
					<span class="text-gray-600"
						>Første registrering: {getDate(post.car_first_registration)}</span
					>
				</li>
				<li class="text-gray-400">
					<span class="text-gray-600">Kategori: {post.category_name}</span>
				</li>
				<li class="text-gray-400">
					<span class="text-gray-600">Opretter:
						{#if post.user_name}
						<a href="/users/{post.user_id}" class="text-blue-500 underline">{post.user_name}</a>
						{:else}
						<p>Slettet Bruger</p>
						{/if}
					</span>
				</li>
			</ul>
		</div>
	</div>
</div>
