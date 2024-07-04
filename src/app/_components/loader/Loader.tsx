import { PuffLoader } from "react-spinners";

export default function Loader() {
  return (
    <div className=" absolute top-0 left-0 z-40 backdrop-blur-lg w-full h-full flex flex-col justify-center items-center">
      <PuffLoader color="#facc15" />
    </div>
  );
}
