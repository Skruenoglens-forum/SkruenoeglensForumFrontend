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

            {#each data.posts as post}
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
                        <p class="text-sm text-gray-500">{convertDateString(post.createdAt)}</p>
                        <img src="/clock.png" alt="tid" class="h-4 w-4 ml-1">
                    </div>
                </div>
                <div class="mt-4 flex px-2">
                    <div class="flex items-center">
                        <p class="text-sm text-gray-500">{post.userId}</p>
                    </div>
                </div>
            </div>
            {:else}
            <p class="py-4 text-center text-gray-500">No posts</p>
            {/each}

        </div>
    </div>
</div>
