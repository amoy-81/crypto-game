"use client";

import React, { useEffect, useState } from "react";

export default function Modal({
  children,
  showModal,
  setShowModal,
}: {
  children: any;
  showModal: boolean;
  setShowModal: any;
}) {
  const [show, setShow] = useState(false);
  const [up, setUp] = useState(false);
  useEffect(() => {
    if (showModal) {
      setShow(showModal);
      setTimeout(() => {
        setUp(showModal);
      }, 400);
    } else {
      setUp(showModal);
      setTimeout(() => {
        setShow(showModal);
      }, 400);
    }
  }, [showModal]);

  return (
    <section
      onClick={() => setShowModal(false)}
      className={
        show
          ? " z-30 transition fixed bg-black/40 w-full h-screen top-0 left-0 opacity-1"
          : " z-30 transition opacity-0"
      }
    >
      <div className=" relative w-full h-full">
        <div
          onClick={(e) => e.stopPropagation()}
          className={` ${
            up ? ` translate-y-0` : ` translate-y-[100%]`
          } transition absolute h-3/4 w-full rounded-t-3xl bg-black/70 backdrop-blur-2xl bottom-0 left-0`}
        >
          <div className=" w-full p-3 flex justify-center">
            <span
              className=" flex w-20 h-1 px-16 rounded-3xl bg-neutral-700"
              onClick={() => setShowModal(false)}
            ></span>
          </div>
          {children}
        </div>
      </div>
    </section>
  );
}
