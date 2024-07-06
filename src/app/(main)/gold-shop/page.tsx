import DiscriptionTexts from "../use/_components/DiscriptionTexts";

export default function page() {
  return (
    <>
      <h1 className=" font-bold mt-8">
        <span className=" fadeInOuteTag text-yellow-400">Gold</span>{" "}
        Shop
      </h1>
      <div className=" w-full flex justify-center py-4 text-center">
        <DiscriptionTexts fullText="Gold Shop is Comming Soon..." />
      </div>
    </>
  );
}
