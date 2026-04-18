<script>
	import { onMount, onDestroy } from 'svelte';
	import { page } from '$app/state';
	import { checkSecret, getSecret } from '$lib';
	import Spinner from '../../../components/Spinner.svelte';
	import CopyButton from '../../../components/CopyButton.svelte';
	import ActionButton from '../../../components/ActionButton.svelte';

	let checkSecretLoading = $state(true);
	let getSecretLoading = $state(false);
	let secretExists = $state(false);

	let secret = $state('');
	let errorMessage = $state('');

	onMount(async () => {
		await checkSecretExists();
	});

	onDestroy(() => {
		secret = '';
	});

	async function checkSecretExists() {
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
	}

	async function retrieveSecret() {
		const secretId = page.params.id;
		if (!secretId) return;

		const keyBase64 = window.location.hash.slice(1);
		if (!keyBase64) {
			errorMessage = 'Missing decryption key.';
			return;
		}
		history.replaceState({}, '', window.location.pathname);

		getSecretLoading = true;

		try {
			// const {
			// 	data: { ciphertext, iv }
			// } = await getSecret({ secretId });

			// const keyBytes = fromBase64(keyBase64);
			// const ivBytes = fromBase64(iv);
			// const ciphertextBytes = fromBase64(ciphertext);

			// secret = await decrypt(ciphertextBytes, keyBytes, ivBytes);

			const { data } = await getSecret({ secretId });
			secret = data.ciphertext;
		} catch {
			errorMessage = 'Unable to retrieve your secret. Please try again later.';
		} finally {
			getSecretLoading = false;
		}
	}
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
			<div class="flex items-center text-gray-400">
				<Spinner />
			</div>
		{:else if errorMessage}
			<p class="text-red-400">{errorMessage}</p>
		{:else if !secretExists}
			<p class="text-red-400">This secret does not exist or has already been viewed.</p>
		{:else if secret}
			<div class="w-full space-y-4">
				<textarea
					readonly
					class="h-36 w-full resize-none rounded-lg border border-gray-600 bg-gray-800 p-4 text-white sm:h-48"
					value={secret}
				></textarea>
				<CopyButton textToCopy={secret} label="Copy secret" />
			</div>
		{:else}
			<ActionButton
				onClick={retrieveSecret}
				loading={getSecretLoading}
				loadingLabel="Loading secret..."
				label="Click to view your secret"
			/>
		{/if}
	</div>
</div>
