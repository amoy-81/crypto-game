import Image from "next/image";

import MineSection from "./_components/MineSection";

export default function Home() {
  return (
    <section className=" relative w-full h-full flex flex-col items-center mine-bg">
      <MineSection />
      <br />
      <div className=" bg-white/50 rounded-lg">
        <div id="pos-article-text-98273"></div>
        <div id="pos-article-display-98274"></div>
      </div>
    </section>
  );
}
