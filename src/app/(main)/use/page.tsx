import DiscriptionTexts from "./_components/DiscriptionTexts";
import WalletHandler from "./_components/WalletHandler";
import WalletHistory from "./_components/WalletHistory";

export default function UsePage() {
  return (
    <section className=" use-s-bg flex flex-col items-center h-full">
      <h1 className=" font-bold my-4 mt-6">
        My <span className=" fadeInOuteTag text-yellow-400">D-Coin</span> Wallet
      </h1>
      <WalletHandler />
      {/* <DiscriptionTexts /> */}
      <WalletHistory />
    </section>
  );
}
