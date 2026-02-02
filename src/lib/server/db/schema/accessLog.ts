import { relations } from 'drizzle-orm';
import { index, integer, sqliteTable } from 'drizzle-orm/sqlite-core';
import { redirect } from './redirect';

export const accessLog = sqliteTable(
	'access_log',
	{
		urlId: integer('url_id')
			.notNull()
			.references(() => redirect.id, { onDelete: 'cascade' }),
		accessedAt: integer('accessed_at', { mode: 'timestamp_ms' })
			.$default(() => new Date())
			.notNull()
	},
	(table) => [index('redir_accessLog_idx').on(table.urlId)]
);

export const redirectRelation = relations(accessLog, ({ one }) => ({
	redirect: one(redirect, {
		fields: [accessLog.urlId],
		references: [redirect.id]
	})
}));
