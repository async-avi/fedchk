import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma";
import bcrypt from "bcrypt";
import asyncHandler from "@/handlers/asyncHandler";
import errorHandler from "@/handlers/errorHandler";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import sendMail from "@/handlers/sendEmail";

interface SignUpBody {
  fullName: string;
  email: string;
  password: string;
}

export async function POST(req: NextRequest) {
  const cookie = await cookies();
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
    let token = {
      id: user.id,
    };
    let assigned = jwt.sign(token, `${process.env.JWT_SECRET}`, {
      expiresIn: "10m",
    });
    await sendMail(assigned, user.email);
    return NextResponse.json(asyncHandler(200, assigned));
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(errorHandler(500, error));
  }
}
