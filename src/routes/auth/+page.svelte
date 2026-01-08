<script lang="ts">
	import { authClient } from '$lib/client/auth';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';

	let username = $state('');
	let password = $state('');

	let error = $state<string | undefined>(undefined);

	async function login(e: SubmitEvent) {
		e.preventDefault();

		const authResult = await authClient.signIn.username({
			username,
			password,
			rememberMe: true
		});

		if (authResult.error) {
			error = authResult.error.message;
			return;
		}

		goto(resolve('/dashboard'));
	}
</script>

<div class="flex min-h-screen w-full bg-base-3">
	<div class="m-auto flex flex-col gap-8 rounded-xl border border-overlay/20 bg-base-1 p-4">
		<div class="flex flex-col gap-4 text-center">
			<h1 class="text-3xl">Welcome back to Link!</h1>
			<p class="text-lg">Please log in to manage your redirects and pages.</p>
		</div>

		{#if error}
			<div class="flex flex-row gap-4 rounded-lg bg-destructive p-4 text-destructive-content">
				<div>IconSoon</div>
				<div class="flex-1">
					{error}
				</div>
			</div>
		{/if}

		<form onsubmit={login} class="flex flex-col gap-4">
			<input
				class="rounded-lg bg-base-2 p-2 focus:outline-none"
				placeholder="jdoe"
				type="text"
				autocomplete="username"
				value={username}
				onchange={(e) => (username = e.currentTarget.value)}
				required
			/>
			<input
				class="rounded-lg bg-base-2 p-2 focus:outline-none"
				placeholder="VerySecurePassword"
				type="password"
				autocomplete="current-password"
				value={password}
				onchange={(e) => (password = e.currentTarget.value)}
				required
			/>

			<button
				class="trnasition-all rounded-lg border-2 border-success p-2 font-bold tracking-wide text-success uppercase duration-150 hover:bg-success hover:text-success-content focus:outline-none active:scale-95"
				>Log in!</button
			>
		</form>
	</div>
</div>
