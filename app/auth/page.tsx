"use client";

import Logo from "@/public/logo.svg";
import { Button, Input } from "@nextui-org/react";
import axios from "axios";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const OtpValidationPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(undefined);
  const [fallBackUrl, setFallBackUrl] = useState<string | undefined>(undefined);
  const [code, setCode] = useState<string | null>("");

  useEffect(() => {
    const phone = searchParams.get("phoneNumber");
    const fallBack = searchParams.get("fallBackUrl");

    if (phone === undefined || fallBack === undefined) {
      console.log("phone number or fall back url did not got throgh!");
    }

    setPhoneNumber(phone!);
    setFallBackUrl(fallBack!);
  }, [searchParams]);

  const checkOtp = async () => {
    //check OTP code
    if (parseInt(code!) !== 123456) {
      return;
    }

    await axios
      .post("http://localhost:3000/api/v1/auth/register", {
        phoneNumber,
      })
      .then((response) => {
        const { token } = response.data;
        sessionStorage.setItem("token", token);
      });

    // if success must create new user and also create JWT to save in localStorage
    router.push(fallBackUrl!);
  };

  return (
    <div>
      <div className="w-screen h-screen min-h-[100vh] overflow-hidden flex justify-center align-middle items-center">
        <form
          className="w-full px-3 flex flex-col space-y-5 lg:max-w-[400px] lg:px-6 lg:py-11 lg:border lg:space-y-7 lg:rounded-lg"
          onSubmit={(e) => e.preventDefault()}
        >
          <Image
            alt="logo"
            src={Logo}
            width={130}
            height={100}
            className="w-[150px] md:w-[120px] self-center"
          />
          <h3 className="text-base font-semibold">تایید شماره همراه</h3>
          <div className="form-control flex flex-col gap-4">
            <label htmlFor="phoneNumber" className="text-xs text-gray-400">
              {`کد تایید برای شماره ${phoneNumber} ارسال شد.`}
            </label>
            <Input
              variant="bordered"
              size="lg"
              color="primary"
              required
              onChange={(e) => setCode(e.target.value)}
            />
            {/* <span className="text-xs text-red-600">
            لطفا این قسمت را خالی نگذارید
          </span> */}
          </div>
          <Button
            color="primary"
            className="w-full mt-5"
            size="lg"
            onClick={checkOtp}
          >
            ورود{" "}
          </Button>
          <span className="text-[11px] text-gray-400 self-center">
            ورود شما به معنای پذیرش{" "}
            <span className="text-sky-600">شرایط دیجی‌کالا</span> و{" "}
            <span className="text-sky-600">قوانین حریم‌خصوصی</span> است
          </span>
        </form>
      </div>
    </div>
  );
};

export default OtpValidationPage;
