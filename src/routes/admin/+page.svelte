<script>
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

<div class="max-w-4xl mx-auto p-6">
    <div class="p-6 bg-white rounded-xl border shadow-lg sm:p-10">
        <div class="flex justify-between items-center mb-6">
            <h3 class="text-2xl font-extrabold leading-tight text-gray-900">Users</h3>
        </div>
        <ul role="list" class="divide-y divide-gray-200">
            {#each data.users as user}
				<li class="py-4 hover:bg-gray-50 transition-colors duration-200 ease-in-out">
					<a href="/users/{user.id}" class="block">
						<div class="flex flex-col sm:flex-row items-center sm:space-x-6">
							<div class="flex-shrink-0 mb-4 sm:mb-0">
								<img class="w-16 h-16 rounded-full" src="/user.png" alt="{user.name}">
							</div>
							<div class="flex-1 min-w-0">
								<p class="text-lg font-medium text-gray-900 truncate">{user.name}</p>
								<p class="text-sm text-gray-500 truncate">{user.email}</p>
								<p class="text-sm text-gray-500 truncate">Created: {convertDateString(user.createdAt)}</p>
								<p class="text-sm text-gray-500 truncate">Updated: {convertDateString(user.updatedAt)}</p>
							</div>
							<div class="mt-4 sm:mt-0 sm:ml-auto flex items-center space-x-4">
								<span class="text-sm text-gray-500">
									<a href="/login" class="button edit-button">Edit</a>
								</span>
								<span class="text-sm text-gray-500">
									<a href="/login" class="button delete-button">Delete</a>
								</span>
							</div>
						</div>
					</a>
				</li>
				
            {:else}
                <p class="py-4 text-center text-gray-500">No users</p>
            {/each}
        </ul>
    </div>
</div>

<style>
	.button {
	  @apply px-4 py-2 rounded-md font-semibold transition duration-300 ease-in-out;
	}
  
	.edit-button {
	  @apply bg-blue-500 text-white hover:bg-blue-600;
	}
	.delete-button {
	  @apply bg-red-500 text-white hover:bg-red-600;
	}
</style>