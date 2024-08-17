import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // Parse the URL to extract query parameters
    const { searchParams } = new URL(req.url);
    const phoneNumber = searchParams.get("phoneNumber");

    // Check if phoneNumber is provided
    if (!phoneNumber) {
      return NextResponse.json(
        { error: "شماره تلفن در پارامترهای درخواست موجود نیست" },
        { status: 400 }
      );
    }

    // If necessary, add logic to handle the phoneNumber, e.g., querying the database
    const user = await prisma.users.findFirst({
      where: { phone_number: phoneNumber },
    });

    if (!user) {
      return NextResponse.json(
        { error: "کاربری با این شماره تلفن یافت نشد" },
        { status: 404 }
      );
    }

    // If everything is successful, return the user data (for example purposes)
    return NextResponse.json({ status: 200, user });
  } catch (error) {
    console.error("خطا در پردازش درخواست:", error);

    return NextResponse.json(
      { error: "خطایی در سرور رخ داده است، لطفاً بعداً تلاش کنید" },
      { status: 500 }
    );
  }
}
