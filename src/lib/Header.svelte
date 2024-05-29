<script>
    import { page } from '$app/stores'

    let isMenuOpen = false;

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
    }
</script>

<style>
	.button {
	  @apply px-4 py-2 rounded-md font-semibold transition duration-300 ease-in-out;
	}
  
	.login-button {
	  @apply bg-green-500 text-white hover:bg-green-600;
	}
  
	.logout-button {
	  @apply bg-red-500 text-white hover:bg-red-600;
	}

	.signup-button {
	  @apply bg-blue-500 text-white hover:bg-blue-600;
	}

	.default-button {
		@apply bg-gray-200 text-white hover:bg-gray-300;
	}

	.search-input {
		@apply w-full max-w-md border border-gray-300 bg-white h-10 px-5 pr-10 rounded-lg text-sm focus:outline-none;
	}
</style>

<header class="mb-10">
	<nav class="flex justify-between items-center py-4 px-6 bg-white text-black shadow-lg">
		<a href="/" class="flex items-center mr-5">
			<img src="/favicon.png" alt="logo" class="h-8 w-auto">
			<span class="text-lg font-semibold">Skruenøglens Forum</span>
		</a>

		<div class="hidden lg:flex flex-1 justify-center">
			<input type="text" placeholder="Søg..." class="search-input">
		</div>			

		<div class="hidden lg:flex items-center space-x-4 ml-5">
			{#if $page.data.loggedInUser}
			<a href="/notifications" class="button default-button w-max-md">
				<img class="h-6 w-auto" src="/bell.png" alt="notifications">
			</a>
			<a href="/users/{$page.data.loggedInUser.uid}" class="button default-button">
				<img class="h-6 w-auto" src="/user.png" alt="profile">
			</a>
			{#if $page.data.loggedInUser.roleId == 1}
			<a href="/admin" class="button default-button">
				<img class="h-6 w-auto" src="/admin.png" alt="admin">
			</a>
			{/if}
			{/if}
			{#if !$page.data.loggedInUser}
			<a href="/signup" class="button signup-button">Opret bruger</a>
			<a href="/login" class="button login-button">Log ind</a>
			{/if}
			{#if $page.data.loggedInUser}
			<form action="/logout" method="POST">
				<button type="submit" class="button logout-button">Log ud</button>
			</form>
			{/if}
		</div>
		<button on:click={toggleMenu} data-collapse-toggle="mobile-menu-2" type="button" class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="mobile-menu-2" aria-expanded="false">
			<span class="sr-only">Open main menu</span>
			<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
		</button>
  	</nav>

    <div class="{isMenuOpen ? '' : 'hidden'} lg:hidden" role="dialog" aria-modal="true">
     	<div class="fixed inset-0 z-10"></div>
		<div class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
			<div class="flex items-center justify-between">
				<a href="/" class="-m-1.5 p-1.5">
					<img class="h-8 w-auto" src="/favicon.png" alt="">
				</a>
				<button on:click={toggleMenu} type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700">
					<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
						<path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd">
					</svg>
				</button>

			</div>
			<div class="mt-6 flow-root">
				<div class="-my-6 divide-y divide-gray-500/10">
					<div class="space-y-2 py-6">
						<div class="flex-1 flex justify-center">
							<input type="text" placeholder="Search" class="search-input">
						</div>
						{#if $page.data.loggedInUser}
						<div class="flex-1 flex justify-center">
							<a href="/notifications" on:click={toggleMenu} class="w-full max-w-md block button default-button flex justify-center items-center">
								<img class="h-6 w-auto" src="/bell.png" alt="notifications">
							</a>
						</div>
						<div class="flex-1 flex justify-center">
							<a href="/users/{$page.data.loggedInUser.uid}" on:click={toggleMenu} class="w-full max-w-md block button default-button flex justify-center items-center">
								<img class="h-6 w-auto" src="/user.png" alt="profile">
							</a>
						</div>
						{#if $page.data.loggedInUser.roleId == 1}
						<div class="flex-1 flex justify-center">
							<a href="/admin" on:click={toggleMenu} class="w-full max-w-md block button default-button flex justify-center items-center">
								<img class="h-6 w-auto" src="/admin.png" alt="admin">
							</a>
						</div>
						{/if}
						{/if}
					</div>
					<div class="space-y-2 py-6 mx-auto max-w-5xs text-center">
						{#if !$page.data.loggedInUser}
						<div class="flex-1 flex justify-center">
							<a href="/signup" on:click={toggleMenu} class="w-full max-w-md block button signup-button">Opret bruger</a>
						</div>
						<div class="flex-1 flex justify-center">
							<a href="/login" on:click={toggleMenu} class="w-full max-w-md block button login-button">Log ind</a>
						</div>
						{/if}
						{#if $page.data.loggedInUser}
						<form action="/logout" method="POST" class="flex-1 flex justify-center">
							<button type="submit" class="w-full max-w-md block button logout-button">Log ud</button>
						</form>
						{/if}
					</div>
				</div>
    		</div>
    	</div>
	</div>
</header>