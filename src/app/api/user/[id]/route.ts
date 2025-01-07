import errorHandler from "@/handlers/errorHandler";
import { NextResponse } from "next/server";
import { prisma } from "../../../../../prisma";
import asyncHandler from "@/handlers/asyncHandler";

export async function GET(req: Request, context: { params: { id: string } }) {
  try {
    const { id } = await context.params;
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
      select: {
        chunks: true,
      },
    });
    if (user) return NextResponse.json(asyncHandler(200, user));
    else return NextResponse.json(errorHandler(404, "User not found"));
  } catch (error: any) {
    return NextResponse.json(errorHandler(505, error));
  }
}

export async function DELETE(req: Request, context: any) {
  try {
    const { id } = await context.params;
    await prisma.user.delete({
      where: {
        id,
      },
    });
    return NextResponse.json(asyncHandler(200, "User deleted"));
  } catch (error) {
    return NextResponse.json(errorHandler(505, error));
  }
}
