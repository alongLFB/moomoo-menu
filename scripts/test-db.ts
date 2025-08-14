// D1 Database Test Script
// Run with: npx tsx scripts/test-db.ts

import dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

import { getDb } from "../src/lib/db/index";
import { categories, dishes } from "../src/lib/db/schema";
import { sql } from "drizzle-orm";

async function testDatabaseConnection() {
  console.log("🔍 Testing Cloudflare D1 database connection...\n");
  
  // Debug: Show environment variables (without sensitive data)
  console.log("Environment check:");
  console.log("- NODE_ENV:", process.env.NODE_ENV);
  console.log("- Has DATABASE_ID:", !!process.env.CLOUDFLARE_DATABASE_ID);
  console.log("- Has ACCOUNT_ID:", !!process.env.CLOUDFLARE_ACCOUNT_ID);
  console.log("- Has API_TOKEN:", !!process.env.CLOUDFLARE_API_TOKEN);
  console.log("");

  // Initialize database connection
  const db = getDb();

  try {
    // Test 1: Check if we can execute a simple query
    console.log("1. Testing basic query execution...");
    const result = await db.run(sql`SELECT 1 as test`);
    console.log("✅ Basic query successful:", result);

    // Test 2: Check if tables exist
    console.log("\n2. Checking database tables...");
    const tables = await db.run(sql`
      SELECT name FROM sqlite_master 
      WHERE type='table' AND name NOT LIKE 'sqlite_%'
    `);
    console.log("✅ Tables found:", tables);

    // Test 3: Check categories table
    console.log("\n3. Checking categories table...");
    const categoriesResult = await db.run(sql`SELECT * FROM categories LIMIT 5`);
    console.log("✅ Categories:", categoriesResult);

    // Test 4: Check dishes table
    console.log("\n4. Checking dishes table...");
    const dishesResult = await db.run(sql`SELECT * FROM dishes LIMIT 3`);
    console.log("✅ Dishes:", dishesResult);

    console.log("\n🎉 All database tests passed!");

  } catch (error) {
    console.error("❌ Database test failed:", error);
    
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      if (error.message.includes("HTTP API error")) {
        console.log("\n💡 Possible solutions:");
        console.log("1. Check your CLOUDFLARE_API_TOKEN permissions");
        console.log("2. Verify CLOUDFLARE_ACCOUNT_ID is correct");
        console.log("3. Ensure CLOUDFLARE_DATABASE_ID is correct");
        console.log("4. Make sure the database exists and is accessible");
        console.log("5. Ensure your API token has D1:edit permissions");
      }
    }
  }
}

// Run the test
testDatabaseConnection();
