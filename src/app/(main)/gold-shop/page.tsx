import DiscriptionTexts from "../use/_components/DiscriptionTexts";
import CurrentPrice from "./_components/CurrentPrice";
import GoldChart from "./_components/GoldChart";

export default function page() {
  return (
    <>
      <h1 className=" font-bold mt-8">
        <span className=" fadeInOuteTag text-yellow-400">Gold</span> Shop
      </h1>
      <CurrentPrice />
      <GoldChart />
    </>
  );
}
