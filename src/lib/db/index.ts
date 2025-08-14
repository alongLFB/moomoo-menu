import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

// Type for D1 database
declare global {
  // eslint-disable-next-line no-var
  var DB: D1Database;
}

let dbInstance: ReturnType<typeof drizzle> | null = null;

function initializeDatabase() {
  if (dbInstance) return dbInstance;

  // Check if we have Cloudflare credentials for D1 HTTP API
  const hasD1Credentials = 
    process.env.CLOUDFLARE_ACCOUNT_ID && 
    process.env.CLOUDFLARE_DATABASE_ID && 
    process.env.CLOUDFLARE_API_TOKEN;

  if (hasD1Credentials) {
    console.log("✅ Using D1 HTTP API with credentials");
    
    // Create a simple D1-compatible client using fetch
    const d1Client = {
      prepare: (query: string) => {
        return {
          bind: (...params: any[]) => {
            // Simple parameter binding - replace ? with values
            let boundQuery = query;
            params.forEach((param) => {
              const value = typeof param === 'string' ? `'${param.replace(/'/g, "''")}'` : String(param);
              boundQuery = boundQuery.replace('?', value);
            });
            
            return {
              async all() {
                return await executeQuery(boundQuery);
              },
              async first() {
                const result = await executeQuery(boundQuery);
                return result.results?.[0] || null;
              },
              async run() {
                return await executeQuery(boundQuery);
              }
            };
          },
          async all() {
            return await executeQuery(query);
          },
          async first() {
            const result = await executeQuery(query);
            return result.results?.[0] || null;
          },
          async run() {
            return await executeQuery(query);
          }
        };
      }
    };

    async function executeQuery(sql: string) {
      const response = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/d1/database/${process.env.CLOUDFLARE_DATABASE_ID}/query`,
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sql }),
        }
      );
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`D1 HTTP API error: ${response.status} ${response.statusText} - ${errorText}`);
      }
      
      const result = await response.json();
      return (result as any).result?.[0] || { results: [], meta: {} };
    }
    
    dbInstance = drizzle(d1Client as any, { schema });
  } else {
    // Fallback to mock database for development without credentials
    console.warn("⚠️  No D1 credentials found, using mock database");
    const mockDB = {
      prepare: (_query: string) => ({
        bind: (..._params: any[]) => ({
          all: () => Promise.resolve([]),
          first: () => Promise.resolve(null),
          run: () => Promise.resolve({ success: true, meta: {} }),
        }),
        all: () => Promise.resolve([]),
        first: () => Promise.resolve(null),
        run: () => Promise.resolve({ success: true, meta: {} }),
      }),
    };
    dbInstance = drizzle(mockDB as any, { schema });
  }

  return dbInstance;
}

// Export both the getter function and direct db access
export const getDb = () => initializeDatabase();
export const db = getDb();
