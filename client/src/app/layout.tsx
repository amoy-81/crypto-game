import type { Metadata } from "next";
import { Kode_Mono } from "next/font/google";
import "./globals.css";

const kode_mono = Kode_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={kode_mono.className}>{children}</body>
    </html>
  );
}
