import { SQLocal } from 'sqlocal';
import { initSchema } from './schema';

export const db = new SQLocal({
	databasePath: 'database.sqlite3',
	reactive: true,
	onInit: (sql) => [sql`PRAGMA foreign_keys = ON`],
});

await initSchema(db);
