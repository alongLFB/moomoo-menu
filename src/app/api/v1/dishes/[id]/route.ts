import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const dishId = parseInt(id);

    if (isNaN(dishId)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid dish ID",
        },
        { status: 400 }
      );
    }

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
          sql: "SELECT d.*, c.name_zh as category_name_zh, c.name_en as category_name_en FROM dishes d LEFT JOIN categories c ON d.category_id = c.id WHERE d.id = ?",
          params: [dishId]
        }),
      }
    );
    
    if (!response.ok) {
      throw new Error(`D1 HTTP API error: ${response.status} ${response.statusText}`);
    }
    
    const result = await response.json();
    const dishesRaw = (result as any).result?.[0]?.results || [];

    if (dishesRaw.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Dish not found",
        },
        { status: 404 }
      );
    }

    // Convert snake_case to camelCase for frontend compatibility
    const dish = dishesRaw[0];
    const convertedDish = {
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
      categoryNameZh: dish.category_name_zh,
      categoryNameEn: dish.category_name_en,
    };

    return NextResponse.json({
      success: true,
      data: convertedDish,
    });
  } catch (error) {
    console.error("Error fetching dish:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch dish",
      },
      { status: 500 }
    );
  }
}
