import errorHandler from "@/handlers/errorHandler";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../../prisma";
import asyncHandler from "@/handlers/asyncHandler";

export async function POST(req: NextRequest, context: any) {
  const { chunkId } = await context.params;
  const searchParams = req.nextUrl.searchParams;
  const starsEnabled = searchParams.get("s") === "true";
  const videoEnabled = searchParams.get("v") === "true";
  const imageEnabled = searchParams.get("i") === "true";
  const body = await req.json();

  try {
    const { username, content, stars, assetUrl } = body;
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

    return NextResponse.json(
      asyncHandler(
        200,
        `Review with ${newReview.id} created ${
          starsEnabled ? "with stars" : ""
        } ${imageEnabled ? "with image" : videoEnabled ? "with video" : ""}`
      )
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(errorHandler(500, error));
  }
}
