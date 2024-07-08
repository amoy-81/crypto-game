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
      <head>
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
                !function(e,t,n){e.yektanetAnalyticsObject=n,e[n]=e[n]||function(){e[n].q.push(arguments)},e[n].q=e[n].q||[];var a=t.getElementsByTagName("head")[0],r=new Date,c="https://cdn.yektanet.com/superscript/o9zNHaGM/native-crypto-game-client.vercel.app-38388/yn_pub.js?v="+r.getFullYear().toString()+"0"+r.getMonth()+"0"+r.getDate()+"0"+r.getHours(),s=t.createElement("link");s.rel="preload",s.as="script",s.href=c,a.appendChild(s);var l=t.createElement("script");l.async=!0,l.src=c,a.appendChild(l)}(window,document,"yektanet");
              `,
          }}
        />
      </head>
      <body className={kode_mono.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
