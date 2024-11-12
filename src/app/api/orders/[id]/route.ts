import { NextRequest, NextResponse } from "next/server";
import prisma from "../../db";

// CHANGE THE STATUS OF AN ORDER
export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  try {
    const body = await req.json();

    await prisma.order.update({
      where: {
        id: id,
      },
      data: { status: body },
    });
    return new NextResponse(
      JSON.stringify({ message: "Order has been updated!" }),
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
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
        status,
        userEmail,
      },
    });

    return new NextResponse(
      JSON.stringify({ message: "Order has been created!" }),
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