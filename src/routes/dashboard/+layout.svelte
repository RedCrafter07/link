<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { authClient } from '$lib/client/auth';
	import IconLogout from '~icons/tabler/logout';

	const { children } = $props();
</script>

<div class="flex flex-col">
	<div class="flex h-16 w-full flex-row items-center bg-base-2 p-2">
		<button
			onclick={() => {
				goto(resolve('/dashboard'));
			}}
			class="rounded-xl p-2 text-2xl tracking-wide transition-all duration-150 hover:bg-overlay/50 active:scale-95"
		>
			Link
		</button>
		<button
			onclick={() => {
				authClient.signOut(
					{},
					{
						onSuccess: () => {
							goto(resolve('/auth'));
						}
					}
				);
			}}
			class="ml-auto flex aspect-square h-full items-center justify-center rounded-xl bg-base-3 p-2 text-xl opacity-80 transition-all duration-150 hover:opacity-100 active:scale-95"
		>
			<IconLogout />
		</button>
	</div>
	<div class="relative container mx-auto p-4">
		{@render children()}
	</div>
</div>
