<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import Avatar from '$lib/components/Avatar.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import type { ShareFn } from '$lib/share';
	import { get_theme } from '$lib/theme';
	import { error } from '$lib/toast';
	import { onMount } from 'svelte';
	import SignIn from '~icons/material-symbols/account-circle';
	import Moon from '~icons/material-symbols/dark-mode-rounded';
	import Sun from '~icons/material-symbols/light-mode';
	import SignOut from '~icons/material-symbols/logout-rounded';
	import Share from '~icons/material-symbols/share';

	const theme = get_theme(false);

	let share: ShareFn;

	onMount(async () => {
		share = (await import('$lib/share')).share;
	});

	$: ({ user, github_login, profile, REDIRECT_URI } = $page.data ?? {});
</script>

<header>
	<a href="/" title="New REPL">
		<Logo />
	</a>
	<h2>{profile?.username ?? 'nobody'} profile</h2>
	<div class="grow" />

	<button
		on:click={(e) => {
			if (e.shiftKey) {
				theme.remove_preference();
			} else {
				theme.change_preference();
			}
		}}
		title="Change theme. Shift+Click to delete preference"
	>
		{#if $theme.next === 'light'}
			<Sun />
		{:else}
			<Moon />
		{/if}
	</button>

	<button
		on:click={async () => {
			if (!profile) {
				error('There was a problem sharing this profile');
				return;
			}
			await share({
				text: 'Take a look at my SvelteLab profile',
				title: `${profile.username} - SvelteLab`,
				url: `/profile/${profile.id}`,
			});
		}}
		title="Share"
	>
		<Share />
	</button>

	{#if user}
		<a href="/profile" class="btn" title="Profile">
			<Avatar alt={`${user.name} profile`} src={`/proxy/?url=${user.avatarUrl}`} />
		</a>
		<form
			use:enhance={() => () => {
				//on logout we invalidate authed:user which reload the page
				invalidate('authed:user');
			}}
			method="POST"
			action="/?/logout"
		>
			<button title="Sign out">
				<SignOut />
			</button>
		</form>
	{:else}
		<a
			class="btn"
			href={`${github_login?.authUrl}${REDIRECT_URI}${$page.url.pathname}`}
			title="Login with GitHub"
		>
			<SignIn />
		</a>
	{/if}
</header>

<style>
	header {
		--padding-y: 0.5em;
		padding: var(--padding-y) 1em;
		display: flex;
		gap: 1em;
		background-color: var(--sk-back-2);
		position: relative;
		z-index: 2;
		align-items: center;
		--shadow-height: 0.5rem;
		--shadow-gradient: linear-gradient(
			to bottom,
			rgba(0, 0, 0, 0.1) 0%,
			rgba(0, 0, 0, 0.05) 30%,
			transparent 100%
		);
		position: sticky;
		top: 0;
	}

	header:after {
		content: '';
		position: absolute;
		width: 100%;
		height: var(--shadow-height);
		left: 0;
		bottom: calc(-1 * var(--shadow-height));
		background: var(--shadow-gradient);
	}

	h1 {
		font-size: 1.6rem;
		white-space: nowrap;
		text-overflow: ellipsis;
		max-width: 20rem;
		overflow: hidden;
	}

	.grow {
		flex-grow: 1;
	}

	a,
	button {
		gap: 1rem;
		display: flex;
		align-items: center;
		position: relative;
		padding: 0.5rem;
		color: var(--sk-text-1);
	}

	a :global(svg),
	button :global(svg) {
		font-size: 1.25em;
	}
</style>
