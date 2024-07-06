"use client";

import React, { useEffect, useState } from "react";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import Loader from "@/app/_components/loader/Loader";
import {
  ErrorAlertBlur,
  SuccessAlert,
} from "@/app/_components/alerts/AlertMessage";

export default function WalletSend({ setCredit }: { setCredit: any }) {
  const axios = useAxiosAuth();
  const [wallet, setWallet] = useState<string>("");
  const [amount, setAmount] = useState<any>(10);
  const [user, setUser] = useState<any>(null);

  const [loading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState<any>(null);
  const [successMessage, setSuccessMessage] = useState<any>(null);

  useEffect(() => {
    if (error || successMessage) {
      setTimeout(() => {
        setError(null);
        setSuccessMessage(null);
      }, 5000);
    }
  }, [error, successMessage]);

  const findUser = () => {
    axios
      .get(`/wallet/user/${wallet}`)
      .then((res) => {
        setUser(res?.data);
      })
      .catch(() => setUser(null));
  };

  useEffect(() => {
    findUser();
  }, [wallet]);

  const sendReq = () => {
    setLoading(true);
    axios
      .post(`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/api/wallet`, {
        wallet,
        amount: parseInt(amount),
      })
      .then((res) => {
        setSuccessMessage(res?.data?.message || "Successful transfer :)");
        setCredit(res?.data?.payerCreditChange?.currentCredit);
      })
      .catch((err) => setError(err?.response?.data?.message || "Send Failed!!"))
      .finally(() => setLoading(false));
  };

  return (
    <div className=" relative">
      {loading && <Loader />}
      <h1 className=" mb-4">Send</h1>

      <div className=" px-8 flex flex-col gap-4">
        {error && <ErrorAlertBlur text={error} />}
        {successMessage && <SuccessAlert text={successMessage} />}
      </div>

      <div className=" flex px-8 items-center mt-4">
        <div
          className={`${
            user ? ` text-green-400` : `text-white`
          } w-full flex items-center justify-center gap-2  bg-neutral-900/10 rounded-md p-2 outline-none`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>

          <p>
            {user ? user.username.slice(0, 20) : "No User"}
            {user && user?.username > 20 ? "..." : ""}
          </p>
        </div>
      </div>

      <div className=" flex flex-col px-8">
        <label
          htmlFor="wallet"
          className=" text-left text-sm p-2 text-white/70"
        >
          wallet address
        </label>
        <input
          type="text"
          id="wallet"
          value={wallet}
          onChange={(e) => setWallet(e.target.value)}
          className=" border border-yellow-400 bg-neutral-900/50 rounded-md p-2 outline-none "
          placeholder="73ghrfyhierofg..."
        />
      </div>

      <div className=" flex flex-col px-8">
        <label
          htmlFor="wallet"
          className=" text-left text-sm p-2 text-white/70"
        >
          amount of coin
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className=" appearance-none border border-yellow-400 bg-neutral-900/50 rounded-md p-2 outline-none "
          placeholder="65"
        />
      </div>

      <div className=" flex px-8 items-center mt-4">
        <button
          disabled={!user || amount < 0 ? true : false}
          onClick={sendReq}
          className={`${
            !!user && amount > 0
              ? `bg-yellow-400 text-black`
              : ` bg-neutral-800 text-neutral-400`
          } w-full p-2 rounded-2xl text-black active:bg-black active:border active:border-yellow-400 active:text-yellow-400`}
        >
          Send
        </button>
      </div>
      <br />
    </div>
  );
}
