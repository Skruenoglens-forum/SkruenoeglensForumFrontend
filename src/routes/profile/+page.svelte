<script>
    export let data
</script>

<div class="max-w-4xl mx-auto">

	<div class="p-4 m-6 bg-white rounded-lg border shadow-md">

        <h1 class="font-bold text-center text-3xl text-gray-900">Profil</h1>

        <h1 class="font-bold text-center text-xl text-gray-900">{data.userInfo.name}</h1>

        <div class="w-full">
            <div class="mt-5 w-full flex flex-col items-center overflow-hidden text-sm">

                <div class="w-full border-b border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block overflow-hidden flex flex-col pb-3">
                    <p class="text-gray-500 md:text-lg">Id</p>
                    <p class="font-semibold">{data.userInfo.id}</p>
                </div>

                <div class="w-full border-b border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block overflow-hidden flex flex-col pb-3">
                    <p class="text-gray-500 md:text-lg">Name</p>
                    <p class="font-semibold">{data.userInfo.name}</p>
                </div>

                <div class="w-full border-b border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block overflow-hidden flex flex-col pb-3">
                    <p class="text-gray-500 md:text-lg">Email</p>
                    <p class="font-semibold">{data.userInfo.email}</p>
                </div>

                <div class="w-full border-b border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block overflow-hidden flex flex-col pb-3">
                    <p class="text-gray-500 md:text-lg">Role_id</p>
                    <p class="font-semibold">{data.userInfo.role_id}</p>
                </div>

                <div class="w-full border-b border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block overflow-hidden flex flex-col pb-3">
                    <p class="text-gray-500 md:text-lg">Created_at</p>
                    <p class="font-semibold">{data.userInfo.created_at}</p>
                </div>

                <div class="w-full border-b border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block overflow-hidden flex flex-col pb-3">
                    <p class="text-gray-500 md:text-lg">Updated_at</p>
                    <p class="font-semibold">{data.userInfo.updated_at}</p>
                </div>
                
            </div>
        </div>

        <div class="flex justify-between items-center">
            <form
            class="text-red-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3"
            action="?/deleteUser"
            method="POST">
                <button type="submit">
                    Delete
                </button>
            </form>
            <a href="/users/{data.userInfo.id}/edit" class="text-blue-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3">Edit</a>
        </div>

	</div>
</div>

<style>

</style>
