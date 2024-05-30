<script>
	import { page } from '$app/stores';
	import { getDateTime } from '../utils/utils';

	export let posts = [];
	export let categorySearch = '';
</script>

<div class="mx-auto max-w-2xl px-6 py-6 lg:max-w-7xl">
	<div class="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
		{#each posts as post}
			<div class="group relative">
				<h2 class="text-center text-lg font-semibold">{post.title}</h2>
				<div
					class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80"
				>
					<a href="/posts/{post.id}">
						<img
							src="/bil.png"
							alt="bil"
							class="h-full w-full object-cover object-center lg:h-full lg:w-full"
						/>
					</a>
				</div>
				<div class="mt-4 flex justify-between px-2">
					<div class="flex items-center">
						<p class="text-sm text-gray-500">20</p>
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
							<img
								class="mr-2 w-6 h-6 rounded-full"
								src="{$page.data.API_HOST}/users/{post.user_id}/image"
								alt="user"
							/>
							{post.user_name}
						</p>
					</div>
					<div class="flex items-center">
						<p class="text-sm text-gray-500">{post.category_name}</p>
					</div>
				</div>
			</div>
		{:else}
			{#if categorySearch}
				<p class="py-4 text-center text-gray-500">Ingen opslag med kategorien {categorySearch}</p>
			{/if}
			{#if !categorySearch}
				<p class="py-4 text-center text-gray-500">Ingen opslag</p>
			{/if}
		{/each}
	</div>
</div>
