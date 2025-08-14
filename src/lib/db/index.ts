import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

// Type for D1 database
declare global {
  var DB: D1Database;
}

let db: ReturnType<typeof drizzle>;

if (process.env.NODE_ENV === "production") {
  // In production, use the D1 binding (for Cloudflare Workers/Pages)
  db = drizzle(globalThis.DB, { schema });
} else {
  // In development, create a mock D1 database or use a local SQLite
  // For now, we'll create a simple mock that matches the D1 interface
  const mockDB = {
    prepare: (query: string) => ({
      bind: (...params: any[]) => ({
        all: () => Promise.resolve({ results: [], meta: {} }),
        first: () => Promise.resolve(null),
        run: () => Promise.resolve({ success: true, meta: {} }),
      }),
      all: () => Promise.resolve({ results: [], meta: {} }),
      first: () => Promise.resolve(null),
      run: () => Promise.resolve({ success: true, meta: {} }),
    }),
  };
  db = drizzle(mockDB as any, { schema });
}

export { db };
