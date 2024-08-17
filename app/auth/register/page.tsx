"use client";

import Image from "next/image";
import Logo from "@/public/logo.svg";
import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const RegisterPage = () => {
  const router = useRouter();
  const [value, setValue] = useState<string | null>(null);
  const [errMessage, setErrMessage] = useState<string | null>(null);
  const [invalidInput, setInvalidInput] = useState<boolean | null>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const emailOrPhone = async () => {
    setLoading(true);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(09\d{9}|\+98\d{10})$/;

    // Validate input format
    if (emailRegex.test(value!)) {
      return "email";
    } else if (phoneRegex.test(value!)) {
      try {
        // Check if the phone number already exists
        const response = await axios.get(
          `http://localhost:3000/api/v1/users/userbyphone?phoneNumber=${value}`
        );

        if (response.status === 200) {
          // User already exists, show error message and stop
          setErrMessage(
            "شماره تلفن وارد شده قبلاً ثبت شده است، لطفاً وارد شوید"
          );
          setInvalidInput(true);
          setLoading(false);
          return;
        }
      } catch (error: any) {
        if (error.response && error.response.status === 404) {
          // User not found, proceed to OTP validation
          router.push(
            `http://localhost:3000/auth?phoneNumber=${value}&fallBackUrl=http://localhost:3000/`
          );
        } else {
          // Handle other potential errors (e.g., network issues)
          setErrMessage("خطایی در برقراری ارتباط با سرور رخ داد");
        }
      }
    } else {
      // Invalid input format, show error message
      setErrMessage(
        "از فرمت وارد شده برای ایمیل و یا شماره همراه اطمینان حاصل فرمایید"
      );
      setInvalidInput(true);
    }

    setLoading(false);
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
            isRequired
            onChange={(e) => {
              setValue(e.target.value);
              setInvalidInput(false);
              setErrMessage(null);
            }}
            isInvalid={invalidInput!}
            errorMessage={errMessage}
            isDisabled={loading}
          />
        </div>
        <Button
          color="primary"
          className="w-full mt-5"
          size="lg"
          onClick={emailOrPhone}
          isLoading={loading}
          isDisabled={loading}
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
