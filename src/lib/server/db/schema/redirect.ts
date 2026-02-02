import { relations } from 'drizzle-orm';
import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { user } from './auth';
import { accessLog } from './accessLog';

export const redirect = sqliteTable(
	'redirect',
	{
		id: integer().primaryKey().notNull(),
		from: text().notNull(),
		to: text().notNull(),
		addedBy: text('added_by').notNull(),
		createdAt: integer('created_at', { mode: 'timestamp_ms' })
			.notNull()
			.$default(() => new Date()),
		updatedAt: integer('updated_at', { mode: 'timestamp_ms' })
			.notNull()
			.$default(() => new Date())
			.$onUpdate(() => new Date())
	},
	(table) => [index('url_idx').on(table.from)]
);

export const redirectRelations = relations(redirect, ({ one, many }) => ({
	user: one(user, {
		references: [user.id],
		fields: [redirect.addedBy]
	}),
	logs: many(accessLog)
}));
