"use client";

import React, { useEffect, useState } from "react";
import CopyBox from "../../friends/_components/CopyBox";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { useSession } from "next-auth/react";

export default function WalletReceive() {
  const { data: session } = useSession();
  const axios = useAxiosAuth();
  const [link, setLink] = useState<string | null>(null);

  const generateLink = () => {
    if (link) return;

    axios
      .get("/wallet")
      .then((res) => {
        setLink(res?.data?.wallet);
      })
      .catch(() => setLink(null));
  };

  useEffect(() => {
    if (session) {
      generateLink();
    }
  }, [session]);

  return (
    <div>
      <h1 className=" mb-4">Receive</h1>
      <div className=" flex px-8">
        <CopyBox
          link={link}
          title="your wallet address"
          generateLink={generateLink}
        />
      </div>
    </div>
  );
}
