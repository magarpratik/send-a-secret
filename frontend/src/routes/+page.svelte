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

<div class="fixed top-0 z-10 w-full py-5 text-center">
	<h1 class="text-3xl font-bold text-gray-400">Send a secret!</h1>
	<p class="text-gray-600">Send secrets securely using a one-time-use link</p>
	<a
		href="https://github.com/magarpratik/send-a-secret"
		target="_blank"
		class="text-sm text-blue-700 hover:text-blue-800">GitHub</a
	>
</div>

<div class="flex h-screen flex-col items-center justify-center gap-2 sm:flex-row sm:gap-4">
	<textarea
		class="textarea"
		bind:value={secret}
		placeholder="Enter secret..."
		autocorrect="off"
		autocomplete="off"
		autocapitalize="off"
		spellcheck="false"
	></textarea>
	<!-- svelte-ignore event_directive_deprecated -->
	<!-- CSP-safe: avoid inline onclick -->
	<button class="btn btn-soft btn-primary" on:click={generateLink} disabled={!secret}
		>Generate link</button
	>
</div>
