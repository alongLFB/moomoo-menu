import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  try {
    // Direct HTTP API call to D1
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/d1/database/${process.env.CLOUDFLARE_DATABASE_ID}/query`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          sql: "SELECT * FROM categories ORDER BY sort_order ASC, id ASC" 
        }),
      }
    );
    
    if (!response.ok) {
      throw new Error(`D1 HTTP API error: ${response.status} ${response.statusText}`);
    }
    
    const result = await response.json();
    const data = (result as any).result?.[0]?.results || [];

    return NextResponse.json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch categories",
      },
      { status: 500 }
    );
  }
}
