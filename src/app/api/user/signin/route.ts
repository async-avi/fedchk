import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma";
import bcrypt from "bcrypt";
import errorHandler from "@/handlers/errorHandler";
import asyncHandler from "@/handlers/asyncHandler";
interface SignInBody {
  email: string;
  password: string;
}

export async function POST(req: NextRequest) {
  try {
    const { email, password }: SignInBody = await req.json();
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    let checkPass = await bcrypt.compare(`${password}`, `${user?.password}`);
    if (user && checkPass) {
      return NextResponse.json(asyncHandler(200, user.id));
    } else if (user && !checkPass) {
      return NextResponse.json(errorHandler(401, "Invalid Password"));
    } else {
      return NextResponse.json(errorHandler(404, "User not found"));
    }
  } catch (error: any) {
    return NextResponse.json(errorHandler(500, error.message));
  }
}
