"use client";

import React, { useState } from "react";
import CurrentCredit from "../../_components/CurrentCredit";
import Modal from "@/app/_components/modal/Modal";
import WalletReceive from "./WalletReceive";
import WalletSend from "./WalletSend";

export default function WalletHandler() {
  const [credit, setCredit] = useState(0);
  const [showSend, setShowSend] = useState(false);
  const [showReceive, setShowReceive] = useState(false);
  return (
    <>
      <div className=" w-full flex flex-col gap-4">
        <CurrentCredit credit={credit} setCredit={setCredit} />

        <button
          onClick={() => setShowSend(true)}
          className=" w-full p-2 rounded-2xl border-2 border-yellow-400 text-yellow-400 active:bg-yellow-400 active:text-black"
        >
          Send
        </button>

        <button
          onClick={() => setShowReceive(true)}
          className=" w-full p-2 rounded-2xl  bg-yellow-400 text-black"
        >
          Receive
        </button>
      </div>

      <Modal showModal={showSend} setShowModal={setShowSend}>
        <WalletSend />
      </Modal>

      <Modal showModal={showReceive} setShowModal={setShowReceive}>
        <WalletReceive />
      </Modal>
    </>
  );
}
