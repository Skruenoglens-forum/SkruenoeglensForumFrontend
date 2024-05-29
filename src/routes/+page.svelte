<script>
    import { page } from '$app/stores'
    

    export let data;

    let posts = data.posts;
    let categorySearch = "";
    let bil;
    let licensplateInput;
    let bilIsLoading = false;
    async function getPostsByCategoryId(categoryId) {
        categorySearch = data.categories[categoryId-1].name
        let res = await fetch(`${data.API_HOST}/posts/categories/${categoryId}`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json'
            },
        });

        posts = await res.json()
    }
    async function getCarByLicensePlate(licenseplate){
        try {

            bilIsLoading = true;

            let res = await fetch(`https://lp.skruenøglen.dk/getcarbylp?licenseplate=${licenseplate}`,{
                method :'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Access-Control-Allow-Origin': '*'

                },
            })
        
            if( res.status ==200){
                bil = await res.json()
            }
            else {
                bil = undefined
            }
            console.log(bil);
        }catch (e) {

            // Alert
            alert("It fucked up!")

        }finally {

            // Not loading
            bilIsLoading = false;

        }
    }
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

<section class="bg-gray-0">
    <div class="flex flex-ol items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <div class="flex items-center mb-6 text-2xl font-semibold text-gray-900">
            {#if $page.data.loggedInUser}
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">Velkommen: {$page.data.loggedInUser.email}</h1>
            {/if}

            {#if !$page.data.loggedInUser}
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">Du er ikke logget ind</h1>
            {/if} 
        </div>
    </div>
</section>


<div class="bg-white">
    <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-1 lg:grid-cols-2 xl:gap-x-8">

            

            <div class="  max-w-4xl mx-auto bg-white shadow-lg rounded-lg">

                <div class="w-full gap-2 flex flex-col justify-center items-center px-4">
                    <form class="m-4 flex">
                        <input disabled={bilIsLoading} bind:value={licensplateInput} class="rounded-l-lg p-4 border-t mr-0 border-b border-l uppercase text-gray-800 border-red-500 bg-white" placeholder="AB 12 123"/>
                        {#if !bilIsLoading}
                        <button class=" px-8 rounded-r-lg bg-blue-400  text-white-800 font-bold p-4 uppercase border-red-500 border-t border-b border-r" on:click={getCarByLicensePlate(licensplateInput)}>Søg</button>
                        {:else}
                        
                        {/if}
                    </form>
                    {#if bilIsLoading}
                        <div>Jeg indlæser lige nu ;P</div>
                    {:else if bil}
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
                            <span class="text-gray-600"><i class="fas fa-calendar-alt"></i> Indregisteringsår:</span>
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

                <table class="min-w-full divide-y divide-gray-200">

                    <thead class="bg-gray-50">
                        <tr>
                            <th>
                                {#if categorySearch}
                                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">{categorySearch}</h1>
                                {/if} 
                            </th>
                            <th></th>
                        </tr>
                        <tr>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Forumkategorier
                            </th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Seneste svar
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        {#each data.categories as category}
                            <tr on:click={getPostsByCategoryId(category.id)} class="py-4 hover:bg-gray-50 transition-colors duration-200 ease-in-out">
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {category.name}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    4. maj
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
            
            <!-- License Plate Seach here -->

        </div>
    </div>
</div>

{#if $page.data.loggedInUser}
<section class="bg-gray-0">
    <div class="flex flex-ol items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <div class="flex items-center mb-6 text-2xl font-semibold text-gray-900">
            <a href="/posts/add" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-4">Tilføj opslag</a>
        </div>
    </div>
</section>
{/if}

<div class="bg-white">
    <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">

            {#each posts as post}
            <div class="group relative">
                <h2 class="text-center text-lg font-semibold">{post.title}</h2>
                <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <a href="/posts/{post.id}">
                        <img src="/bil.png" alt="bil" class="h-full w-full object-cover object-center lg:h-full lg:w-full">
                    </a>
                </div>
                <div class="mt-4 flex justify-between px-2">
                    <div class="flex items-center">
                        <p class="text-sm text-gray-500">20</p>
                        <img src="/chat.png" alt="kommentare" class="h-4 w-4 ml-1">
                    </div>
                    <div class="flex items-center">
                        <p class="text-sm text-gray-500">{convertDateString(post.created_at)}</p>
                        <img src="/clock.png" alt="tid" class="h-4 w-4 ml-1">
                    </div>
                </div>
                <div class="mt-4 flex justify-between px-2">
                    <div class="flex items-center">
                        <p class="inline-flex items-center mr-3 text-sm text-gray-900">
                            <img class="mr-2 w-6 h-6 rounded-full" src="{data.API_HOST}/users/{post.user_id}/image" alt="user">
                            {post.user_name}
                        </p>
                    </div>
                    <div class="flex items-center">
                        <p class="text-sm text-gray-500">{post.category_name}</p>
                    </div>
                </div>
            </div>
            {:else}
                {#if categorySearch}
                    <p class="py-4 text-center text-gray-500">Ingen opslag med kategorien {categorySearch}</p>
                {/if} 
                {#if !categorySearch}
                    <p class="py-4 text-center text-gray-500">Ingen opslag</p>
                {/if} 
            {/each}

        </div>
    </div>
</div>
