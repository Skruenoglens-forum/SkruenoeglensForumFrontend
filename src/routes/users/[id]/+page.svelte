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

  <div class="w-full h-screen px-10 pt-10">
    <div class="relative mt-16 mb-32 max-w-sm mx-auto mt-24">
        <div class="rounded overflow-hidden shadow-md bg-white">
            <div class="absolute -mt-20 w-full flex justify-center">
                <div class="h-32 w-32">
                    <img src="/user.png" class="rounded-full object-cover h-full w-full shadow-md" />
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
                        <strong>Oprettet:</strong> {convertDateString(data.user.createdAt)}<br>
                        <strong>Redigeret:</strong> {convertDateString(data.user.updatedAt)}<br>
                    </p>
                </div>
            </div>
            <div class="mt-8 flex justify-center pb-6">
                <a href="/users/{data.user.id}/edit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">Rediger</a>
                <a href="/login" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Slet</a>
            </div>
        </div>
    </div>
</div>
