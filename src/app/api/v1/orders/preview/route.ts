import { NextRequest, NextResponse } from "next/server";
import type { CartItem } from "@/types";

export const runtime = "edge";

interface OrderPreviewRequest {
  items: CartItem[];
  locale: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: OrderPreviewRequest = await request.json();
    const { items, locale } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "No items provided",
        },
        { status: 400 }
      );
    }

    const itemsList = items
      .map((item) => {
        const name = locale === "zh" ? item.nameZh : item.nameEn;
        return `${item.quantity}× ${name} ￠ ${(
          item.price * item.quantity
        ).toFixed(2)} AED`;
      })
      .join("\n");

    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const summary = `Moo Moo Moo ${locale === "zh" ? "订单" : "Order"}
----------------
${itemsList}
----------------
${locale === "zh" ? "合计" : "Total"}: ${total.toFixed(2)} AED
${locale === "zh" ? "联系人" : "Contact"}: ${
      locale === "zh" ? "姜老板" : "Manager Jiang"
    } (+971 056 496 6886)
${
  locale === "zh" ? "地址" : "Address"
}: Electra Abdullah Bin Humaid Al Rumaithi St - Al Danah - Zone 1 - Abu Dhabi`;

    return NextResponse.json({
      success: true,
      data: {
        summary,
        items,
        total: total.toFixed(2),
        restaurant: {
          name: "Moo Moo Moo Restaurant",
          phone: "+971 056 496 6886",
          address:
            "Electra Abdullah Bin Humaid Al Rumaithi St - Al Danah - Zone 1 - Abu Dhabi",
        },
      },
    });
  } catch (error) {
    console.error("Error generating order preview:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to generate order preview",
      },
      { status: 500 }
    );
  }
}
