import type { Metadata } from "next";
import { Kode_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const kode_mono = Kode_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "D-CoiN",
  description: "Crypto Game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={kode_mono.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

// TODO: Login and register and auth middleware
