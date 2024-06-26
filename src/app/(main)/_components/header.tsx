import Image from "next/image";
import CoinLogo from "../../../../public/Logo-300.png";
import UsernameSection from "./UsernameSection";

export default function Header() {
  return (
    <header className="w-full z-40 flex-none h-1-8 flex items-center justify-between p-5 border-neutral-500 border-t-0 border-[1px] rounded-b-2xl backdrop-blur-lg">
      <Image src={CoinLogo} alt="logo" className=" w-10 h-10" />
      <h1 className=" font-bold">D-Coin-TOk3n</h1>
      <UsernameSection />
    </header>
  );
}
