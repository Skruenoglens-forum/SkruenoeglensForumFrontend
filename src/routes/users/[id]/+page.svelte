<script>
	import { page } from '$app/stores';
	import CarList from '$lib/components/CarList.svelte';
	import PostList from '$lib/components/PostList.svelte';
	import Profile from '$lib/components/Profile.svelte';

	export let data;
</script>

<div class="w-full pt-10">
	<Profile user={data.user} />

	<div class="flex flex-ol items-center justify-center px-6 py-8 mx-auto lg:py-0">
		<div class="flex items-center mb-6 text-2xl font-semibold text-gray-900">
			<h1 class="mr-4">{data.user.name}'s biler</h1>
			{#if $page.data.loggedInUser?.uid === data.user.id}
                <a href="/cars/add" class="inline-flex items-center justify-center w-8 h-8 font-medium bg-green-600 rounded-full hover:bg-green-700 group focus:ring-4 focus:ring-green-300 focus:outline-none">
                    <svg class="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                    </svg>
                </a>
			{/if}
		</div>
	</div>
	
	<CarList cars={data.cars} />

    <div class="flex flex-ol items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <div class="flex items-center mb-6 text-2xl font-semibold text-gray-900">
            <h1 class="mr-4">{data.user.name}'s opslag</h1>
            {#if $page.data.loggedInUser?.uid === data.user.id}
                <a href="/posts/add" class="inline-flex items-center justify-center w-8 h-8 font-medium bg-green-600 rounded-full hover:bg-green-700 group focus:ring-4 focus:ring-green-300 focus:outline-none">
                    <svg class="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                    </svg>
                </a>
            {/if}
        </div>
    </div>
		
	<PostList posts={data.posts} />
</div>
