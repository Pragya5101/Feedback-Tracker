import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

// Set up the database connection
const dbPath = path.join(path.dirname(fileURLToPath(import.meta.url)), 'feedback.db');
const db = new Database(dbPath);

// Initialized the feedbacks table
db.exec(`
  CREATE TABLE IF NOT EXISTS feedbacks (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    date TEXT NOT NULL
  )
`);

export default db;
