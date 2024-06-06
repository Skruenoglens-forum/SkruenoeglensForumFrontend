<script>
	import Spinner from "./Spinner.svelte";
	import toast, {Toaster} from "svelte-french-toast";

	export let car;
	let carIsLoading;
	let licensplateInput;

	export let getPostsByInput;
	export let postInputs;

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
			toast.success('Bil fundet')
		}
		else{
			toast.error("Bilen er ikke fundet. Tjek nummerpladen")
			
			car= undefined
		}
		carIsLoading = false;
		postInputs.brand = car.brandnavn
		postInputs.model = car.modelnavn
		getPostsByInput()
	}
</script>
<Toaster toastOptions={{"position":"bottom-center"}}/>
<form class="flex w-full max-w-60 sm:max-w-xl">
    <input
        disabled={carIsLoading}
        bind:value={licensplateInput}
        class="bg-gray-50 border border-t border-b border-l border-gray-300 text-gray-900 sm:text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-10"
        type="text"
        placeholder="AB 12 123"
    />
    <button
        class="bg-blue-400 text-white text-xs px-4 h-10 rounded-r-lg font-bold uppercase border-gray-300 border-t border-b border-r"
        on:click={getCarByLicensePlate(licensplateInput)}>{#if !carIsLoading}        <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
        </svg>{:else}<Spinner />{/if}</button
    >
</form>