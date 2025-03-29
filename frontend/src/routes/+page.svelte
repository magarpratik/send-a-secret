<script>
	import '../app.css';

	function showComingSoon() {
		alert('Features coming soon...');
	}
</script>

<div class="fixed top-0 z-10 w-full py-20 text-center">
	<h1 class="text-4xl font-bold text-gray-400">Send a secret!</h1>
	<p class="text-gray-600">Send secrets securely using a one-time-use link</p>
</div>

<div class="flex h-screen flex-col items-center justify-center gap-2 sm:flex-row sm:gap-4">
	<textarea class="textarea" placeholder="Enter secret..."></textarea>
	<button class="btn btn-soft btn-primary" on:click={showComingSoon}>Generate link</button>
</div>
