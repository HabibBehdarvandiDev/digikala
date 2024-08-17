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
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
    setErrorMessage(null); // Clear previous error messages
    setLoading(true); // Start loading

    // Simulated OTP check (replace with actual verification logic)
    if (parseInt(code!) !== 123456) {
      setLoading(false);
      setErrorMessage("کد وارد شده نامعتبر است");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/register",
        {
          phoneNumber,
        }
      );

      const { token } = response.data;
      sessionStorage.setItem("token", token);

      // Navigate to the fallback URL on success
      router.push(fallBackUrl!);
    } catch (error: any) {
      // Handle different error cases
      if (error.response) {
        // Specific handling for 409 Conflict (number already exists)
        if (error.response.status === 409) {
          setErrorMessage(
            "شماره تلفن وارد شده قبلاً ثبت شده است، لطفاً وارد شوید"
          );
        } else {
          // General server error handling
          setErrorMessage(
            error.response.data.error || "خطایی در سرور رخ داده است"
          );
        }
      } else if (error.request) {
        // Request was made, but no response received
        setErrorMessage("مشکلی در ارتباط با سرور پیش آمده است");
      } else {
        // Something else caused the error
        setErrorMessage("خطای نامشخصی رخ داده است");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="w-screen h-screen min-h-[100vh] overflow-hidden flex justify-center align-middle items-center">
        <form
          className="w-full px-3 flex flex-col space-y-5 lg:max-w-[400px] lg:px-6 lg:py-11 lg:border lg:space-y-7 lg:rounded-lg"
          onSubmit={(e) => {
            e.preventDefault();
            checkOtp();
          }}
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
              disabled={loading}
            />
            {errorMessage && (
              <span className="text-xs text-red-600">{errorMessage}</span>
            )}
          </div>
          <Button
            color="primary"
            className="w-full mt-5"
            size="lg"
            onClick={checkOtp}
            isLoading={loading}
            isDisabled={loading}
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
