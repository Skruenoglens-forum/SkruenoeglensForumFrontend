<script>
	import CommentSection from '$lib/components/CommentSection.svelte';
	import Comments from '$lib/components/Comments.svelte';
	import ImageGallery from '$lib/components/ImageGallery.svelte';
	import PostDetails from '$lib/components/PostDetails.svelte';

	export let data;
</script>

<div class="pt-6">
	<ImageGallery images={data.images} />
	<div
		class="mx-auto max-w-2xl px-4 pb-4 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8"
	>
		<PostDetails post={data.post} />
		<CommentSection />
	</div>
</div>

<Comments comments={data.comments} post={data.post} />
