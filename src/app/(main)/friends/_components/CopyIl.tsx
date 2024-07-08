"use client";

import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function CopyIl() {
  const { data: session } = useSession();
  const axios = useAxiosAuth();
  const [link, setLink] = useState<string | null>(null);
  const [isCopy, setIsCopy] = useState<boolean>(false);

  const generateLink = () => {
    if (link) return;

    axios
      .get("/friends/il")
      .then((res) => {
        setLink(res?.data?.il);
      })
      .catch(() => setLink(null));
  };

  useEffect(() => {
    if (session) {
      generateLink();
    }
  }, [session]);

  const copyLink = () => {
    navigator.clipboard.writeText(link ? link : "D-coin").then(
      function () {
        setIsCopy(true);
      },
      function (err) {
        console.error("خطا در کپی کردن: ", err);
      }
    );
  };

  return (
    <>
      <div className=" flex flex-col gap-2">
        <p className=" text-sm text-neutral-400">your invite link</p>
        <div className=" flex items-center gap-4">
          <button
            onClick={copyLink}
            disabled={link ? false : true}
            className={`${
              link ? "border-yellow-400" : " border-neutral-600"
            } p-2 rounded-lg border backdrop-blur-xl`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z"
              />
            </svg>
          </button>
          <p
            onClick={generateLink}
            className={`${
              isCopy
                ? "border-green-400 text-green-400"
                : "border-yellow-400 text-white"
            }  flex-1 p-2 rounded-lg border backdrop-blur-xl`}
          >
            {link ? link.slice(0, 20) : "Generate Invite Link"}
            {link && link?.length > 20 ? "..." : ""}
          </p>
        </div>
      </div>
    </>
  );
}
