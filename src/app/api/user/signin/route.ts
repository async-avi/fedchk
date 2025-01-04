import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma";
import bcrypt from "bcrypt";
import { stat } from "fs";

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
      return NextResponse.json({
        status: 200,
        data: user?.id,
      });
    } else if (user && !checkPass) {
      return NextResponse.json({
        status: 403,
        data: "Invalid password",
      });
    } else {
      return NextResponse.json({
        status: 400,
        data: "User not found",
      });
    }
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      data: error.message,
    });
  }
}
