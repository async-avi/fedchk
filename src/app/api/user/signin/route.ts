import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma";
import bcrypt from "bcrypt";
import errorHandler from "@/handlers/errorHandler";
import asyncHandler from "@/handlers/asyncHandler";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import sendMail from "@/handlers/sendEmail";

interface SignInBody {
  email: string;
  password: string;
}

export async function POST(req: NextRequest) {
  const cookie = await cookies();
  try {
    const { email, password }: SignInBody = await req.json();
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
      select: {
        id: true,
        isVerified: true,
        password: true,
      },
    });

    let checkPass = await bcrypt.compare(`${password}`, `${user?.password}`);
    let verified = user?.isVerified;
    if (user && checkPass && verified) {
      let token = {
        id: user?.id,
      };
      const assigned = jwt.sign(token, `${process.env.JWT_SECRET}`);
      cookie.set("token", assigned);
      return NextResponse.json(asyncHandler(200, assigned));
    } else if (user && checkPass && !verified) {
      let assigned = jwt.sign({ id: user.id }, `${process.env.JWT_SECRET}`, {
        expiresIn: "10m",
      });
      await sendMail(assigned, "zeherplays@gmail.com");
      return NextResponse.json(errorHandler(403, assigned));
    } else if (user && !checkPass) {
      return NextResponse.json(errorHandler(401, "Invalid Password"));
    } else {
      return NextResponse.json(errorHandler(404, "User not found"));
    }
  } catch (error: any) {
    return NextResponse.json(errorHandler(500, error.message));
  }
}
