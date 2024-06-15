<script>
	export let categories;
	export let getPostsByInput;
	export let postInputs;
</script>

<select
	on:change={(event) => {
		postInputs.categoryId = event.target.value
		getPostsByInput()
	}}
	name="categoryId"
	id="categoryId"
	class="bg-gray-50 h-10 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full max-w-60 sm:max-w-xl p-2.5"
>
<option value="">Alle</option>
{#each categories as category}
    <option value={category.id}>{category.name}</option>
{/each}
</select>