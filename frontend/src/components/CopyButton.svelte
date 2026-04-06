<script>
	const { textToCopy = '', label = 'Copy' } = $props();

	let copied = $state(false);
	let copyTimeout = $state();

	function handleCopy() {
		if (!textToCopy) return;

		navigator.clipboard.writeText(textToCopy);
		copied = true;

		if (copyTimeout) clearTimeout(copyTimeout);
		copyTimeout = setTimeout(() => {
			copied = false;
			copyTimeout = null;
		}, 2000);
	}
</script>

<button
	onclick={handleCopy}
	class="w-full rounded-lg bg-indigo-500 py-2 text-white shadow-sm transition-colors duration-200 hover:bg-indigo-600 active:scale-99"
>
	{copied ? 'Copied!' : label}
</button>
