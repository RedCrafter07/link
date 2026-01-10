<script lang="ts">
	import { enhance } from '$app/forms';
	import { pushState } from '$app/navigation';
	import { page } from '$app/state';
	import { fade } from 'svelte/transition';
	import IconArrowRight from '~icons/tabler/arrow-right';
	import IconPlus from '~icons/tabler/plus';
	import IconTrash from '~icons/tabler/trash';
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime';

	dayjs.extend(relativeTime);

	const { data } = $props();

	function showModal() {
		pushState('', {
			showModal: true
		});
	}
</script>

{#if page.state.showModal}
	<div
		class="fixed top-0 left-0 h-full w-full bg-base-1/20 backdrop-blur-lg"
		in:fade={{
			duration: 150
		}}
		out:fade={{
			duration: 150
		}}
	>
		<div class="relative flex h-full w-full">
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="absolute top-0 z-0 h-full w-full"
				onclick={() => {
					history.back();
				}}
			></div>
			<div class="z-10 m-auto flex flex-col gap-8 rounded-xl bg-base-2 p-8">
				<h1 class="text-3xl">Create a new Redirect</h1>
				<form method="POST" action="?/new-redirect" use:enhance class="flex flex-col gap-4">
					<div class="flex flex-row items-center gap-4">
						<input
							name="from"
							class="rounded-lg bg-base-3 p-2 focus:outline-none"
							placeholder="/mail"
							type="text"
							autocomplete="off"
							required
						/>
						<div>
							<IconArrowRight />
						</div>
						<input
							name="to"
							class="rounded-lg bg-base-3 p-2 focus:outline-none"
							placeholder="https://mail.example.com"
							type="text"
							autocomplete="off"
							required
						/>
					</div>

					<button
						class="flex w-full flex-row items-center justify-center gap-2 rounded-xl border-2 border-success p-2 font-semibold tracking-wider text-success uppercase transition-all duration-150 hover:bg-success hover:text-success-content active:scale-95"
					>
						<IconPlus />
						Create Redirect
					</button>
				</form>
			</div>
		</div>
	</div>
{/if}

<div class="flex flex-col overflow-hidden rounded-xl bg-base-2">
	<div class="flex flex-row items-center justify-between gap-2 bg-base-3 p-4">
		<p class="text-xl">Redirects</p>

		<button
			onclick={showModal}
			class="flex flex-row items-center justify-center gap-2 rounded-xl border-2 border-success p-2 font-semibold tracking-wider text-success uppercase transition-all duration-150 hover:bg-success hover:text-success-content active:scale-95"
		>
			<IconPlus />
		</button>
	</div>
	{#each data.redirects as redirect, i (redirect.from)}
		<div
			class="flex flex-row items-center gap-4 p-4"
			class:bg-base-2={i % 2 === 0}
			class:bg-base-1={i % 2 === 1}
		>
			<div class="flex flex-row items-center gap-2 font-mono">
				<p class="rounded-xl bg-base-3 p-1">{redirect.from}</p>
				<IconArrowRight />
				<p class="rounded-xl bg-base-3 p-1">{redirect.to}</p>
			</div>
			<p>by {redirect.user.displayUsername ?? redirect.user.username ?? redirect.user.name}</p>
			<p title={dayjs(redirect.createdAt).format('YYYY-MM-DD HH:mm:ss')}>
				Created {dayjs(redirect.createdAt).fromNow()}
			</p>
			<p title={dayjs(redirect.updatedAt).format('YYYY-MM-DD HH:mm:ss')}>
				Updated {dayjs(redirect.updatedAt).fromNow()}
			</p>
			<p>
				Accessed {redirect.logs.length}
				{redirect.logs.length === 1 ? 'time' : 'times'}
			</p>

			<form action="?/delete-redirect" class="ml-auto" method="POST">
				<input type="text" class="hidden" value={redirect.from} name="from" readonly />

				<button
					class="flex flex-row items-center justify-center gap-2 rounded-xl border-2 border-destructive p-2 font-semibold tracking-wider text-destructive uppercase transition-all duration-150 hover:bg-destructive hover:text-destructive-content active:scale-95"
				>
					<IconTrash />
				</button>
			</form>
		</div>
	{:else}
		<p class="p-4">No redirects yet. Why don't you create one?</p>
	{/each}
</div>
