import { AuthFetchApi, httpMethods } from "@/lib/fetchApi";
import MineSubmission, { MineSubmissionT } from "./_components/MineSubmission";

export default async function History() {
  const currentResours = await AuthFetchApi(
    "/coin/current-resource",
    httpMethods.get
  );

  const mineHistory = await AuthFetchApi("/coin/mine-history", httpMethods.get);
  console.log(mineHistory);

  return (
    <section className=" h-full bg-history-img">
      <div className=" h-1/3 flex flex-col justify-around">
        <div>
          <h1 className="font-bold">
            RemaiNing{" "}
            <span className=" text-yellow-400 fadeInOuteTag">ResouRceS</span>
          </h1>
          <h2 className=" text-neutral-300">
            $ {currentResours?.resource?.toLocaleString("en-US")}
          </h2>
        </div>
        <div className=" flex flex-col gap-2">
          <h2 className=" font-semibold">
            <span className=" fadeInOuteTag">{">"}</span> MiNe-HiStory{" "}
            <span className=" fadeInOuteTag">{"<"}</span>
          </h2>
          <div className=" flex justify-between">
            <span className=" text-yellow-400">normal</span>
            <span className=" text-blue-400">addfriend</span>
            <span className=" text-green-400">commission</span>
          </div>
        </div>
      </div>
      <div className=" h-2/3 pb-2 sc overflow-y-scroll overflow-x-hidden flex flex-col gap-4">
        {mineHistory &&
          mineHistory?.map((item: any, index: any) => (
            <MineSubmission
              key={index}
              name={`${item?.user?.name}-${item?.user?.name[0]}`}
              amount={item?.amount}
              type={
                item.type === "NORMAL_MINE"
                  ? MineSubmissionT.normal
                  : item.type === "ADD_FRIENND"
                  ? MineSubmissionT.addFriend
                  : MineSubmissionT.commission
              }
            />
          ))}
      </div>
    </section>
  );
}
