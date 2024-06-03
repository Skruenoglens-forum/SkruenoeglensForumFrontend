<script>
	import CategorySelector from "./CategorySelector.svelte";
	import LicensePlateSearch from "./LicensePlateSearch.svelte";
	import Search from './Search.svelte'

	let car;
	export let categories;
	export let postInputs;

	export let getPostsByInput;
</script>



<div class="mx-4">
	<div class="flex flex-col sm:flex-row justify-evenly max-w-2xl mx-auto h-auto p-4 sm:p-0 mb-4">
		<div class="flex items-center justify-center w-full">
			<Search bind:postInputs={postInputs} {getPostsByInput} />
		</div>
	</div>
	<div class="flex flex-col sm:flex-row justify-evenly max-w-2xl mx-auto h-auto p-4 sm:p-0">
		<div class="flex items-center justify-center w-full sm:w-1/3 mb-4 sm:mb-0">
			<LicensePlateSearch bind:postInputs={postInputs} {getPostsByInput} bind:car={car} />
		</div>
		<div class="flex items-center justify-center mb-4 sm:mb-0">
			<a href="/posts/add" class="inline-flex items-center justify-center w-12 h-12 font-medium bg-green-600 rounded-full hover:bg-green-700 group focus:ring-4 focus:ring-green-300 focus:outline-none">
				<svg class="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
					<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
				</svg>
			</a>
		</div>
		<div class="flex items-center justify-center w-full sm:w-1/3">
			<CategorySelector bind:postInputs={postInputs} {getPostsByInput} categories={categories} />
		</div>
	</div>
</div>

<div class="flex flex-col items-center justify-center">
	<div class="w-full bg-white rounded-lg sm:max-w-md mt-4">

		<div class="w-full gap-2 flex flex-col justify-center items-center px-4 mb-4">
			{#if car}
				<div class="justify-center w-full bg-white border border-gray-200 rounded-lg shadow-md p-4">
					<h3 class="text-lg font-semibold text-gray-900 mb-4">Biloplysninger</h3>
					<div class="flex justify-between items-center mb-2">
						<span class="text-gray-600"><i class="fas fa-car"></i> Mærke:</span>
						<span class="text-gray-800">{car.brandnavn}</span>
					</div>
					<div class="flex justify-between items-center mb-2">
						<span class="text-gray-600"><i class="fas fa-tachometer-alt"></i> Model:</span>
						<span class="text-gray-800">{car.modelnavn}</span>
					</div>
					<div class="flex justify-between items-center mb-2">
						<span class="text-gray-600"><i class="fas fa-tachometer-alt"></i> Variant:</span>
						<span class="text-gray-800">{car.køretøjVariantnavn}</span>
					</div>
					<div class="flex justify-between items-center mb-2">
						<span class="text-gray-600"><i class="fas fa-calendar-alt"></i> Indregisteringsår:</span
						>
						<span class="text-gray-800">{new Date(car.førsteRegistreringDato).getFullYear()}</span>
					</div>

					<div class="flex justify-between items-center">
						<span class="text-gray-600"><i class="fas fa-gas-pump"></i> Brændstof:</span>
						<span class="text-gray-800">{car.drivkaftType}</span>
					</div>
					<div class="flex justify-between items-center mb-2">
						<span class="text-gray-600"><i class="fas fa-tachometer-alt"></i> VIN:</span>
						<span class="text-gray-800">{car.stelnummer}</span>
					</div>
				</div>
			{/if}
		</div>
		
	</div>
</div>