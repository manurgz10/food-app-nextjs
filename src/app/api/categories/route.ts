import { NextResponse } from "next/server";
import prisma from "../db";


// Endpoint para fetch de categorias
export const GET = async () => {
  try {
    const categories = await prisma.category.findMany();
    return new NextResponse(
        JSON.stringify({
            categories,
        }),
        { status: 200 }
    )
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        error: "Algo ha ido mal al intentar obtener las categorías",
      }),
      { status: 500 }
    );
  }
};
