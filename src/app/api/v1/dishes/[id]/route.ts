import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { dishes, categories } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const runtime = "edge";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const dishId = parseInt(params.id);

    if (isNaN(dishId)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid dish ID",
        },
        { status: 400 }
      );
    }

    const result = await db
      .select({
        dish: dishes,
        category: categories,
      })
      .from(dishes)
      .leftJoin(categories, eq(dishes.categoryId, categories.id))
      .where(eq(dishes.id, dishId))
      .limit(1);

    if (result.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Dish not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        ...result[0].dish,
        category: result[0].category,
      },
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
