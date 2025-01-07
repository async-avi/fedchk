import errorHandler from "@/handlers/errorHandler";
import { NextRequest, NextResponse } from "next/server";
import asyncHandler from "@/handlers/asyncHandler";
import { prisma } from "../../../../../prisma";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, replyEnabled, starsEnabled, imageEnabled, videoEnabled } = body;
  try {
    const newChunk = await prisma.chunk.create({
      data: {
        name,
        replyEnabled,
        starsEnabled,
        imageEnabled,
        videoEnabled,
        user: {
          connect: {
            id: "67796d319068a5ee69d8b3a6",
          },
        },
      },
    });
    const url = `${process.env.PUBLIC_URL}/review/new/${newChunk.id}?r=${newChunk.replyEnabled}&s=${newChunk.starsEnabled}&i=${newChunk.imageEnabled}&v=${newChunk.videoEnabled}`;
    return NextResponse.json(asyncHandler(200, url));
  } catch (error: any) {
    return NextResponse.json(errorHandler(500, error));
  }
}
