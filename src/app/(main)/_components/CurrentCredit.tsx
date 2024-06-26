"use client";

import React, { useEffect, useState } from "react";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { useSession } from "next-auth/react";
import Loader from "@/app/_components/loader/Loader";

export default function CurrentCredit({
  credit,
  setCredit,
}: {
  credit: number;
  setCredit: (credit: number) => void;
}) {
  const { data: session } = useSession();
  const axios = useAxiosAuth();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (session) {
      axios
        .get("/coin/current-credit")
        .then((res) => {
          setCredit(res?.data?.credit);
        })
        .catch((err) => {})
        .finally(() => setLoading(false));
    }
  }, [session]);
  return (
    <>
      {loading && <Loader />}
      <h2 className=" font-semibold mx-auto mt-8 text-2xl text-yellow-400">
        $ {credit?.toLocaleString("en-US")}
      </h2>
    </>
  );
}
