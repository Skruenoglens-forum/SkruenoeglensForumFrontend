<script>
	import { enhance } from "$app/forms"
	import { page } from '$app/stores';
</script>

<div class="mt-4 lg:row-span-3 lg:mt-0">
	<p class="text-3xl tracking-tight text-gray-900">Skriv en kommentar</p>
	<form action="?/addComment" method="POST" class="mt-10" use:enhance>
		{#if !$page.data.loggedInUser}
		<p class="text-sm text-gray-500">Du skal være logget ind for at skrive en kommentar</p>
		{/if}
		<div class="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50">
			<div class="px-4 py-2 bg-white rounded-t-lg">
				<textarea
					name="description"
					id="description"
					rows="4"
					class="w-full px-0 text-sm text-gray-900 bg-white border-0 focus:outline-none focus:ring-0 mt-1"
					placeholder="Skriv en kommentar..."
					required
				></textarea>
			</div>
			<div class="flex items-center justify-between px-3 py-2 border-t">
				<button
					type="submit"
					class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
					>
					Send kommentar
				</button>	
			</div>
		</div>
	</form>
</div>
