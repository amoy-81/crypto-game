import Image from "next/image";

import MineSection from "./_components/MineSection";

export default function Home() {
  return (
    <section className=" relative w-full h-full flex flex-col items-center mine-bg">
      <MineSection />
    </section>
  );
}
