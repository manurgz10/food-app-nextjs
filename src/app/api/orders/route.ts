import { NextRequest, NextResponse } from "next/server";
import prisma from "../db";
import { getAuthSession } from "@/utils/auth";

// Endpoint para fetch de productos
export const GET = async (req: NextRequest) => {
  const session = await getAuthSession();

  if (session) {
    try {
      if (session.user.isAdmin) {
        const orders = await prisma.order.findMany();
        return new NextResponse(JSON.stringify(orders), { status: 200 });
      }
      const orders = await prisma.order.findMany({
        where: {
          userEmail: session.user.email!,
        },
      });
      return new NextResponse(JSON.stringify(orders), { status: 200 });
    } catch (err) {
      console.log(err);
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong!" }),
        { status: 500 }
      );
    }
  } else {
    return new NextResponse(
      JSON.stringify({ message: "You are not authenticated!" }),
      { status: 401 }
    );
  }
};

export const POST = async (req: NextRequest) => {
    const body = await req.json();
    const { products, price, status, userEmail } = body;
  
    try {
      const order = await prisma.order.create({
        data: {
          products,
          price,
          status: status || 'pending', // Default status if not provided
          userEmail,
        },
      });
  
      return new NextResponse(
        JSON.stringify({ message: "Order has been created!", order }),
        { status: 201 }
      );
    } catch (err) {
      console.log(err);
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong!" }),
        { status: 500 }
      );
    }
  };