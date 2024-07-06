"use client";

import React, { useEffect, useState } from "react";

export default function DiscriptionTexts({ fullText }: { fullText: string }) {
  const [text, setText] = useState<string>("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setText((prev) => prev + fullText.charAt(index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100); // تغییر مقدار برای سرعت تایپ

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <p className=" w-2/3 text-neutral-400 my-2">{text}</p>
    </>
  );
}
