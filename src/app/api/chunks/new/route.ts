import errorHandler from "@/handlers/errorHandler";
import { NextRequest, NextResponse } from "next/server";
import asyncHandler from "@/handlers/asyncHandler";
import { prisma } from "../../../../../prisma";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  let cookie = await cookies();
  const body = await req.json();
  const { name, replyEnabled, starsEnabled, mediaEnabled } = body;
  let formRender =
    mediaEnabled && starsEnabled ? 4 : mediaEnabled ? 2 : starsEnabled ? 3 : 1;
  const userId = cookie.get("user")?.value;
  try {
    const newChunk = await prisma.chunk.create({
      data: {
        name,
        replyEnabled,
        starsEnabled,
        mediaEnabled,
        renderForm: formRender,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
    const url = `${process.env.PUBLIC_URL}/api/review/new/${newChunk.id}?r=${newChunk.replyEnabled}&f=${newChunk.renderForm}`;
    const updatedChunkUrl = await prisma.chunk.update({
      where: {
        id: newChunk.id,
      },
      data: {
        url,
      },
    });
    return NextResponse.json(asyncHandler(200, updatedChunkUrl.url));
  } catch (error: any) {
    return NextResponse.json(errorHandler(500, error));
  }
}
