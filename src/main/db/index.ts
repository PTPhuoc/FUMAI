// src/main/db/index.ts
import { migrate } from 'drizzle-orm/node-sqlite/migrator'
import { app } from 'electron'
import { join } from 'path'
import { db, sqlite } from './client'

export function initDatabase(): void {
  const migrationsFolder = app.isPackaged
    ? join(process.resourcesPath, 'drizzle')
    : join(app.getAppPath(), 'drizzle')

  migrate(db, { migrationsFolder })
  console.log('[DB] Migrations applied from:', migrationsFolder)
}

export { db, sqlite }
export * from './schema'
