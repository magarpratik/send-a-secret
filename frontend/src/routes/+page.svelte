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

<div class="relative min-h-screen bg-gray-900">
	<div class="fixed top-0 z-10 w-full bg-gray-900/90 py-5 text-center backdrop-blur-sm">
		<h1 class="mb-1 text-3xl font-bold text-gray-200">Send a secret!</h1>
		<p class="font-light text-gray-400">
			Share secrets with end-to-end encryption using a one-time link
		</p>
		<a
			href="https://github.com/magarpratik/send-a-secret"
			target="_blank"
			class="mt-1 inline-block text-sm text-blue-400 hover:text-blue-300">GitHub</a
		>
	</div>

	<div
		class="absolute top-1/2 left-1/2 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 transform px-4"
	>
		<div class="space-y-4">
			<label for="secret" class="sr-only">Secret message</label>
			<textarea
				id="secret"
				class="h-48 w-full resize-none rounded-lg border border-gray-600 bg-gray-800 p-4 leading-relaxed text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
				bind:value={secret}
				placeholder="Enter secret..."
				autocorrect="off"
				autocomplete="off"
				autocapitalize="off"
				spellcheck="false"
			></textarea>

			<button
				class="w-full rounded-lg bg-indigo-500 px-6 py-2 text-white shadow-sm transition-colors duration-200 hover:bg-indigo-600 hover:shadow-md disabled:cursor-not-allowed disabled:bg-gray-700 disabled:text-gray-400"
				onclick={generateLink}
				disabled={!secret}
			>
				Generate link
			</button>
		</div>

		<div class="mt-6 text-center">
			<div class="mb-2 flex items-center justify-center gap-2">
				<svg class="h-4 w-4 flex-shrink-0 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
					<path
						fill-rule="evenodd"
						d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
						clip-rule="evenodd"
					/>
				</svg>
				<h3 class="text-sm font-medium text-gray-400">How it works</h3>
			</div>
			<p class="text-xs text-gray-500">
				Your secret is encrypted end-to-end — we cannot see it. The recipient can view it once, then
				it’s permanently deleted.
			</p>
		</div>
	</div>
</div>
