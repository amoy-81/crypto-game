import Image from "next/image";
import CoinImage from "../../../public/blur-coin.png";

export default function Home() {
  return (
    <section className=" w-full flex flex-col items-center">
      <div className=" relative w-full p-12">
        <Image src={CoinImage} alt="ccc" />
        <div className=" absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
          <h2 className=" text-neutral-900 font-bold text-2xl">00:00</h2>
          <span className=" text-neutral-700">- - -</span>
          <div className=" flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="size-6 text-neutral-900 font-bold"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
            <h2 className=" text-neutral-900 font-bold text-2xl">$0</h2>
          </div>
        </div>
      </div>
      <button className=" bg-gradient-to-t to-yellow-400 from-orange-400 py-2 px-4 font-bold rounded-lg">
        STaRt MiNe
      </button>
    </section>
  );
}
