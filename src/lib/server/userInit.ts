import chalk from 'chalk';
import { auth } from '$lib/server/auth';
import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';
import { migrate } from 'drizzle-orm/libsql/migrator';

export async function userInit() {
	console.log(chalk.green.bold('Welcome to RedCrafter07 Link!'));
	try {
		await db.select().from(user);
	} catch {
		console.log(
			chalk.white("It seems like this is your first time starting Link. Let's get this all set up!")
		);

		console.log(chalk.bold.bgWhite('>'), chalk.blue('Migrating database...'));

		await migrate(db, {
			migrationsFolder: './drizzle'
		});

		console.log(chalk.bold.bgWhite('>'), chalk.blue('Creating admin user...'));

		const ctx = await auth.$context;
		const authAdapter = ctx.internalAdapter;
		const password = ctx.password;

		const user = await authAdapter.createUser({
			email: 'admin@example.com',
			name: 'Administrator',
			role: 'admin',
			username: 'admin',
			createdAt: new Date(),
			updatedAt: new Date()
		});
		const userPass = Math.random().toString(36).slice(2);

		await authAdapter.linkAccount({
			accountId: user.id,
			providerId: 'credential',
			userId: user.id,
			password: await password.hash(userPass)
		});

		console.log(chalk.bold.bgWhite('>'), chalk.green('Done. Welcome to Link!'));

		console.log('');
		console.log(chalk.bgRed('USER CREDENTIALS:'));
		console.log('Username: admin');
		console.log(`Password: ${userPass}`);
		console.log('');
		console.log(chalk.red.bold('Please change these credentials as soon as possible.'));
	}
}
