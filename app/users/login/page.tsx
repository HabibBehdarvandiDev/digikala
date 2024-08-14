"use client";

import Image from "next/image";
import Link from "next/link";
import { Button, Input, Link as link } from "@nextui-org/react";
import { ChangeEvent, useState } from "react";
import { useSearchParams } from "next/navigation";

const LoginPage = () => {
  const searchParams = useSearchParams();
  const fallBackUrl = searchParams.get("fallBackUrl")
    ? searchParams.get("fallBackUrl")
    : "http://localhost:3000";

  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [error, setError] = useState("");

  const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Regex to match the desired phone number formats
    const regex = /^(?:\+98|0)\d{10}$/;

    if (regex.test(value)) {
      setPhoneNumber(value);
      setError(""); // Clear any previous errors
    } else {
      setError("لطفا شماره تلفن معتبر وارد کنید");
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center align-middle items-center">
      <div className="w-full px-6 flex flex-col gap-5 lg:w-[450px]  lg:p-8 lg:border lg:rounded-xl">
        <Link href={"http://localhost:3000"} className="self-center">
          <Image
            src={"https://www.digikala.com/statics/img/svg/logo.svg"}
            alt="digikala logo.png"
            width={150}
            height={200}
          />
        </Link>
        <form
          className="flex flex-col space-y-5"
          onSubmit={(e) => e.preventDefault()}
        >
          <h3 className="text-lg font-semibold">ورود | ثبت نام</h3>
          <div className="controls flex flex-col space-y-10">
            <div className="form-control w-full space-y-3">
              <label htmlFor="phone_number" className="text-xs text-zinc-500 ">
                سلام! <br /> لطفا شماره موبایل یا ایمیل خود را وارد کنید
              </label>
              <Input
                dir="ltr"
                variant="flat"
                size="lg"
                type="number"
                onChange={(e) => handlePhoneNumberChange(e)}
              />
              {error && (
                <span className="text-red-500 text-small">{error}</span>
              )}
            </div>
            <div className="form-control w-full">
              <Button
                color="primary"
                className="w-full"
                size="lg"
                href={`/users/login/otp_validation?phoneNumber=${phoneNumber}&fallBackUrl=${fallBackUrl}`}
                as={link}
              >
                ورود
              </Button>
            </div>
            <div className="form-control w-full">
              <span className="text-xs text-nowrap ">
                ورود شما به معنای پذیرش{" "}
                <a href="#" className="text-[#4297B7]">
                  شرایط دیجی‌کالا
                </a>{" "}
                و{" "}
                <a href="#" className="text-[#4297B7]">
                  قوانین حریم‌خصوصی
                </a>{" "}
                است
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
