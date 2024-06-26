"use client";

import ErrorAlert from "@/app/_components/alerts/ErrorAlert";
import Loader from "@/app/_components/loader/Loader";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function RegisterForm() {
  const params = useSearchParams();
  const token = params.get("token");
  const il = params.get("il");

  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState<string | null | undefined>(null);

  const loginHandler = () => {
    setLoading(true);
    signIn("credentials", {
      token: token,
      il: il ? il : "Null",
      redirect: false,
    })
      .then((res) => {
        if (res?.ok) {
          router.refresh();
        } else {
          setError(res?.error || "Login is failed");
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loginHandler();
  }, []);

  return (
    <>
      {error && <ErrorAlert text={error} />}

      {loading && <Loader />}

      {!token && <p className=" text-center">Please restart the bot</p>}
    </>
  );
}
