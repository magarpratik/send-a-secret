<script>
	import '../app.css';

	function showComingSoon() {
		alert('Features coming soon...');
	}
</script>

<div class="flex h-screen flex-col items-center justify-center gap-2 sm:flex-row sm:gap-4">
	<textarea class="textarea" placeholder="Enter secret..."></textarea>
	<button class="btn btn-soft btn-primary" on:click={showComingSoon}>Generate link</button>
</div>
