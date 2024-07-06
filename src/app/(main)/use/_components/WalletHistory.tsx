import { options } from "@/lib/auth/next-auth-config";
import { AuthFetchApi, httpMethods } from "@/lib/fetchApi";
import { getServerSession } from "next-auth";
import React from "react";
import MineSubmission, {
  MineSubmissionT,
} from "../../history/_components/MineSubmission";

export default async function WalletHistory() {
  const session: any = await getServerSession(options);
  const history = await AuthFetchApi("/wallet/history", httpMethods.get);

  console.log("Session", session);
  console.log("HOs", history);
  return (
    <>
      <h1 className="  mt-4">5 Exchange history</h1>
      <div className=" flex gap-4 justify-center p-4">
        <span className=" text-yellow-400">Decrease</span>
        <span className=" text-green-400">Increase</span>
      </div>
      <div className="w-full pb-2 sc overflow-y-scroll overflow-x-hidden flex flex-col gap-4">
        {history.map((item: any, index: any) =>
          item?.payer?._id === session?.user?.id ? (
            <MineSubmission
              key={index}
              type={MineSubmissionT.normal}
              name={item.receiver.username}
              amount={item.amount}
            />
          ) : (
            <MineSubmission
              key={index}
              type={MineSubmissionT.commission}
              name={item.receiver.username}
              amount={item.amount}
            />
          )
        )}{" "}
      </div>
    </>
  );
}
