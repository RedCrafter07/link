<script lang="ts">
	import { page } from '$app/state';
</script>

<div class="flex min-h-screen w-full">
	<div class="m-auto rounded-xl bg-base-2 p-8 text-center">
		<h1 class="text-3xl">An unexpected error has occured :(</h1>

		<p>Error Code: {page.status}</p>
		<p>Message: {page.error?.message}</p>
	</div>
</div>
