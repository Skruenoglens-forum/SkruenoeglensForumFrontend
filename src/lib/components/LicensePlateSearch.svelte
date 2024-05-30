<script>
	let licensplateInput;
	async function getCarByLicensePlate(licenseplate) {
		let res = await fetch(`https://lp.skruenøglen.dk/getcarbylp?licenseplate=${licenseplate}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (res.status == 200) {
			console.log(await res.json());
		}
	}
</script>

<div class="flex flex-col items-center justify-center">
	<div class="w-full bg-white rounded-lg shadow sm:max-w-md">
		<h1 class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
			Søg efter nummerplade
		</h1>
		<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
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
		</div>
	</div>
</div>
