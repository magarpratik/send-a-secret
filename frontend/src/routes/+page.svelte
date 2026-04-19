<script>
	import { onMount, onDestroy } from 'svelte';
	import '../app.css';
	import { storeSecret, encrypt, generateEncryptionKey, toBase64, getSecretsSent } from '$lib';
	import CopyButton from '../components/CopyButton.svelte';
	import ActionButton from '../components/ActionButton.svelte';

	let secret = $state('');
	let link = $state('');
	let totalSecretsSent = $state(0);

	let generateLinkLoading = $state(false);
	let errorMessage = $state('');

	onMount(async () => {
		try {
			const { data } = await getSecretsSent();
			totalSecretsSent = data.total;
		} catch {
			// Ignore errors for now
		}
	});

	onDestroy(() => {
		secret = '';
	});

	async function generateLink() {
		if (!secret) return;

		generateLinkLoading = true;

		try {
			const keyBytes = generateEncryptionKey();
			const { ciphertext, iv } = await encrypt(secret, keyBytes);

			const encodedKey = toBase64(keyBytes);
			const encodedCiphertext = toBase64(ciphertext);
			const encodedIV = toBase64(iv);

			const { data } = await storeSecret({ ciphertext: encodedCiphertext, iv: encodedIV });
			link = `${window.location.origin}/s/${data.secretId}#${encodedKey}`;
		} catch {
			errorMessage = 'Failed to generate link. Please try again.';
		} finally {
			generateLinkLoading = false;
			secret = '';
		}
	}
</script>

<div class="flex min-h-[100dvh] flex-col items-center bg-gray-900 px-4 py-4 sm:py-8">
	<div class="mb-4 text-center">
		<h1 class="text-2xl font-bold text-gray-200 sm:text-3xl">Send a secret!</h1>
		<p class="text-sm font-light text-gray-400 sm:text-base">
			Share secrets securely using self-destructing links
		</p>
		<a
			href="https://github.com/magarpratik/send-a-secret"
			target="_blank"
			class="text-xs text-blue-400 hover:text-blue-300">GitHub</a
		>
		<div
			class="rounded border border-yellow-500 bg-yellow-600/20 p-2 text-xs text-yellow-200 sm:text-sm"
		>
			⚠️ This app is under active development. Secrets may not be fully secure. Use at your own
			risk.
		</div>
	</div>

	<div
		class="flex w-full max-w-lg flex-grow flex-col items-center justify-center space-y-0 pb-10 sm:space-y-5 sm:pb-40"
	>
		{#if !link}
			<div class="w-full space-y-4">
				<textarea
					bind:value={secret}
					placeholder="Enter secret..."
					class="h-36 w-full resize-none rounded-lg border border-gray-600 bg-gray-800 p-4 leading-relaxed text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none sm:h-48"
					autocorrect="off"
					autocomplete="off"
					autocapitalize="off"
					spellcheck="false"
				></textarea>
				<ActionButton
					onClick={generateLink}
					loading={generateLinkLoading}
					disabled={!secret}
					loadingLabel="Generating link..."
					label="Generate link"
				/>
				<p class="text-sm text-red-400">
					{errorMessage || '\u00A0'}
				</p>
			</div>
			<div class="w-full pl-2">
				<div class="mb-2 flex items-center gap-2">
					<svg class="h-4 w-4 flex-shrink-0 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
						<path
							fill-rule="evenodd"
							d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
							clip-rule="evenodd"
						/>
					</svg>
					<h3 class="text-sm font-medium text-gray-400">How it works</h3>
				</div>
				<ol class="mb-2 list-decimal pl-6 text-xs text-gray-500">
					<li>Enter your secret</li>
					<li>Generate a link</li>
					<li>Share the link with your recipient</li>
				</ol>
				<p class="text-xs text-gray-500">
					Your secret is encrypted end-to-end — not even we can read it. Once the recipient views
					it, the secret is deleted forever.
				</p>
			</div>
		{:else}
			<div class="w-full space-y-4">
				<input
					class="w-full rounded-lg border border-gray-600 bg-gray-800 p-4 text-center text-white"
					readonly
					value={link}
					title={link}
				/>
				<CopyButton textToCopy={link} label="Copy link" />
				<button
					onclick={() => {
						link = '';
						secret = '';
						errorMessage = '';
					}}
					class="mt-2 px-3 text-sm text-indigo-300 duration-200 hover:text-indigo-200"
				>
					Send another secret
				</button>
			</div>
		{/if}
	</div>

	<div class="mt-auto w-full border-t border-gray-800 pt-3 text-center text-gray-500 sm:pt-6">
		<strong class="text-lg text-gray-300">{totalSecretsSent}</strong>
		<p class="text-xs">secrets sent</p>
	</div>
</div>
