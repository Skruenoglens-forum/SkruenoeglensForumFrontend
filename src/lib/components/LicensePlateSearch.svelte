<script>
	import Spinner from "./Spinner.svelte";

	export let car;
	export let handle
	let carIsLoading;
	let licensplateInput;

	async function getCarByLicensePlate(licenseplate) {
		carIsLoading = true;
		let res = await fetch(`https://lp.skruenøglen.dk/getcarbylp?licenseplate=${licenseplate}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (res.status == 200) {
			car = await res.json();
		}
		else{
			car= undefined
		}
		carIsLoading = false;
		handle();
	}
</script>

<form class="flex max-w-60">
    <input
        disabled={carIsLoading}
        bind:value={licensplateInput}
        class="bg-white border border-t uppercase border-b border-l border-red-200 text-gray-900 sm:text-sm rounded-l-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 h-10"
        type="text"
        placeholder="AB 12 123"
    />
    <button
        class="bg-blue-400 text-white text-xs px-4 h-10 rounded-r-lg font-bold uppercase border-red-500 border-t border-b border-r"
        on:click={getCarByLicensePlate(licensplateInput)}>{#if !carIsLoading}Søg{:else}<Spinner />{/if}</button
    >
</form>