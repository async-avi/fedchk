import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma";
import bcrypt from "bcrypt";

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
    return NextResponse.json({
      status: 200,
      data: user.id,
    });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({
      status: 500,
      data: error.message,
    });
  }
}
