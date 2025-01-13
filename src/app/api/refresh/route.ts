import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma";
import errorHandler from "@/handlers/errorHandler";

export async function GET() {
  try {
    await prisma.reply.deleteMany({});
    await prisma.review.deleteMany({});
    await prisma.chunk.deleteMany({});
    await prisma.user.deleteMany({});

    return NextResponse.json({
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(errorHandler(500, error));
  }
}
