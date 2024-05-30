<script>
	export let categories;
	export let handle;
</script>

<div class="flex flex-col items-center justify-center">
	<div class="w-full bg-white rounded-lg shadow sm:max-w-md">
		<h1 class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
			Forumkategorier
		</h1>
		<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
			<select
				on:change={(event) => handle(event.target.value)}
				name="categoryId"
				id="categoryId"
				class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
			>
				<option value="">Alle</option>
				{#each categories as category}
					<option value={category.id}>{category.name}</option>
				{/each}
			</select>
		</div>
	</div>
</div>
