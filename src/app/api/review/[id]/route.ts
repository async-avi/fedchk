import errorHandler from "@/handlers/errorHandler";
import { prisma } from "../../../../../prisma";
import { NextRequest, NextResponse } from "next/server";
import asyncHandler from "@/handlers/asyncHandler";

export async function GET(req: Request, context: any) {
  try {
    const { id } = await context.params;
    const review = await prisma.review.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        username: true,
        content: true,
        likes: true,
        assetUrl: true,
        stars: true,
        url: true,
        replies: true,
        iat: true,
      },
    });
    return NextResponse.json(asyncHandler(200, review));
  } catch (error) {
    return errorHandler(500, error);
  }
}

export async function DELETE(req: Request, context: any) {
  try {
    const { id } = await context.params;
    const deletedReview = await prisma.review.delete({
      where: {
        id,
      },
    });
    return NextResponse.json(
      asyncHandler(200, `${deletedReview.id} is deleted`)
    );
  } catch (error) {
    return NextResponse.json(errorHandler(500, error));
  }
}

export async function PATCH(req: NextRequest, context: any) {
  try {
    const { id } = await context.params;
    await prisma.review.update({
      where: {
        id,
      },
      data: {
        likes: {
          increment: 1,
        },
      },
    });
    return NextResponse.json(asyncHandler(200, `Liked ${id}`));
  } catch (error) {
    return NextResponse.json(error);
  }
}
