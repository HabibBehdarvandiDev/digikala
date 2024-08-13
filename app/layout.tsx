import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const yekan = localFont({
  src: [
    {
      path: "../fonts/yekan/Thin.woff2",
      weight: "200",
      style: "thin",
    },
    {
      path: "../fonts/yekan/Light.woff2",
      weight: "300",
      style: "light",
    },
    {
      path: "../fonts/yekan/Regular.woff2",
      weight: "400",
      style: "regular",
    },
    {
      path: "../fonts/yekan/SemiBold.woff2",
      weight: "500",
      style: "semibold",
    },
    {
      path: "../fonts/yekan/Bold.woff2",
      weight: "600",
      style: "bold",
    },
    {
      path: "../fonts/yekan/ExtraBold.woff2",
      weight: "700",
      style: "extrabold",
    },
    {
      path: "../fonts/yekan/Black.woff2",
      weight: "800",
      style: "black",
    },
    {
      path: "../fonts/yekan/ExtraBlack.woff2",
      weight: "900",
      style: "extrablack",
    },
  ],
});

export const metadata: Metadata = {
  title: "دیجیکالا",
  description: "Develped by HabibDev.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa">
      <body className={yekan.className}>
        <NextUIProvider>
          <NextThemesProvider attribute="class" defaultTheme="light">
            {children}
          </NextThemesProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
