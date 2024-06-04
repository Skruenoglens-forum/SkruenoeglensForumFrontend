<script>
	export let postInputs;
	export let getPostsByInput;
	
	let searchInput;
</script>

<form class="flex max-w-60">
    <input bind:value={searchInput} on:change={() => {
		postInputs.search = searchInput
		getPostsByInput()
	}} type="search" id="default-search"
        class="bg-gray-50 border border-t border-b border-l border-gray-300 text-gray-900 sm:text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-10"
        placeholder="Søg"
    />
    <button
        class="bg-blue-400 text-white text-xs px-4 h-10 rounded-r-lg font-bold uppercase border-gray-300 border-t border-b border-r"
        >Søg</button
    >
</form>