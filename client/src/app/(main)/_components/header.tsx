import Image from "next/image";
import CoinLogo from "../../../../public/coin.png";

export default function Header() {
  return (
    <header className="w-full flex items-center justify-between p-5 border-neutral-500 border-t-0 border-[1px] rounded-b-2xl backdrop-blur-lg">
      <Image src={CoinLogo} alt="logo" className=" w-10 h-10" />
      <h1 className=" font-bold">D-Coin-TOk3n</h1>
      <span>ali</span>
    </header>
  );
}
