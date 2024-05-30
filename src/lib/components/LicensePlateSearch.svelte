<script>
	let bilIsLoading;
	let licensplateInput;
	let bil;
	async function getCarByLicensePlate(licenseplate) {
		let res = await fetch(`https://lp.skruenøglen.dk/getcarbylp?licenseplate=${licenseplate}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (res.status == 200) {
			bil = await res.json();
			console.log(bil);
		}
	}
</script>

<div class="flex flex-col items-center justify-center">
	<div class="w-full bg-white rounded-lg shadow sm:max-w-md">
		<h1 class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
			Søg efter nummerplade
		</h1>
		<!-- <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
			<form class="m-4 flex">
				<input
					bind:value={licensplateInput}
					class="bg-white border border-t border-b border-l border-red-200 text-gray-900 sm:text-sm rounded-l-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
					type="text"
					placeholder="AB 12 123"
				/>
				<button
					class="px-8 rounded-r-lg bg-blue-400 text-white-800 font-bold p-4 uppercase border-red-500 border-t border-b border-r"
					on:click={getCarByLicensePlate(licensplateInput)}>Søg</button
				>
			</form>
		</div> -->

		<div class="w-full gap-2 flex flex-col justify-center items-center px-4">
			<form class="m-4 flex">
				<input
					disabled={bilIsLoading}
					bind:value={licensplateInput}
					class="rounded-l-lg p-4 border-t mr-0 border-b border-l uppercase text-gray-800 border-red-500 bg-white"
					placeholder="AB 12 123"
				/>

				<button
					disabled={bilIsLoading}
					class=" flex items-center justify-center px-8 rounded-r-lg bg-blue-400 min-w-28 text-white-800 font-bold p-4 uppercase border-red-500 border-t border-b border-r"
					on:click={getCarByLicensePlate(licensplateInput)}
					>{#if !bilIsLoading}Søg{/if}</button
				>
			</form>

			{#if bil}
				<div class="justify-center w-full bg-white border border-gray-200 rounded-lg shadow-md p-4">
					<h3 class="text-lg font-semibold text-gray-900 mb-4">Biloplysninger</h3>
					<div class="flex justify-between items-center mb-2">
						<span class="text-gray-600"><i class="fas fa-car"></i> Mærke:</span>
						<span class="text-gray-800">{bil.brandnavn}</span>
					</div>
					<div class="flex justify-between items-center mb-2">
						<span class="text-gray-600"><i class="fas fa-tachometer-alt"></i> Model:</span>
						<span class="text-gray-800">{bil.modelnavn}</span>
					</div>
					<div class="flex justify-between items-center mb-2">
						<span class="text-gray-600"><i class="fas fa-tachometer-alt"></i> Variant:</span>
						<span class="text-gray-800">{bil.køretøjVariantnavn}</span>
					</div>
					<div class="flex justify-between items-center mb-2">
						<span class="text-gray-600"><i class="fas fa-calendar-alt"></i> Indregisteringsår:</span
						>
						<span class="text-gray-800">{new Date(bil.førsteRegistreringDato).getFullYear()}</span>
					</div>

					<div class="flex justify-between items-center">
						<span class="text-gray-600"><i class="fas fa-gas-pump"></i> Brændstof:</span>
						<span class="text-gray-800">{bil.drivkaftType}</span>
					</div>
					<div class="flex justify-between items-center mb-2">
						<span class="text-gray-600"><i class="fas fa-tachometer-alt"></i> VIN:</span>
						<span class="text-gray-800">{bil.stelnummer}</span>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>
