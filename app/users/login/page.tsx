"use client";

import Image from "next/image";
import Link from "next/link";
import { Button, Input } from "@nextui-org/react";
import { useState } from "react";

const LoginPage = () => {
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);

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
                endContent={
                  <div className="pointer-events-none flex items-center mr-2">
                    <span className="text-default-400 text-small">98+</span>
                  </div>
                }
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="form-control w-full">
              <Link href={`/users/login/otp_validation?phoneNumber=0${phoneNumber}`}>
                <Button color="primary" className="w-full" size="lg">
                  ورود
                </Button>
              </Link>
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
