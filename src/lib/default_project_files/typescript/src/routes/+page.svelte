<script lang="ts">
	import './global.css';
	import Counter from '$lib/Counter.svelte';
	export let data;
</script>

<h1>Hello {data.name}!</h1>

<Counter />
