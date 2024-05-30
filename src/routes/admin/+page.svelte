<script>
	import UserList from "../../lib/components/UserList.svelte";

	export let data;
</script>

<div class="max-w-4xl mx-auto p-6">
	<UserList users={data.users} />
</div>
