// src/main/db/client.ts
import { drizzle } from 'drizzle-orm/node-sqlite'
import { DatabaseSync } from 'node:sqlite'
import { app } from 'electron'
import { join } from 'path'
import { relations } from './relations'

const dbPath = join(app.getPath('userData'), 'chat.db')

const sqlite = new DatabaseSync(dbPath)

sqlite.exec('PRAGMA journal_mode = WAL')
sqlite.exec('PRAGMA foreign_keys = ON')

export const db = drizzle({ client: sqlite, relations })
export { sqlite }
