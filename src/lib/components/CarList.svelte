<script>
	import { enhance } from "$app/forms"
	import { page } from '$app/stores';
	import { getDate, getDateTime } from '../utils/utils';
	export let cars = [];
</script>

{#if !cars || cars.length === 0}
<p class="py-4 text-center text-gray-500">Ingen biler</p>
{/if}

<div class="mt-8 mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-4 lg:max-w-7xl lg:px-8">
	<div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
		{#each cars as car}
			<div class="group relative">
				<h2 class="text-center text-lg font-semibold">{car.brand} {car.model}</h2>
				<div
					class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80"
				>
					<img
						src="{$page.data.API_HOST}/cars/{car.id}/image"
						alt="bil"
						class="h-full w-full object-cover object-center lg:h-full lg:w-full"
					/>
				</div>

				<div class="mt-4 flex justify-between px-2">
					<div class="flex items-center">
						<p class="text-sm text-gray-500">Nummerplade</p>
					</div>
					<div class="flex items-center">
						<p class="text-sm text-gray-500">{car.license_plate}</p>
					</div>
				</div>

				<div class="mt-4 flex justify-between px-2">
					<div class="flex items-center">
						<p class="text-sm text-gray-500">Motor</p>
					</div>
					<div class="flex items-center">
						<p class="text-sm text-gray-500">{car.motor}</p>
					</div>
				</div>

				<div class="mt-4 flex justify-between px-2">
					<div class="flex items-center">
						<p class="text-sm text-gray-500">Drivmiddel</p>
					</div>
					<div class="flex items-center">
						<p class="text-sm text-gray-500">{car.type}</p>
					</div>
				</div>

				<div class="mt-4 flex justify-between px-2">
					<div class="flex items-center">
						<p class="text-sm text-gray-500">Første registrering</p>
					</div>
					<div class="flex items-center">
						<p class="text-sm text-gray-500">{getDate(car.first_registration)}</p>
					</div>
				</div>

				<div class="mt-4 flex justify-between px-2">
					<div class="flex items-center">
						<p class="text-sm text-gray-500">Oprettet</p>
					</div>
					<div class="flex items-center">
						<p class="text-sm text-gray-500">{getDateTime(car.created_at)}</p>
					</div>
				</div>

				<div class="mt-4 flex justify-between px-2">
					<div class="flex items-center">
						<p class="text-sm text-gray-500">Redigeret</p>
					</div>
					<div class="flex items-center">
						<p class="text-sm text-gray-500">{getDateTime(car.updated_at)}</p>
					</div>
				</div>
				<div class="mt-8 flex justify-center pb-6">
					{#if $page.data.loggedInUser?.uid == car.user_id || $page.data.loggedInUser?.roleId == 1}
					<a
						href="/cars/{car.id}/edit"
						class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
						>Rediger</a
					>
					<form action="?/deleteCar" method="POST" use:enhance>
						<input type="hidden" name="carID" value={car.id} />
						<button
							type="submit"
							class="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out"
							>Slet</button
						>
					</form>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</div>
