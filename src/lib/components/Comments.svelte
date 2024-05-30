<script>
	import { page } from '$app/stores';
	import { getDateTime } from '../utils/utils';
	export let comments = [];

	function toggleDropdown(commentId) {
		dropdownVisible = {
			...dropdownVisible,
			[commentId]: !dropdownVisible[commentId]
		};

		commentEditTextFieldVisible = {
			...commentEditTextFieldVisible,
			[commentId]: false
		};
	}

	function toggleCommentReplyTextField(commentId) {
		commentReplyTextFieldVisible = {
			...commentReplyTextFieldVisible,
			[commentId]: !commentReplyTextFieldVisible[commentId]
		};
	}

	function toggleCommentEditTextField(commentId) {
		commentEditTextFieldVisible = {
			...commentEditTextFieldVisible,
			[commentId]: !commentEditTextFieldVisible[commentId]
		};
	}

	let dropdownVisible = {};
	let commentReplyTextFieldVisible = {};
	let commentEditTextFieldVisible = {};
</script>

<div class="max-w-2xl mx-auto px-4">
	{#each comments as comment}
		<article
			class="{!comment.parent_id ? '' : 'mb-3 ml-6 lg:ml-12'} p-6 text-base bg-white rounded-lg"
		>
			<footer class="flex justify-between items-center mb-2">
				<div class="flex items-center">
					<a href="/users/{comment.user_id}">
						<p class="inline-flex items-center mr-3 text-sm text-gray-900">
							<img
								class="mr-2 w-6 h-6 rounded-full"
								src="{$page.data.API_HOST}/users/{comment.user_id}/image"
								alt="user"
							/>
							{comment.name}
						</p>
					</a>
					<p class="text-sm text-gray-600">{getDateTime(comment.created_at)}</p>
					{#if comment.solution}
						<svg
							class="ml-2 w-4 h-4 text-green-500"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fill-rule="evenodd"
								d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-10.707a1 1 0 10-1.414-1.414L9 9.586 7.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
								clip-rule="evenodd"
							></path>
						</svg>
					{/if}
				</div>
				{#if dropdownVisible[comment.id]}
					<button
						on:click={() => toggleDropdown(comment.id)}
						id="dropdownComment1Button"
						data-dropdown-toggle="dropdownComment1"
						class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50"
						type="button"
					>
						<svg
							class="w-4 h-4"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							viewBox="0 0 16 16"
						>
							<path
								d="M3.404 3.404a1 1 0 0 1 1.414 0L8 6.586l3.182-3.182a1 1 0 1 1 1.414 1.414L9.414 8l3.182 3.182a1 1 0 0 1-1.414 1.414L8 9.414l-3.182 3.182a1 1 0 0 1-1.414-1.414L6.586 8 3.404 4.818a1 1 0 0 1 0-1.414z"
							/>
						</svg>
						<span class="sr-only">Close</span>
					</button>
				{/if}
				{#if !dropdownVisible[comment.id]}
					<button
						on:click={() => toggleDropdown(comment.id)}
						id="dropdownComment1Button"
						data-dropdown-toggle="dropdownComment1"
						class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50"
						type="button"
					>
						<svg
							class="w-4 h-4"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							viewBox="0 0 16 3"
						>
							<path
								d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"
							/>
						</svg>
						<span class="sr-only">Comment settings</span>
					</button>
				{/if}
				<div
					id="dropdownComment1"
					class="{dropdownVisible[comment.id]
						? ''
						: 'hidden'} z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow"
				>
					<ul class="py-1 text-sm text-gray-700" aria-labelledby="dropdownMenuIconHorizontalButton">
						<li>
							{#if !comment.solution}
								<form
									action="?/markCommentAsSolution"
									method="POST"
									class="block text-green-600 py-2 px-4 hover:bg-gray-100"
								>
									<input type="hidden" name="commentId" value={comment.id} />
									<button type="submit">Løsning</button>
								</form>
							{/if}
							{#if comment.solution}
								<form
									action="?/removeCommentAsSolution"
									method="POST"
									class="block text-green-600 py-2 px-4 hover:bg-gray-100"
								>
									<input type="hidden" name="commentId" value={comment.id} />
									<button type="submit">Fjern løsning</button>
								</form>
							{/if}
						</li>
						<li>
							<div class="block text-blue-600 py-2 px-4 hover:bg-gray-100">
								<button on:click={() => toggleCommentEditTextField(comment.id)}>Rediger</button>
							</div>
						</li>
						<li>
							<form
								action="?/deleteComment"
								method="POST"
								class="block text-red-600 py-2 px-4 hover:bg-gray-100"
							>
								<input type="hidden" name="commentId" value={comment.id} />
								<button type="submit">Slet</button>
							</form>
						</li>
					</ul>
				</div>
			</footer>
			<p class="{!commentEditTextFieldVisible[comment.id] ? '' : 'hidden'} text-gray-500">
				{comment.description}
			</p>

			<form
				action="?/editComment"
				method="POST"
				class="{commentEditTextFieldVisible[comment.id] ? '' : 'hidden'} mt-10"
			>
				<div class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200">
					<input type="hidden" name="commentId" value={comment.id} />
					<textarea
						name="description"
						id="description"
						rows="6"
						class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none"
						value={comment.description}
						required
					></textarea>
				</div>
				<button
					type="submit"
					class="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
					>Rediger kommentar</button
				>
			</form>

			<div class="flex items-center mt-4 space-x-4">
				<button
					on:click={() => toggleCommentReplyTextField(comment.id)}
					type="button"
					class="flex items-center text-sm text-gray-500 hover:underline font-medium"
				>
					<svg
						class="mr-1.5 w-3.5 h-3.5"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 20 18"
					>
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
						/>
					</svg>
					Svar
				</button>
			</div>
			<form
				action="?/addComment"
				method="POST"
				class="{commentReplyTextFieldVisible[comment.id] ? '' : 'hidden'} mt-10"
			>
				<div class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200">
					<input type="hidden" name="parentId" value={comment.id} />
					<textarea
						name="description"
						id="description"
						rows="6"
						class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none"
						placeholder="Skriv en kommentar..."
						required
					></textarea>
				</div>
				<button
					type="submit"
					class="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
					>Send</button
				>
			</form>
		</article>
	{:else}
		<p class="py-4 text-center text-gray-500">Ingen kommentare</p>
	{/each}
</div>
