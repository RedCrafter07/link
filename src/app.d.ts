// See https://svelte.dev/docs/kit/types#app.d.ts

import type { Session } from 'better-auth';
import type { UserWithRole } from 'better-auth/plugins';
import 'unplugin-icons/types/svelte';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			session: Session;
			user: UserWithRole;
		}
		// interface PageData {}
		interface PageState {
			showModal: boolean;
		}
		// interface Platform {}
	}
}

export {};
