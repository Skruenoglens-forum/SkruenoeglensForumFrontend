<script>
	import { getDate } from '$lib/utils/utils';
	import { enhance } from "$app/forms"
	
	export let data;

	let car = {};
	let imageUrls = [];

	function handleFileUpload(event) {
		const files = event.target.files;
		imageUrls = [];

		for (let i = 0; i < files.length && i < 4; i++) {
			const file = files[i];
			const reader = new FileReader();

			reader.onload = (e) => {
				imageUrls = [...imageUrls, e.target.result];
			};

			reader.readAsDataURL(file);
		}
	}
</script>

<div class="flex flex-col items-center justify-center px-6 py-8 mt-8 lg:py-0">
	<div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
		<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
			<h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
				Tilføj opslag
			</h1>
			<form
				action="?/add"
				method="POST"
				class="space-y-4 md:space-y-6"
				enctype="multipart/form-data"
				use:enhance
			>
				<div class="max-h-80 overflow-y-scroll flex gap-4">
					{#each imageUrls as imageUrl (imageUrl)}
						<div
							class="flex-1 max-h-20 max-w-20 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center mx-auto"
						>
							{#if imageUrl}
								<img src={imageUrl} alt="Profile" class="object-cover w-full h-full" />
							{/if}
						</div>
					{/each}
				</div>
				<div class="relative mx-auto">
					<input
						on:change={handleFileUpload}
						class="block w-full text-sm text-gray-500 file:me-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-400 file:text-white hover:file:bg-gray-600 file:disabled:opacity-50 file:disabled:pointer-events-none"
						type="file"
						name="postImages"
						accept="image/*"
						multiple
					/>
				</div>
				<div>
					<label for="carId" class="block mb-2 text-sm font-medium text-gray-900"
						>Udfyld med data fra egen bil (valgfri)</label
					>
					<select
						on:change={(event) => (car = data.cars[0])}
						name="carId"
						id="carId"
						class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
					>
						<option value="" disabled selected>Vælg en bil</option>
						{#each data.cars as car}
							<option value={car.id}>{car.brand} {car.model} {car.motor}</option>
						{/each}
					</select>
				</div>
				<div>
					<label for="title" class="block mb-2 text-sm font-medium text-gray-900">Titel</label>
					<input
						type="text"
						name="title"
						id="title"
						class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
						placeholder="Titel..."
						required
					/>
				</div>
				<div>
					<label for="description" class="block mb-2 text-sm font-medium text-gray-900"
						>Beskrivelse</label
					>
					<input
						type="text"
						name="description"
						id="description"
						class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
						placeholder="Beskrivelse..."
						required
					/>
				</div>
				<div>
					<label for="carBrand" class="block mb-2 text-sm font-medium text-gray-900">Bilmærke</label
					>
					<input
						value={car.brand !== undefined ? car.brand : ''}
						type="text"
						name="carBrand"
						id="carBrand"
						class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
						placeholder="VW"
						required
					/>
				</div>
				<div>
					<label for="carModel" class="block mb-2 text-sm font-medium text-gray-900">Bilmodel</label
					>
					<input
						value={car.model !== undefined ? car.model : ''}
						type="text"
						name="carModel"
						id="carModel"
						class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
						placeholder="UP"
						required
					/>
				</div>
				<div>
					<label for="carMotor" class="block mb-2 text-sm font-medium text-gray-900"
						>Bilens motor</label
					>
					<input
						value={car.motor !== undefined ? car.motor : ''}
						type="text"
						name="carMotor"
						id="carMotor"
						class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
						placeholder="1.4"
						required
					/>
				</div>
				<div>
					<label for="carType" class="block mb-2 text-sm font-medium text-gray-900"
						>Drivmiddel</label
					>
					<input
						value={car.type !== undefined ? car.type : ''}
						type="text"
						name="carType"
						id="carType"
						class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
						placeholder="Benzin"
						required
					/>
				</div>
				<div>
					<label for="carFirstRegistration" class="block mb-2 text-sm font-medium text-gray-900"
						>Bilens Første Registrering</label
					>
					<input
						value={car.first_registration !== undefined ? getDate(car.first_registration) : ''}
						type="date"
						name="carFirstRegistration"
						id="carFirstRegistration"
						class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
						placeholder="2000.23.12"
						required
					/>
				</div>
				<div>
					<label for="categoryId" class="block mb-2 text-sm font-medium text-gray-900"
						>Kategori</label
					>
					<select
						name="categoryId"
						id="categoryId"
						class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
						required
					>
						<option value="" disabled selected>Vælg en kategori</option>
						{#each data.categories as category}
							<option value={category.id}>{category.name}</option>
						{/each}
					</select>
				</div>
				<button
					type="submit"
					class="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
					>Tilføj Opslag</button
				>
			</form>
		</div>
	</div>
</div>
