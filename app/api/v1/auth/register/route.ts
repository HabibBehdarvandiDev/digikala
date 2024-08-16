import prisma from "@/utils/db";
import { createJWT } from "@/utils/session";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const phoneNumberSchema = z.object({
  phoneNumber: z.string(),
});

export async function POST(req: NextRequest) {
  let body;

  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json(
      { error: "بدنه درخواست غیرقابل خواندن است" },
      { status: 400 }
    );
  }

  const validation = phoneNumberSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.formErrors.fieldErrors);
  }

  // check if number exist!
  try {
    const user = await prisma.users.findFirst({
      where: {
        phone_number: validation.data.phoneNumber,
      },
    });

    if (user) {
      return NextResponse.json(
        { error: "user already exist" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: "faild connect to DB" }, { status: 500 });
  }

  //create user
  try {
    const user = await prisma.users.create({
      data: {
        phone_number: validation.data.phoneNumber,
      },
    });

    const token = await createJWT({ userId: user.id, role: "admin" }, "2h");

    return NextResponse.json({ status: 200, token, user });
  } catch (error) {
    return NextResponse.json({ error: "faild connect to DB" }, { status: 500 });
  }
}
