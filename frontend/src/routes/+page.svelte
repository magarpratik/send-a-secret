<script>
	import { onDestroy } from 'svelte';
	import '../app.css';

	let secret = $state('');

	onDestroy(() => {
		secret = '';
	});

	function showComingSoon() {
		alert('Features coming soon...');
	}

	function generateLink() {
		if (!secret) return;

		showComingSoon();

		// TODO: encrypt secret, send to backend and generate link

		secret = '';
	}
</script>

<div class="flex min-h-screen flex-col items-center bg-gray-900 px-4 py-8">
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
	</div>

	<div
		class="flex w-full max-w-lg flex-1 flex-col items-center justify-center space-y-6 pb-20 sm:pb-50"
	>
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

			<button
				onclick={generateLink}
				disabled={!secret}
				class="w-full rounded-lg bg-indigo-500 py-2 text-white shadow-sm transition-colors duration-200 hover:bg-indigo-600 disabled:cursor-not-allowed disabled:bg-gray-700 disabled:text-gray-400"
			>
				Generate link
			</button>
		</div>

		<div class="w-full">
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
				Your secret is encrypted end-to-end — not even we can read it. Once the recipient views it,
				the secret is deleted forever.
			</p>
		</div>
	</div>
</div>
