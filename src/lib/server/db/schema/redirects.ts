import { relations } from 'drizzle-orm';
import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { user } from './auth';

export const redirects = sqliteTable(
	'redirects',
	{
		from: text().unique().notNull(),
		to: text().notNull(),
		addedBy: text('added_by').notNull(),
		createdAt: integer('created_at', { mode: 'timestamp_ms' })
			.notNull()
			.$default(() => new Date()),
		updatedAt: integer('updated_at', { mode: 'timestamp_ms' })
			.notNull()
			.$default(() => new Date())
			.$onUpdate(() => new Date()),
		accessCount: integer('access_count').default(0).notNull()
	},
	(table) => [index('url_idx').on(table.from)]
);

export const redirectRelations = relations(redirects, ({ one }) => ({
	user: one(user, {
		references: [user.id],
		fields: [redirects.addedBy]
	})
}));
