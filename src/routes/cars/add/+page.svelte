<script>
	import { enhance } from "$app/forms"
	import Spinner from "$lib/components/Spinner.svelte";

	let imageUrl = '';
	let licenseplateInput = '';
	let car= {
		brandnavn:"",
		modelnavn: "",
		køretøjVariantnavn:"",
		drivkaftType:"",
		førsteRegistreringDato:"",
		stelnummer: ""
	};

	function handleFileUpload(event) {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				imageUrl = e.target.result;
			};
			reader.readAsDataURL(file);
		}
	}

	let carIsLoading;
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
			console.log(car);
			car.førsteRegistreringDato = new Date(car.førsteRegistreringDato).toISOString().substring(0,10);
		}
		carIsLoading = false;		
	}
</script>

<section>
	<div class="flex flex-col items-center justify-center px-6 py-8 mt-8 lg:py-0">
		<div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
			<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
				<h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
					Tilføj bil
				</h1>
				<form
					action="?/add"
					method="POST"
					class="space-y-4 md:space-y-6"
					enctype="multipart/form-data"
					use:enhance
				>
					<div
						class="w-32 h-32 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center mx-auto"
					>
						{#if imageUrl}
							<img src={imageUrl} alt="car" class="object-cover w-full h-full" />
						{/if}
					</div>
					<div class="relative mx-auto">
						<input
							on:change={handleFileUpload}
							class="block w-full text-sm text-gray-500 file:me-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-400 file:text-white hover:file:bg-gray-600 file:disabled:opacity-50 file:disabled:pointer-events-none"
							type="file"
							name="carImage"
							accept="image/*"
						/>
					</div>
					<div>
						<div class="flex gap-2">
							<label for="licensePlate" class="block mb-2 text-sm font-medium text-gray-900">Nummerplade</label>
							{#if carIsLoading}<Spinner />{/if}
						</div>
						<input 
							bind:value={licenseplateInput}
							on:change={getCarByLicensePlate(licenseplateInput)}
							type="text"
							name="licensePlate"
							id="licensePlate"
							class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
							placeholder="AB12345"
							required
						/>
					</div>
					<div>
						<label for="brand" class="block mb-2 text-sm font-medium text-gray-900">Mærke</label>
						<input
							bind:value={car.brandnavn}
							type="text"
							name="brand"
							id="brand"
							class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
							placeholder="VW"
							required
						/>
					</div>
					<div>
						<label for="model" class="block mb-2 text-sm font-medium text-gray-900">Model</label>
						<input
							bind:value={car.modelnavn}
							type="text"
							name="model"
							id="model"
							class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
							placeholder="UP"
							required
						/>
					</div>
					<div>
						<label for="motor" class="block mb-2 text-sm font-medium text-gray-900">Motor</label>
						<input
							bind:value={car.køretøjVariantnavn}
							type="text"
							name="motor"
							id="motor"
							class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
							placeholder="1.4"
							required
						/>
					</div>
					<div>
						<label for="type" class="block mb-2 text-sm font-medium text-gray-900">Drivmiddel</label
						>
						<input
						bind:value={car.drivkaftType}
							type="text"
							name="type"
							id="type"
							class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
							placeholder="Benzin"
							required
						/>
					</div>
					<div>
						<label for="firstRegistration" class="block mb-2 text-sm font-medium text-gray-900"
							>Første Registrering</label
						>
						<input
							bind:value={car.førsteRegistreringDato}
							type="date"
							name="firstRegistration"
							id="firstRegistration"
							class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
							placeholder="2014.10.10"
							required
						/>
					</div>
					<div>
						<label for="vin" class="block mb-2 text-sm font-medium text-gray-900">Stelnummer</label>
						<input
							bind:value={car.stelnummer}
							type="text"
							name="vin"
							id="vin"
							class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
							placeholder="HSDJ2782RUA"
							required
						/>
					</div>

					<button
						type="submit"
						class="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
						>Tilføj bil</button
					>
				</form>
			</div>
		</div>
	</div>
</section>
