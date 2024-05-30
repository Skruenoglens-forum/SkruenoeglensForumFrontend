<script>
	import UserItem from './UserItem.svelte';

	export let users = [];
</script>

<div class="p-6 bg-white rounded-xl border shadow-lg sm:p-10">
	<div class="flex justify-between items-center mb-6">
		<h3 class="text-2xl font-extrabold leading-tight text-gray-900">Users</h3>
	</div>
	<ul role="list" class="divide-y divide-gray-200">
		{#each users as user}
			<UserItem {user} />
		{:else}
			<p class="py-4 text-center text-gray-500">No users</p>
		{/each}
	</ul>
</div>
