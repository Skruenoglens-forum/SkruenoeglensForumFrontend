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
        class="bg-white border border-t uppercase border-b border-l border-red-200 text-gray-900 sm:text-sm rounded-l-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 h-10"
        placeholder="Søg"
    />
    <button
        class="bg-blue-400 text-white text-xs px-4 h-10 rounded-r-lg font-bold uppercase border-red-500 border-t border-b border-r"
        >Søg</button
    >
</form>
<!-- 
<form class="flex max-w-60">   
    <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input bind:value={searchInput} on:change={() => {
			postInputs.search = searchInput
			getPostsByInput()
		}} type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Søg..." required />
		<button
		type="submit"
		class="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-400 rounded-e-lg border border-blue-400 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300"
	>
		<svg
			class="w-4 h-4"
			aria-hidden="true"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 20 20"
		>
			<path
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
			/>
		</svg>
		<span class="sr-only">Search</span>
	</button>
	</div>
</form> -->