import type { Metadata } from "next";
import { Kode_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Script from "next/script";
import Head from "next/head";

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
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                !function (t, e, n) {
                    t.yektanetAnalyticsObject = n, t[n] = t[n] || function () {
                        t[n].q.push(arguments)
                    }, t[n].q = t[n].q || [];
                    var a = new Date, r = a.getFullYear().toString() + "0" + a.getMonth() + "0" + a.getDate() + "0" + a.getHours(),
                        c = e.getElementsByTagName("script")[0], s = e.createElement("script");
                    s.id = "ua-script-Wg9IQbNv"; s.dataset.analyticsobject = n;
                    s.async = 1; s.type = "text/javascript";
                    s.src = "https://cdn.yektanet.com/rg_woebegone/scripts_v3/Wg9IQbNv/rg.complete.js?v=" + r, c.parentNode.insertBefore(s, c)
                }(window, document, "yektanet");
              `,
            }}
          />
        </Head>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
