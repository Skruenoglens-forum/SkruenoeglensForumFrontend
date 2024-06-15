<script>
	import { enhance } from "$app/forms"
	import { page } from '$app/stores';
	import { getDateTime } from '../utils/utils';

	export let user;
</script>

<li class="py-4 hover:bg-gray-50 transition-colors duration-200 ease-in-out">
	<a href="/users/{user.id}" class="block">
		<div class="flex flex-col sm:flex-row items-center sm:space-x-6">
			<div class="flex-shrink-0 mb-4 sm:mb-0">
				<img
					class="w-16 h-16 rounded-full"
					src="{$page.data.API_HOST}/users/{user.id}/image"
					alt={user.name}
				/>
			</div>
			<div class="flex-1 min-w-0">
				<p class="text-lg font-medium text-gray-900 truncate">{user.id} - {user.name} - {user.role_name}</p>
				<p class="text-sm text-gray-500 truncate">{user.email}</p>
				<p class="text-sm text-gray-500 truncate">
					Oprettet: {getDateTime(user.created_at)}
				</p>
				<p class="text-sm text-gray-500 truncate">
					Redigeret: {getDateTime(user.updated_at)}
				</p>
			</div>
			<div class="mt-4 sm:mt-0 sm:ml-auto flex items-center space-x-4">
				<span class="text-sm text-gray-500">
					<a
						href="/users/{user.id}/edit"
						class="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out"
						>Rediger</a
					>
				</span>
				{#if user.role_id != 3}
				<span class="text-sm text-gray-500">
					<form action="?/banUser" method="POST" use:enhance>
						<input type="hidden" name="userID" value={user.id} />
						<button
							type="submit"
							onclick="event.stopPropagation(); event.preventDefault(); this.closest('form').submit();"
							class="bg-yellow-500 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out"
							>Ban</button
						>
					</form>
				</span>
				{:else}
				<span class="text-sm text-gray-500">
					<form action="?/unbanUser" method="POST" use:enhance>
						<input type="hidden" name="userID" value={user.id} />
						<button
							type="submit"
							onclick="event.stopPropagation(); event.preventDefault(); this.closest('form').submit();"
							class="bg-yellow-500 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out"
							>Unban</button
						>
					</form>
				</span>
				{/if}
				<span class="text-sm text-gray-500">
					<form action="?/deleteUser" method="POST" use:enhance>
						<input type="hidden" name="userID" value={user.id} />
						<button
							type="submit"
							onclick="event.stopPropagation(); event.preventDefault(); this.closest('form').submit();"
							class="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out"
							>Slet</button
						>
					</form>
				</span>
			</div>
		</div>
	</a>
</li>
