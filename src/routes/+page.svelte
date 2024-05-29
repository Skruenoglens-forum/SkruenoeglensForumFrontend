<script>
    import { page } from '$app/stores'
    import {ProgressRadial} from '@skeletonlabs/skeleton'
    import { getToastStore } from '@skeletonlabs/skeleton';

    export let data;

    const toastStore = getToastStore();
    let posts = data.posts;

    let categorySearch = "";
    let selectedCategoryId = '';
    async function getPostsByCategoryId(categoryId) {
        if (categoryId) {
        categorySearch = data.categories[categoryId-1].name
        let res = await fetch(`${data.API_HOST}/posts/categories/${categoryId}`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json'
            },
        });

        posts = await res.json()
        } else {
            categorySearch = "Alle"
                let res = await fetch(`${data.API_HOST}/posts`, {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json'
                },
             });

            posts = await res.json()
        }

    }

    let bil;
    let licensplateInput; 
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
                toastStore.trigger()
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

{#if $page.data.loggedInUser}
<section>
    <div class="flex justify-center">
        <a href="/posts/add" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Tilføj opslag</a>
    </div>
</section>
{/if}

<div class="mx-auto max-w-2xl px-6 py-6 lg:max-w-7xl">
    <div class="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-1 lg:grid-cols-2">
        <section>
            <div class="flex flex-col items-center justify-center">
                <div class="w-full bg-white rounded-lg shadow sm:max-w-md">
                    <h1 class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Søg efter nummerplade
                    </h1>
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <form class="m-4 flex">
                            <input bind:value={licensplateInput} class="bg-white border border-t border-b border-l border-red-200 text-gray-900 sm:text-sm rounded-l-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" type="text" placeholder="AB 12 123">
                            <button class="px-8 rounded-r-lg bg-blue-400  text-white-800 font-bold p-4 uppercase border-red-500 border-t border-b border-r" on:click={getCarByLicensePlate(licensplateInput)}>Søg</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
        <section>
            <div class="flex flex-col items-center justify-center">
                <div class="w-full bg-white rounded-lg shadow sm:max-w-md">
                    <h1 class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Forumkategorier
                    </h1>
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <select on:change={(event) => getPostsByCategoryId(event.target.value)} bind:value={selectedCategoryId} name="categoryId" id="categoryId" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5">
                            <option value="" >Alle</option>
                            {#each data.categories as category}
                                <option value={category.id}>{category.name}</option>
                            {/each}
                        </select>
                    </div>


<div class="bg-white">
    <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-1 lg:grid-cols-2 xl:gap-x-8">

            

            <div class="  max-w-4xl mx-auto bg-white shadow-lg rounded-lg">

                <div class="w-full gap-2 flex flex-col justify-center items-center px-4">
                    <form class="m-4 flex">
                        <input disabled={bilIsLoading} bind:value={licensplateInput} class="rounded-l-lg p-4 border-t mr-0 border-b border-l uppercase text-gray-800 border-red-500 bg-white" placeholder="AB 12 123"/>
                        
                        <button disabled={bilIsLoading} class=" flex items-center justify-center px-8 rounded-r-lg bg-blue-400 min-w-28 text-white-800 font-bold p-4 uppercase border-red-500 border-t border-b border-r" on:click={getCarByLicensePlate(licensplateInput)}>{#if !bilIsLoading}Søg{:else}<ProgressRadial width='w-6' class ="m-0"/>{/if}</button>
                        
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
            </div>
        </section>
    </div>
</div>

<div class="mx-auto max-w-2xl px-6 py-6 lg:max-w-7xl">
    <div class="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
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
