import { NextRequest, NextResponse } from "next/server";

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

    // Build SQL query with conditions
    let sql = "SELECT * FROM dishes WHERE is_available = 1";
    const params: any[] = [];

    // Search query
    if (q) {
      sql += " AND (name_zh LIKE ? OR name_en LIKE ? OR description_zh LIKE ? OR description_en LIKE ?)";
      const searchPattern = `%${q}%`;
      params.push(searchPattern, searchPattern, searchPattern, searchPattern);
    }

    // Category filter
    if (cat && cat !== "all") {
      sql += " AND category_id = ?";
      params.push(parseInt(cat));
    }

    // Price range filters
    if (priceMin) {
      sql += " AND price >= ?";
      params.push(parseFloat(priceMin));
    }
    if (priceMax) {
      sql += " AND price <= ?";
      params.push(parseFloat(priceMax));
    }

    // Add ordering and pagination
    sql += " ORDER BY sort_order ASC, id ASC LIMIT ? OFFSET ?";
    params.push(limit, offset);

    // Execute the main query
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/d1/database/${process.env.CLOUDFLARE_DATABASE_ID}/query`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          sql: sql,
          params: params
        }),
      }
    );
    
    if (!response.ok) {
      throw new Error(`D1 HTTP API error: ${response.status} ${response.statusText}`);
    }
    
    const result = await response.json();
    const dishesRaw = (result as any).result?.[0]?.results || [];

    // Convert snake_case to camelCase for frontend compatibility
    const dishes = dishesRaw.map((dish: any) => ({
      id: dish.id,
      categoryId: dish.category_id,
      nameZh: dish.name_zh,
      nameEn: dish.name_en,
      descriptionZh: dish.description_zh,
      descriptionEn: dish.description_en,
      price: dish.price,
      imageThumbnail: dish.image_thumbnail,
      imageFull: dish.image_full,
      ingredientsZh: dish.ingredients_zh,
      ingredientsEn: dish.ingredients_en,
      allergensZh: dish.allergens_zh,
      allergensEn: dish.allergens_en,
      tags: dish.tags,
      isFeatured: dish.is_featured,
      isAvailable: dish.is_available,
      prepTime: dish.prep_time,
      sortOrder: dish.sort_order,
      createdAt: dish.created_at,
    }));

    // Get total count for pagination
    let countSql = "SELECT COUNT(*) as count FROM dishes WHERE is_available = 1";
    const countParams: any[] = [];

    // Apply same filters for count
    if (q) {
      countSql += " AND (name_zh LIKE ? OR name_en LIKE ? OR description_zh LIKE ? OR description_en LIKE ?)";
      const searchPattern = `%${q}%`;
      countParams.push(searchPattern, searchPattern, searchPattern, searchPattern);
    }

    if (cat && cat !== "all") {
      countSql += " AND category_id = ?";
      countParams.push(parseInt(cat));
    }

    if (priceMin) {
      countSql += " AND price >= ?";
      countParams.push(parseFloat(priceMin));
    }
    if (priceMax) {
      countSql += " AND price <= ?";
      countParams.push(parseFloat(priceMax));
    }

    const countResponse = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/d1/database/${process.env.CLOUDFLARE_DATABASE_ID}/query`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          sql: countSql,
          params: countParams
        }),
      }
    );

    const countResult = await countResponse.json();
    const total = (countResult as any).result?.[0]?.results?.[0]?.count || 0;

    return NextResponse.json({
      success: true,
      data: dishes,
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
