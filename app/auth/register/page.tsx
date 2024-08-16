"use client";

import Image from "next/image";
import Logo from "@/public/logo.svg";
import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const router = useRouter();
  const [value, setValue] = useState<string | null>(null);

  const emailOrPhone = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(09\d{9}|\+98\d{10})$/;

    if (emailRegex.test(value!)) {
      return "email";
    } else if (phoneRegex.test(value!)) {
      router.push(
        `http://localhost:3000/auth?phoneNumber=${value}&fallBackUrl=http://localhost:3000/`
      );
    } else {
      return;
    }
  };

  return (
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
        <h3 className="text-base font-semibold">ورود | ثبت‌نام </h3>
        <div className="form-control flex flex-col gap-4">
          <label htmlFor="phoneNumber" className="text-xs text-gray-400">
            سلام!
            <br />
            لطفا شماره موبایل خود را وارد کنید
          </label>
          <Input
            variant="bordered"
            size="lg"
            color="primary"
            required
            onChange={(e) => setValue(e.target.value)}
          />
          {/* <span className="text-xs text-red-600">
            لطفا این قسمت را خالی نگذارید
          </span> */}
        </div>
        <Button
          color="primary"
          className="w-full mt-5"
          size="lg"
          onClick={() => console.log(emailOrPhone())}
        >
          ثبت نام
        </Button>
        <span className="text-[11px] text-gray-400 self-center">
          ورود شما به معنای پذیرش{" "}
          <span className="text-sky-600">شرایط دیجی‌کالا</span> و{" "}
          <span className="text-sky-600">قوانین حریم‌خصوصی</span> است
        </span>
      </form>
    </div>
  );
};

export default RegisterPage;
