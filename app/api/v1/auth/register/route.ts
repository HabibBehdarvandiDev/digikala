import prisma from "@/utils/db";
import { createJWT } from "@/utils/session";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const phoneNumberSchema = z.object({
  phoneNumber: z.string().min(10, "شماره تلفن باید حداقل 10 رقم باشد"),
});

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const body = await req.json();

    // Validate request data
    const validation = phoneNumberSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: "اطلاعات ورودی نامعتبر است",
          details: validation.error.formErrors.fieldErrors,
        },
        { status: 400 }
      );
    }

    // Check if the user already exists
    const existingUser = await prisma.users.findFirst({
      where: {
        phone_number: validation.data.phoneNumber,
      },
    });

    if (existingUser) {
      // Generate JWT
      const token = await createJWT(
        { userId: existingUser.id, role: "admin" },
        "2h"
      );
      return NextResponse.json(
        {
          token,
        },
        { status: 200 }
      );
    }

    // Create a new user
    const newUser = await prisma.users.create({
      data: {
        phone_number: validation.data.phoneNumber,
      },
    });

    // Generate JWT
    const token = await createJWT({ userId: newUser.id, role: "admin" }, "2h");

    return NextResponse.json({
      status: 201, // 201 Created
      message: "کاربر با موفقیت ثبت شد",
      token,
      user: newUser,
    });
  } catch (error) {
    // Database connection error
    return NextResponse.json(
      {
        error: "خطا در ارتباط با پایگاه داده",
      },
      { status: 500 } // Internal server error
    );

    // Generic error handling
    return NextResponse.json(
      {
        error: "خطای داخلی سرور",
        message: "مشکلی رخ داده است، لطفاً دوباره تلاش کنید",
      },
      { status: 500 }
    );
  }
}
