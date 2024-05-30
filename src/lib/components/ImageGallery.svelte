<script>
	import { page } from '$app/stores';
	export let images;
</script>

<div class="flex flex-wrap gap-8 justify-center container mx-auto">
	{#each images as image}
		<div>
			<img
				class="h-auto max-w-full rounded-lg max-h-40 md:max-h-80"
				alt="image{image.id}"
				src="{$page.data.API_HOST}/posts/image/{image.id}"
			/>
		</div>
	{/each}
</div>
