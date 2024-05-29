<script>
    import { page } from '$app/stores'

  export let data;

  function convertDateString(dateString) {
		// Create a new Date object from the input string
		const date = new Date(dateString);
		
		// Extract the date and time components
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
		const day = String(date.getDate()).padStart(2, '0');
		const hours = String(date.getHours()).padStart(2, '0');
		const minutes = String(date.getMinutes()).padStart(2, '0');
		const seconds = String(date.getSeconds()).padStart(2, '0');

		// Construct the desired format
		const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

		return formattedDate;
	}
</script>

  <div class="w-full h-screen px-10 pt-10">
    <div class="relative mt-16 mb-32 max-w-sm mx-auto mt-24">
        <div class="rounded overflow-hidden shadow-md bg-white">
            <div class="absolute -mt-20 w-full flex justify-center">
                <div class="h-32 w-32">
                    <img src="{data.API_HOST}/users/{data.user.id}/image" alt="profile" class="rounded-full object-cover h-full w-full shadow-md" />
                </div>
            </div>
            <div class="px-6 mt-16">
                <h1 class="font-bold text-3xl text-center mb-1">{data.user.name}</h1>
                <p class="text-gray-800 text-sm text-center">{data.user.email}</p>
                <p class="text-center text-gray-600 text-base pt-3 font-normal">
                    {data.user.description}
                </p>
                <div class="px-6 mt-4">
                    <p class="text-gray-600 text-base">
                        <strong>Oprettet:</strong> {convertDateString(data.user.created_at)}<br>
                        <strong>Redigeret:</strong> {convertDateString(data.user.updated_at)}<br>
                    </p>
                </div>
            </div>
            <div class="mt-8 flex justify-center pb-6">
                <a href="/users/{data.user.id}/edit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">Rediger</a>
                <a href="/login" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Slet</a>
            </div>
        </div>
    </div>

    <section class="bg-gray-0">
        <div class="flex flex-ol items-center justify-center px-6 py-8 mx-auto lg:py-0">
            <div class="flex items-center mb-6 text-2xl font-semibold text-gray-900">
                <h1>{data.user.name}'s biler</h1>
            </div>
        </div>
        {#if $page.data.loggedInUser.uid === data.user.id || $page.data.loggedInUser.roleId == 1}
        <div class="flex flex-ol items-center justify-center px-6 py-8 mx-auto lg:py-0">
            <div class="flex items-center mb-6 text-2xl font-semibold text-gray-900">
                <a href="/users/{data.user.id}/cars/add" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-4">Tilføj bil</a>
            </div>
        </div>
        {/if}
    </section>


<div class="bg-white">
    <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">

            {#each data.cars as car}
            <div class="group relative">
                <h2 class="text-center text-lg font-semibold">{car.brand} {car.model}</h2>
                <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <img src="{data.API_HOST}/cars/{car.id}/image" alt="bil" class="h-full w-full object-cover object-center lg:h-full lg:w-full">
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
                        <p class="text-sm text-gray-500">{convertDateString(car.first_registration)}</p>
                    </div>
                </div>

                <div class="mt-4 flex justify-between px-2">
                    <div class="flex items-center">
                        <p class="text-sm text-gray-500">Oprettet</p>
                    </div>
                    <div class="flex items-center">
                        <p class="text-sm text-gray-500">{convertDateString(car.created_at)}</p>
                    </div>
                </div>

                <div class="mt-4 flex justify-between px-2">
                    <div class="flex items-center">
                        <p class="text-sm text-gray-500">Redigeret</p>
                    </div>
                    <div class="flex items-center">
                        <p class="text-sm text-gray-500">{convertDateString(car.updated_at)}</p>
                    </div>
                </div>
                <div class="mt-8 flex justify-center pb-6">
                    <a href="/users/{data.user.id}/cars/{car.id}/edit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">Rediger</a>
                    <form action="?/deleteCar" method="POST">
                        <input type="hidden" name="carID" value={car.id}>  
                        <button type="submit" class="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out">Slet</button>
                    </form>
                </div>
            </div>
            {/each}
        </div>
    </div>
</div>
</div>