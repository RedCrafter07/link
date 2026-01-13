<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import IconRouteSquare2 from '~icons/tabler/route-square-2';
	const { data } = $props();
</script>

<div class="flex flex-col gap-8">
	<h1 class="text-3xl font-semibold tracking-wide">
		Welcome to Link, {data.user.name}!
	</h1>

	<div class="grid w-full grid-cols-1 lg:grid-cols-2">
		<button
			class="relative top-0 flex flex-row items-center gap-4 rounded-xl border border-transparent bg-base-2 p-4 text-left transition-all duration-150 hover:border-overlay/50 active:top-1 active:scale-[99%] active:drop-shadow-lg"
			onclick={() => {
				goto(resolve('/dashboard/redirects'));
			}}
		>
			<div class="text-2xl">
				<IconRouteSquare2 />
			</div>
			<div>
				<h3 class="text-xl">Manage Redirects</h3>
				<p>
					{data.redirectCount.toString()}
					{data.redirectCount === 1 ? 'redirect' : 'redirects'} found with {data.redirectVisitCount.toString()}
					{data.redirectVisitCount === 1 ? 'visit' : 'visits'} total
				</p>
			</div>
		</button>
	</div>
</div>
