<script>
	import Spinner from './Spinner.svelte';

	const {
		onClick,
		loading = false,
		disabled = false,
		loadingLabel = 'Loading...',
		label = 'Click me'
	} = $props();
</script>

<button
	onclick={onClick}
	disabled={disabled || loading}
	class="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-500 py-2 text-white shadow-sm transition-colors duration-200 hover:bg-indigo-600 not-disabled:active:scale-99 disabled:cursor-not-allowed disabled:bg-gray-700 disabled:text-gray-400"
>
	{#if loading}
		<Spinner />
		<span>{loadingLabel}</span>
	{:else}
		{label}
	{/if}
</button>
