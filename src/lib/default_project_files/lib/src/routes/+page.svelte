<script>
	import Counter from '$lib/Counter.svelte';
	import './global.css';
	export let data;
</script>

<h1>
	Hello {data.name}!
</h1>

<p>Head over to the lib folder to start crafting!</p>

<Counter />
