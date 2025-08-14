import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { dishes, categories } from "@/lib/db/schema";
import { asc, eq, like, and, or, gte, lte } from "drizzle-orm";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q");
    const cat = searchParams.get("cat");
    const priceMin = searchParams.get("priceMin");
    const priceMax = searchParams.get("priceMax");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const offset = (page - 1) * limit;

    // Build where conditions
    const conditions = [];

    // Only show available dishes
    conditions.push(eq(dishes.isAvailable, 1));

    // Search query
    if (q) {
      conditions.push(
        or(
          like(dishes.nameZh, `%${q}%`),
          like(dishes.nameEn, `%${q}%`),
          like(dishes.descriptionZh, `%${q}%`),
          like(dishes.descriptionEn, `%${q}%`)
        )
      );
    }

    // Category filter
    if (cat && cat !== "all") {
      conditions.push(eq(dishes.categoryId, parseInt(cat)));
    }

    // Price range filters
    if (priceMin) {
      conditions.push(gte(dishes.price, parseFloat(priceMin)));
    }
    if (priceMax) {
      conditions.push(lte(dishes.price, parseFloat(priceMax)));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    // Get dishes with category information
    const result = await db
      .select({
        dish: dishes,
        category: categories,
      })
      .from(dishes)
      .leftJoin(categories, eq(dishes.categoryId, categories.id))
      .where(whereClause)
      .orderBy(asc(dishes.sortOrder), asc(dishes.id))
      .limit(limit)
      .offset(offset);

    // Get total count for pagination
    const totalResult = await db
      .select({ count: dishes.id })
      .from(dishes)
      .where(whereClause);

    const total = totalResult.length;

    return NextResponse.json({
      success: true,
      data: result.map((row) => ({
        ...row.dish,
        category: row.category,
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching dishes:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch dishes",
      },
      { status: 500 }
    );
  }
}
