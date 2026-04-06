<script>
	import { onMount, onDestroy } from 'svelte';
	import { page } from '$app/state';
	import { checkSecret, getSecret } from '$lib';

	let checkSecretLoading = $state(true);
	let getSecretLoading = $state(false);
	let secretExists = $state(false);

	let secret = $state('');
	let errorMessage = $state('');

	let copied = $state(false);
	let copyTimeout = $state();

	onDestroy(() => {
		secret = '';
	});

	onMount(async () => {
		const secretId = page.params.id;

		if (!secretId) return;

		try {
			const { data } = await checkSecret({ secretId });
			secretExists = data.exists;
		} catch {
			errorMessage = 'Something went wrong. Please try again later.';
		} finally {
			checkSecretLoading = false;
		}
	});
</script>

<div class="flex min-h-screen flex-col items-center bg-gray-900 px-4 py-8">
	{#if !checkSecretLoading && secretExists}
		<div class="mb-4 text-center">
			<h1 class="text-2xl font-bold text-gray-200 sm:text-3xl">You've received a Secret</h1>
			<p class="text-sm font-light text-gray-400 sm:text-base">You can only view it once</p>
		</div>
	{/if}
	<div
		class="flex w-full max-w-lg flex-1 flex-col items-center justify-center space-y-6 pb-20 sm:pb-40"
	>
		{#if checkSecretLoading}
			<div class="flex items-center gap-2 text-gray-400">
				<svg
					class="h-5 w-5 animate-spin text-white"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle
						class="opacity-25"
						cx="12"
						cy="12"
						r="10"
						stroke="currentColor"
						stroke-width="4"
					/>
					<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
				</svg>
			</div>
		{:else if errorMessage}
			<p class="text-red-400">{errorMessage}</p>
		{:else if !secretExists}
			<p class="text-red-400">This secret does not exist or has already been viewed.</p>
		{:else if secret}
			<div class="w-full space-y-2">
				<div
					class="w-full rounded-lg border border-gray-600 bg-gray-800 p-4 break-words text-white"
				>
					{secret}
				</div>
				<button
					onclick={() => {
						navigator.clipboard.writeText(secret);
						copied = true;
						if (copyTimeout) clearTimeout(copyTimeout);
						copyTimeout = setTimeout(() => {
							copied = false;
							copyTimeout = null;
						}, 2000);
					}}
					class="w-full rounded-lg bg-indigo-500 py-2 text-white shadow-sm transition-colors duration-200 hover:bg-indigo-600 active:scale-99"
				>
					{copied ? 'Copied!' : 'Copy secret'}
				</button>
			</div>
		{:else}
			<button
				onclick={async () => {
					getSecretLoading = true;
					errorMessage = '';

					try {
						const secretId = page.params.id;
						if (!secretId) return;

						const { data } = await getSecret({ secretId });
						secret = data.ciphertext;
					} catch {
						errorMessage = 'Unable to retrieve your secret. Please try again later.';
					} finally {
						getSecretLoading = false;
					}
				}}
				disabled={getSecretLoading}
				class="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-500 py-2 text-white shadow-sm transition-colors duration-200 hover:bg-indigo-600 not-disabled:active:scale-99 disabled:cursor-not-allowed disabled:bg-gray-700 disabled:text-gray-400"
			>
				{#if getSecretLoading}
					<svg
						class="h-5 w-5 animate-spin text-white"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
					>
						<circle
							class="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							stroke-width="4"
						/>
						<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
					</svg>
					<span>Loading secret...</span>
				{:else}
					Click to view your secret
				{/if}
			</button>
		{/if}
	</div>
</div>
