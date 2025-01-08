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
    const url = `${process.env.PUBLIC_URL}/api/review/${newReview.id}`;
    let updatedReview = await prisma.review.update({
      where: {
        id: newReview.id,
      },
      data: {
        url,
      },
    });
    const resp = asyncHandler(200, updatedReview.url);
    return NextResponse.json({
      message: `${newReview.id} has been created ${
        starsEnabled ? "with stars," : ""
      } ${videoEnabled ? "with video," : ""} ${
        imageEnabled ? "with image," : ""
      }`,
      data: resp,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(errorHandler(500, error));
  }
}
