"use client";

import React, { useEffect, useState } from "react";

export default function DiscriptionTexts() {
  const [text, setText] = useState<string>("");
  const fullText =
    "This section is not active yet and will be activated when all resources are extracted.";

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
      <p className=" text-justify w-2/3 text-neutral-400 my-2">{text}</p>

      <p className=" text-justify w-2/3 text-neutral-400 my-2">
        You can follow new news from this section.
      </p>
    </>
  );
}
