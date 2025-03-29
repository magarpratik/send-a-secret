<script>
	import '../app.css';

	function showComingSoon() {
		alert('Features coming soon...');
	}
</script>

<div class="flex h-screen flex-col items-center justify-center gap-2 sm:flex-row sm:gap-4">
	<input type="text" placeholder="Enter secret..." class="input" />
	<button class="btn btn-soft btn-primary" on:click={showComingSoon}>Generate link</button>
</div>
