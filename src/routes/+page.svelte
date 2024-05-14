<script>
    import { page } from '$app/stores'
</script>

<section class="bg-gray-0">
    <div class="flex flex-ol items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <div class="flex items-center mb-6 text-2xl font-semibold text-gray-900">
            {#if $page.data.user}
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">Velkommen: {$page.data.user.email}</h1>
            {/if}

            {#if !$page.data.user}
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">Du er ikke logget ind</h1>
            {/if} 
        </div>
    </div>
</section>