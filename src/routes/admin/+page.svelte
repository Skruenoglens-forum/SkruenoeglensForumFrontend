<script>
	export let data;
</script>

<section class="bg-gray-0">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                    Admin
                </h1>
                <form class="space-y-4 md:space-y-6" action="#">
                    <p class="text-sm font-light text-gray-500">
                        Admindata kommer snart...
                    </p>
                </form>
            </div>
        </div>
    </div>
</section>

<div class="max-w-4xl mx-auto">

	<div class="p-4 m-6 bg-white rounded-lg border shadow-md sm:p-8">
    	<div class="flex justify-between items-center mb-4">
        	<h3 class="text-xl font-bold leading-none text-gray-900">Users</h3>
   		</div>
        	<ul role="list" class="divide-y divide-gray-200">

			{#each data.users as user}
				<li class="py-3 sm:py-4 hover:bg-gray-100">
					<a href="/users/{user.id}">
						<div class="flex items-center space-x-4">
							<div class="flex-shrink-0">
								<img class="w-8 h-8 rounded-full" src="/favicon.png" alt="">
							</div>
							<div class="flex-1 min-w-0">
								<p class="text-sm font-medium text-gray-900 truncate">{user.name}</p>
								<p class="text-sm text-gray-500 truncate">{user.email}</p>
							</div>
							<div class="inline-flex items-center text-base font-semibold text-gray-900">
								{user.role_id}
							</div>
						</div>
					</a>
				</li>
			{:else}
				<!-- this block renders when users.length === 0 -->
				<p>No users</p>
			{/each}

        	</ul>
   		</div>
</div>
