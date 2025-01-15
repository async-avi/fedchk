import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import errorHandler from "@/handlers/errorHandler";
import { prisma } from "../../../../../../prisma";
import asyncHandler from "@/handlers/asyncHandler";
import { cookies } from "next/headers";

export async function GET(req: NextRequest, context: any) {
  const cookie = await cookies();
  try {
    const { token } = await context.params;
    let verify: any = jwt.verify(token, `${process.env.JWT_SECRET}`);
    if (verify) {
      let updated = await prisma.user.update({
        where: {
          id: verify?.id,
        },
        data: {
          isVerified: true,
        },
        select: {
          id: true,
        },
      });
      let newAssignedUserToken = jwt.sign(
        updated.id,
        `${process.env.JWT_SECRET}`
      );
      cookie.set("token", newAssignedUserToken);
      return NextResponse.json(asyncHandler(200, newAssignedUserToken));
    } else {
      return NextResponse.json(errorHandler(403, "Invalid token"));
    }
  } catch (error) {
    return NextResponse.json(errorHandler(500, error));
  }
}
