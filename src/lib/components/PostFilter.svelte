<script>
    import CategorySelector from "./CategorySelector.svelte";
	import LicensePlateSearch from "./LicensePlateSearch.svelte";
	import Search from './Search.svelte'

	let car;
	export let categories;
	export let postInputs;

	export let getPostsByInput;

    let isDropdownVisible = false;

    function toggleFilter() {
        isDropdownVisible = !isDropdownVisible;
    }

    // Function to handle accordion toggle
	function toggleAccordion(event) {
		const button = event.currentTarget;
		const bodyId = button.getAttribute('data-accordion-target');
		const body = document.querySelector(bodyId);

		// Toggle the 'hidden' class
		body.classList.toggle('hidden');

		// Update aria-expanded attribute
		const isExpanded = button.getAttribute('aria-expanded') === 'true';
		button.setAttribute('aria-expanded', !isExpanded);
	}
</script>

<div class="flex flex-col items-center justify-center p-4">
    <button on:click={toggleFilter} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" class="mb-4 text-white bg-gray-400 hover:bg-gray-600 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center" type="button">
        Filter
        <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
        </svg>
    </button>
        
    <!-- Dropdown menu -->
    <div class="{isDropdownVisible ? '' : 'hidden'} relative mx-auto w-full md:w-1/4">
        <div class="rounded overflow-hidden shadow-md mx-4">
            <div id="accordion-nested-parent" data-accordion="collapse">
                <h2 id="accordion-collapse-heading-1">
                    <div
                        class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl gap-3"
                    >
                        <span>Filter</span>
                    </div>
                </h2>
                <div
                    id="accordion-collapse-body-1"
                    class=""
                    aria-labelledby="accordion-collapse-heading-1"
                >
                    <div class="p-5 border border-b-0 border-gray-200">
                        <div class="flex flex-col sm:flex-row justify-evenly mx-auto h-auto p-4 sm:p-0">
                            <div class="flex items-center justify-center w-full">
                                <Search bind:postInputs={postInputs} {getPostsByInput} />
                            </div>
                        </div>
                    </div>
                </div>
                <h2 id="accordion-collapse-heading-2">
                    <button
                        type="button"
                        class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 hover:bg-gray-100 gap-3"
                        data-accordion-target="#accordion-collapse-body-2"
                        aria-expanded="false"
                        aria-controls="accordion-collapse-body-2"
                        on:click={toggleAccordion}
                    >
                        <span class="flex items-center"> Nummerplade</span>
                        <svg
                            data-accordion-icon
                            class="w-3 h-3 rotate-180 shrink-0"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 6"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9 5 5 1 1 5"
                            />
                        </svg>
                    </button>
                </h2>
                <div
                    id="accordion-collapse-body-2"
                    class="hidden"
                    aria-labelledby="accordion-collapse-heading-2"
                >
                    <div class="p-5 border border-gray-200">
                        <!-- Nested accordion -->
                        <div class="flex flex-col sm:flex-row justify-evenly mx-auto h-auto p-4 sm:p-0">
                            <div class="flex items-center justify-center w-full">
                            <LicensePlateSearch bind:postInputs={postInputs} {getPostsByInput} bind:car={car} />
                            </div>
                        </div>
                        <!-- End: Nested accordion -->
                    </div>
                </div>
                <h2 id="accordion-collapse-heading-2">
                    <button
                        type="button"
                        class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 hover:bg-gray-100 gap-3"
                        data-accordion-target="#accordion-collapse-body-3"
                        aria-expanded="false"
                        aria-controls="accordion-collapse-body-3"
                        on:click={toggleAccordion}
                    >
                        <span class="flex items-center"> Kategori</span>
                        <svg
                            data-accordion-icon
                            class="w-3 h-3 rotate-180 shrink-0"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 6"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9 5 5 1 1 5"
                            />
                        </svg>
                    </button>
                </h2>
                <div
                    id="accordion-collapse-body-3"
                    class="hidden"
                    aria-labelledby="accordion-collapse-heading-2"
                >
                    <div class="p-5 border border-gray-200">
                        <!-- Nested accordion -->
                        <div class="flex flex-col sm:flex-row justify-evenly mx-auto h-auto p-4 sm:p-0">
                            <div class="flex items-center justify-center w-full">
                            <CategorySelector bind:postInputs={postInputs} {getPostsByInput} categories={categories} />

                            </div>
                        </div>
                        <!-- End: Nested accordion -->
                    </div>
                </div>
            </div>
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