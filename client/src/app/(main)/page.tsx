import Image from "next/image";
import CoinImage from "../../../public/coin.png";

export default function Home() {
  return (
    <section className=" w-full h-full flex flex-col items-center">
      <div className=" relative w-full flex justify-center p-12">
        <Image src={CoinImage} alt="ccc" />
      </div>
      <button className=" bg-gradient-to-t to-yellow-400 from-orange-400 py-2 px-4 font-bold rounded-lg">
        STaRt MiNe
      </button>
      
    </section>
  );
}
