<script>
  export let data;
</script>

<section>
<div class="flex flex-col items-center justify-center px-6 py-8 mt-8 lg:py-0">
    <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Rediger din konto
            </h1>
            <form action="?/edit" method="POST" class="space-y-4 md:space-y-6">
                <div>
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Navn</label>
                    <input value={data.user.name} type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="John Doe" required="">
                </div>
                <div>
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Email</label>
                    <input value={data.user.email} type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="name@company.com" required="">
                </div>
                <div>
                    <label for="description" class="block mb-2 text-sm font-medium text-gray-900">Beskrivelse</label>
                    <input value={data.user.description} type="text" name="description" id="description" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="Skriv lidt om dig selv" required="">
                </div>
                
                <button type="submit" class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Edit account</button>
            </form>
        </div>
    </div>
</div>
</section>

<section class="pb-64">
    <div class="flex flex-col items-center justify-center px-6 py-8 mt-8 lg:py-0">
        <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                    Skift Password
                </h1>
                <form action="?/newpassword" method="POST" class="space-y-4 md:space-y-6">
                    <div>
                        <label for="new-password" class="block mb-2 text-sm font-medium text-gray-900">Nyt Password</label>
                        <input type="password" name="new-password" id="new-password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" required="">
                    </div>
                    <button type="submit" class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">New Password</button>
                </form>
            </div>
        </div>
    </div>
    </section>