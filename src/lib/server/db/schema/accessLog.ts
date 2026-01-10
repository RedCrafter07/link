import { relations } from 'drizzle-orm';
import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { redirect } from './redirect';

export const accessLog = sqliteTable(
	'access_log',
	{
		url: text().notNull(),
		accessedAt: integer('accessed_at', { mode: 'timestamp_ms' })
			.$default(() => new Date())
			.notNull()
	},
	(table) => [index('redir_accessLog_idx').on(table.url)]
);

export const redirectRelation = relations(accessLog, ({ one }) => ({
	redirect: one(redirect, {
		fields: [accessLog.url],
		references: [redirect.from]
	})
}));
