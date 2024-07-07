import { AuthFetchApi, httpMethods } from "@/lib/fetchApi";

export default async function CurrentPrice() {
  const currentPriceValue = await AuthFetchApi(
    "/gold/current-price",
    httpMethods.get
  );

  return (
    <div className="flex flex-col items-center justify-center mt-4">
      <span className=" fadeInOuteTag text-xs text-neutral-700">
        Possible to buy soon
      </span>
      <h1>
        Today's <span className=" text-yellow-400">price</span>
      </h1>
      <h1 className=" text-bold">$ {currentPriceValue?.price}</h1>
    </div>
  );
}
