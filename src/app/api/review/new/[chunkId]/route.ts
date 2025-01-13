import errorHandler from "@/handlers/errorHandler";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../../prisma";
import asyncHandler from "@/handlers/asyncHandler";

export async function POST(req: NextRequest, context: any) {
  const { chunkId } = await context.params;
  const searchParams = req.nextUrl.searchParams;
  const replyEnabled = searchParams.get("r");
  const renderForm = searchParams.get("f");
  const body = await req.json();
  const { username, content } = body;
  const stars = renderForm == "3" || renderForm == "4" ? body.stars : 0;
  const assetUrl = renderForm == "2" || renderForm == "4" ? body.assetUrl : "";
  try {
    const newReview = await prisma.review.create({
      data: {
        username,
        content,
        stars,
        assetUrl,
        chunk: {
          connect: {
            id: chunkId,
          },
        },
      },
    });
    const url = `${process.env.PUBLIC_URL}/api/review/${newReview.id}?r=${replyEnabled}`;
    let updatedReview = await prisma.review.update({
      where: {
        id: newReview.id,
      },
      data: {
        url,
      },
    });
    return NextResponse.json(asyncHandler(200, updatedReview.url));
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(errorHandler(500, error));
  }
}
