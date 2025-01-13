import { NextResponse } from "next/server";
import errorHandler from "@/handlers/errorHandler";
import { prisma } from "../../../../../../prisma";
import asyncHandler from "@/handlers/asyncHandler";

export async function POST(req: Request, context: any) {
  const { username, content } = await req.json();
  try {
    const { reviewId } = await context.params;
    const newReply = await prisma.reply.create({
      data: {
        username,
        content,
        review: {
          connect: {
            id: reviewId,
          },
        },
      },
      select: {
        id: true,
        username: true,
        content: true,
        iat: true,
      },
    });
    return NextResponse.json(asyncHandler(500, newReply));
  } catch (error: any) {
    return NextResponse.json(errorHandler(500, error));
  }
}
