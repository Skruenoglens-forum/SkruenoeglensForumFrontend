<script>
	import { enhance } from "$app/forms"
	import { page } from '$app/stores';
	import { getDateTime } from '../utils/utils';
	export let comments = [];
	export let post;

	function toggleDropdown(commentId) {
		dropdownVisible = {[commentId]: !dropdownVisible[commentId]};

		commentEditTextFieldVisible = {[commentId]: false};
	}

	function toggleCommentReplyTextField(commentId) {
		commentReplyTextFieldVisible = {[commentId]: !commentReplyTextFieldVisible[commentId]};
	}

	function toggleCommentEditTextField(commentId) {
		commentEditTextFieldVisible = {[commentId]: !commentEditTextFieldVisible[commentId]};
	}

	let dropdownVisible = {};
	let commentReplyTextFieldVisible = {};
	let commentEditTextFieldVisible = {};
</script>

<div class="max-w-2xl mx-auto px-4 border-b mb-8">
{#each comments as comment}
{#if comment.solution}
<div class="{!comment.parent_id ? '' : 'mb-3 ml-6 lg:ml-12'} flex items-start gap-2.5">
	{#if comment.user_id}
		<img class="w-8 h-8 rounded-full" src="{$page.data.API_HOST}/users/{comment.user_id}/image" alt="user">
	{:else}
		<img class="w-8 h-8 rounded-full" src="/user.png" alt="user">
	{/if}
	<div class="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl mb-6">
		<div class="flex items-center space-x-2 rtl:space-x-reverse">
			{#if comment.name}
			<span class="text-sm font-semibold text-gray-900">{comment.name}</span>
			{:else}
			<span class="text-sm font-semibold text-gray-900">Slettet Bruger</span>
			{/if}
			<span class="text-sm font-normal text-gray-500">{getDateTime(comment.created_at)}</span>
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
		<p class="{!commentEditTextFieldVisible[comment.id] ? '' : 'hidden'} text-sm font-normal py-2.5 text-gray-900">{comment.description}</p>
	</div>
</div>
{/if}
{/each}
</div>

<div class="max-w-2xl mx-auto px-4">
	{#each comments as comment}
	<div class="{!comment.parent_id ? '' : 'mb-3 ml-6 lg:ml-12'} flex items-start gap-2.5">
		{#if comment.user_id}
			<img class="w-8 h-8 rounded-full" src="{$page.data.API_HOST}/users/{comment.user_id}/image" alt="user">
		{:else}
			<img class="w-8 h-8 rounded-full" src="/user.png" alt="user">
		{/if}
		<div class="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl mb-6">
			<div class="flex items-center space-x-2 rtl:space-x-reverse">
				{#if comment.name}
				<span class="text-sm font-semibold text-gray-900">{comment.name}</span>
				{:else}
				<span class="text-sm font-semibold text-gray-900">Slettet Bruger</span>
				{/if}
				<span class="text-sm font-normal text-gray-500">{getDateTime(comment.created_at)}</span>
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
			<p class="{!commentEditTextFieldVisible[comment.id] ? '' : 'hidden'} text-sm font-normal py-2.5 text-gray-900">{comment.description}</p>
				{#if $page.data.loggedInUser}
				<button
					on:click={() => toggleCommentReplyTextField(comment.id)}
					type="button"
					class="{!commentEditTextFieldVisible[comment.id] ? '' : 'hidden'} flex items-center text-sm text-gray-500 hover:underline font-medium"
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
				{/if}
				{#if !$page.data.loggedInUser}
				<a href="/login" class="flex items-center text-sm text-gray-500 hover:underline font-medium">
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
				</a>
				{/if}
				<form
					action="?/editComment"
					method="POST"
					class="{commentEditTextFieldVisible[comment.id] ? '' : 'hidden'} mt-10"
					use:enhance
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
				on:click={() => {toggleCommentEditTextField(comment.id)}}
				class="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
				>Rediger kommentar</button
			>
		</form>
			<form
				action="?/addComment"
				method="POST"
				class="{commentReplyTextFieldVisible[comment.id] ? '' : 'hidden'} mt-10"
				use:enhance
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
					on:click={() => {toggleCommentReplyTextField(comment.id)}}
					class="mt-4 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
					>Svar {#if comment.name} {comment.name}{:else}Slettet Bruger{/if}</button
				>
			</form>
		</div>
		<!-- Comment Settings visible for owner of post, owner of comment and admin -->
		{#if ($page.data.loggedInUser?.uid == comment.user_id || $page.data.loggedInUser?.uid == post.user_id || $page.data.loggedInUser?.roleId == 1) && $page.data.loggedInUser}
		<button on:click={() => toggleDropdown(comment.id)} id="dropdownMenuIconButton" data-dropdown-toggle="dropdownDots" data-dropdown-placement="bottom-start" class="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50" type="button">
			<svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
				<path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/>
			</svg>
		</button>
		{/if}
		<div id="dropdownDots" class="{dropdownVisible[comment.id] ? '' : 'hidden'} {!commentEditTextFieldVisible[comment.id] ? '' : 'hidden'} z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-40">
			<ul class="py-2 text-sm text-gray-700" aria-labelledby="dropdownMenuIconButton">
				<!-- Solution visible for owner of post and admin -->
				{#if $page.data.loggedInUser?.uid == post.user_id || $page.data.loggedInUser?.roleId == 1}
				<li>
					{#if !comment.solution}
						<form
							action="?/markCommentAsSolution"
							method="POST"
							class="block px-4 text-green-600 py-2 px-4 hover:bg-gray-100"
							use:enhance
						>
							<input type="hidden" name="commentId" value={comment.id} />
							<button type="submit">Løsning</button>
						</form>
					{/if}
					{#if comment.solution}
						<form
							action="?/removeCommentAsSolution"
							method="POST"
							class="block px-4 text-green-600 py-2 px-4 hover:bg-gray-100"
							use:enhance
						>
							<input type="hidden" name="commentId" value={comment.id} />
							<button type="submit">Fjern løsning</button>
						</form>
					{/if}
				</li>
				{/if}
				<!-- Edit and delete visible for owner of comment and admin -->
				{#if $page.data.loggedInUser?.uid == comment.user_id || $page.data.loggedInUser?.roleId == 1}
				<li>
					<div class="block text-blue-600 py-2 px-4 hover:bg-gray-100">
						<button on:click={() => {
							toggleCommentEditTextField(comment.id)
						}}>Rediger</button>
					</div>
				</li>
				<li>
					<form
						action="?/deleteComment"
						method="POST"
						class="block text-red-600 py-2 px-4 hover:bg-gray-100"
						use:enhance
					>
						<input type="hidden" name="commentId" value={comment.id} />
						<button type="submit">Slet</button>
					</form>
				</li>
				{/if}
			</ul>
		</div>
	</div>
	{:else}
	<p class="py-4 text-center text-gray-500">Ingen kommentare</p>
	{/each}
</div>