import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma";
import bcrypt from "bcrypt";
import asyncHandler from "@/handlers/asyncHandler";
import errorHandler from "@/handlers/errorHandler";

interface SignUpBody {
  fullName: string;
  email: string;
  password: string;
}

export async function POST(req: NextRequest) {
  try {
    const { fullName, email, password }: SignUpBody = await req.json();
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await prisma.user.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
      },
    });
    return NextResponse.json(asyncHandler(200, user.id));
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(errorHandler(500, error));
  }
}
