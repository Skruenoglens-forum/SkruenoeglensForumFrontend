<script>
	export let postInputs;
	export let getPostsByInput;
	
	let searchInput;
</script>

<form class="flex w-full max-w-60 sm:max-w-xl">
    <input bind:value={searchInput} on:change={() => {
		postInputs.search = searchInput
		getPostsByInput()
	}} type="search" id="default-search"
        class="bg-gray-50 border border-t border-b border-l border-gray-300 text-gray-900 sm:text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-10"
        placeholder="Søg efter opslag"
    />
    <button class="bg-blue-400 text-white text-xs px-4 h-10 rounded-r-lg font-bold uppercase border-gray-300 border-t border-b border-r">
        <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
        </svg>
    </button>
</form>