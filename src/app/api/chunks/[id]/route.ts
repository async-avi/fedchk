import { prisma } from "../../../../../prisma";
import { NextResponse } from "next/server";
import errorHandler from "@/handlers/errorHandler";
import asyncHandler from "@/handlers/asyncHandler";

export async function GET(req: Request, context: any) {
  try {
    const { id } = await context.params;
    const chunk = await prisma.chunk.findFirst({
      where: {
        id,
      },
      select: {
        name: true,
        reviews: true,
      },
    });
    if (chunk) return NextResponse.json(asyncHandler(200, chunk));
    else return NextResponse.json(errorHandler(404, "Chunk not found"));
  } catch (error: any) {
    return NextResponse.json(errorHandler(500, error));
  }
}

export async function DELETE(req: Request, context: any) {
  try {
    const { id } = await context.params;
    await prisma.chunk.delete({
      where: {
        id,
      },
    });
    return NextResponse.json(asyncHandler(200, "Chunk deleted"));
  } catch (error: any) {
    return NextResponse.json(errorHandler(500, error));
  }
}
