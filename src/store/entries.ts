import { db } from './db';

export type Entry = {
	id: number;
	dateCreated: string;
	dateUpdated: string;
	someTextField: string;
};

export async function listEntries(): Promise<Entry[]> {
	const query = `
    SELECT *
    FROM entries
    ORDER BY date_created;`;

	const rows = await db.any(query);
	return rows.map(parseRow);
}

export async function createEntry(entry: Pick<Entry, 'someTextField'>): Promise<Entry> {
	const query = `
    INSERT INTO entries (some_text_field) 
    VALUES ($(someTextField))
    RETURNING *;`;

	const [row] = await db.any(query, entry);
	return parseRow(row);
}

export async function deleteEntry(id: number) {
	const query = `
      DELETE FROM entries 
      WHERE id=$(id);`;

	await db.none(query, { id });
}

function parseRow(row: any): Entry {
	return {
		id: row.id,
		dateCreated: row.date_created,
		dateUpdated: row.date_updated,
		someTextField: row.some_text_field
	};
}
