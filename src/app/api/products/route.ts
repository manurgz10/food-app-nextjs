import { NextRequest, NextResponse } from "next/server";
import prisma from "../db";

// Endpoint para fetch de productos
export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("cat");
  try {
    const products = await prisma.product.findMany({
      where: {
        // si hay categoría, entonces coge los productos con categoría, sino coge los productos destacados
        ...(category ? { catSlug: category} :  {isFeatured: true}),
      }
    });
    console.log(products[0].price);
    return new NextResponse(
        JSON.stringify({
            products,
        }),
        { status: 200 }
    )
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        error: "Algo ha ido mal al intentar obtener los productos",
      }),
      { status: 500 }
    );
  }
};
