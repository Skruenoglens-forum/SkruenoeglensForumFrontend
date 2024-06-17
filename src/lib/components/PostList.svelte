<script>
	import { enhance } from "$app/forms"
	import { page } from '$app/stores';
	import { getDateTime } from '../utils/utils';

	export let posts = [];
	export let categorySearch = '';
</script>

{#if !posts || posts.length === 0}
	{#if categorySearch}
		<p class="py-4 text-center text-gray-500">Ingen opslag med kategorien {categorySearch}</p>
	{:else}
		<p class="py-4 text-center text-gray-500">Ingen opslag</p>
	{/if}
{/if}
<div class="mt-8 mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-4 lg:max-w-7xl lg:px-8">

	<div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
		{#each posts as post}
			<div class="group relative">
				<h2 class="text-center text-lg font-semibold">{post.title}</h2>
				<div
					class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80"
				>
					<a href="/posts/{post.id}">
						<img
							src="{$page.data.API_HOST}/posts/image/{post.image_ids[0]}"
							alt="bil"
							class="h-full w-full object-cover object-center lg:h-full lg:w-full"
						/>
					</a>
				</div>
				<div class="mt-4 flex justify-between px-2">
					<div class="flex items-center">
						<p class="text-sm text-gray-500">{post.comment_count}</p>
						<img src="/chat.png" alt="kommentare" class="h-4 w-4 ml-1" />
					</div>
					<div class="flex items-center">
						<p class="text-sm text-gray-500">{getDateTime(post.created_at)}</p>
						<img src="/clock.png" alt="tid" class="h-4 w-4 ml-1" />
					</div>
				</div>
				<div class="mt-4 flex justify-between px-2">
					<div class="flex items-center">
						<p class="inline-flex items-center mr-3 text-sm text-gray-900">
							{#if post.user_id}
							<img
								class="mr-2 w-6 h-6 rounded-full"
								src="{$page.data.API_HOST}/users/{post.user_id}/image"
								alt="user"
							/>
							{post.user_name}
							{:else}
							<img
								class="mr-2 w-6 h-6 rounded-full"
								src="/user.png"
								alt="user"
							/>
							Slettet Bruger
							{/if}
							
						</p>
					</div>
					<div class="flex items-center">
						<p class="text-sm text-gray-500">{post.category_name}</p>
					</div>
				</div>
				<div class="mt-8 flex justify-center pb-6">
					{#if ($page.data.loggedInUser?.uid == post.user_id || $page.data.loggedInUser?.roleId == 1) && $page.data.loggedInUser}
					<a
						href="/posts/{post.id}/edit"
						class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
						>Rediger</a
					>
					<form action="?/deletePost" method="POST">
						<input type="hidden" name="postId" value={post.id} />
						<button
							type="submit"
							class="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out"
							>Slet</button
						>
					</form>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</div>
