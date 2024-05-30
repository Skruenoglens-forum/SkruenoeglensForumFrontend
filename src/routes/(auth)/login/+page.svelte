<script>
	export let form;
</script>

<section class="bg-gray-0">
	<div class="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
		<a href="/" class="flex items-center mb-6 text-2xl font-semibold text-gray-900">
			<img class="w-16 h-16 mr-2" src="/favicon.png" alt="logo" />
		</a>
		<div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
			<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
				<h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
					Log ind
				</h1>
				<form class="space-y-4 md:space-y-6" action="?/login" method="POST">
					<div>
						<label for="email" class="block mb-2 text-sm font-medium text-gray-900">Email</label>
						<input
							type="email"
							name="email"
							id="email"
							class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
							placeholder="jens@jensen.com"
							required=""
						/>
					</div>
					<div>
						<label for="password" class="block mb-2 text-sm font-medium text-gray-900"
							>Password</label
						>
						<input
							type="password"
							name="password"
							id="password"
							placeholder="••••••••"
							class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
							required=""
						/>
					</div>
					<button type="submit" class="w-full button login-button">Log ind</button>
					<p class="text-sm font-light text-gray-500">
						Har du ikke en bruger endnu? <a
							href="/signup"
							class="font-medium text-blue-600 hover:underline">Opret bruger</a
						>
					</p>
				</form>
			</div>
		</div>
	</div>
</section>

{#if form?.invalid}
	<p class="error">Email and password is required.</p>
{/if}

{#if form?.credentials}
	<p class="error">You have entered the wrong credentials.</p>
{/if}

<style>
	/* Tilpasninger af knapstil */
	.button {
		@apply px-4 py-2 rounded-md font-semibold transition duration-300 ease-in-out;
	}

	/* Grøn knapstil */
	.login-button {
		@apply bg-green-500 text-white hover:bg-green-600;
	}
</style>
