import { AuthFetchApi, httpMethods } from "@/lib/fetchApi";
import MineSubmission, {
  MineSubmissionT,
} from "../history/_components/MineSubmission";
import CopyIl from "./_components/CopyIl";

export default async function FriendsPage() {
  const friends = await AuthFetchApi("/friends", httpMethods.get);

  return (
    <section className=" h-full bg-friend-img">
      <div className=" relative h-1/3 flex flex-col justify-center gap-8">
        <div>
          <h1 className="font-bold">
            fRieNdS
            <span className=" text-yellow-400 fadeInOuteTag">iNvited</span>
          </h1>
        </div>
        <CopyIl />
      </div>
      <div id="pos-article-text-98273"></div>
      <div className=" h-2/3 pb-2 sc overflow-y-scroll overflow-x-hidden flex flex-col gap-4">
        {friends?.map((item: any, index: any) => (
          <MineSubmission
            key={index}
            name={item?.username}
            amount={null}
            type={MineSubmissionT.addFriend}
          />
        ))}
        {!friends?.length && <p>You have not added a user</p>}
      </div>
    </section>
  );
}
