<script>
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
			console.log(car);
		}
		else{
			car= undefined
		}
		handle();
	}
</script>

<div class="flex flex-col items-center justify-center">
	<div class="w-full bg-white rounded-lg shadow sm:max-w-md">
		<h1 class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
			Søg efter nummerplade
		</h1>
		
		<div class="w-full gap-2 flex flex-col justify-center items-center px-4">
			<form class="m-4 flex">
				<input
					disabled={carIsLoading}
					bind:value={licensplateInput}
					class="rounded-l-lg p-4 border-t mr-0 border-b border-l uppercase text-gray-800 border-red-500 bg-white"
					placeholder="AB 12 123"
				/>

				<button
					disabled={carIsLoading}
					class=" flex items-center justify-center px-8 rounded-r-lg bg-blue-400 min-w-28 text-white-800 font-bold p-4 uppercase border-red-500 border-t border-b border-r"
					on:click={getCarByLicensePlate(licensplateInput)}
					>{#if !carIsLoading}Søg{/if}</button
				>
			</form>

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
