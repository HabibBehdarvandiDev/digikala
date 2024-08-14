"use client";

import { Button, Input } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const OtpValidationPage = () => {
  const router = useRouter();
  const [otp, setOtp] = useState<string>("");

  const searchParams = useSearchParams();
  const phoneNumber = searchParams.get("phoneNumber");
  const fallBackUrl = searchParams.get("fallBackUrl")
    ? searchParams.get("fallBackUrl")
    : "/";

  const validateOtp = () => {
    if (parseInt(otp) === 123456) {
      router.push(fallBackUrl!);
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
        <form className="flex flex-col space-y-5">
          <h3 className="text-lg font-semibold">ورود | ثبت نام</h3>
          <div className="controls flex flex-col space-y-10">
            <div className="form-control w-full space-y-3">
              <label htmlFor="phone_number" className="text-xs text-zinc-500 ">
                کد تایید برای شماره{" "}
                <span className="text-sm font-semibold">{phoneNumber}</span>{" "}
                پیامک شد
              </label>
              <Input
                dir="ltr"
                variant="flat"
                size="lg"
                type="number"
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <div className="form-control w-full">
              <Button
                color="primary"
                className="w-full"
                size="lg"
                onClick={validateOtp}
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

export default OtpValidationPage;
