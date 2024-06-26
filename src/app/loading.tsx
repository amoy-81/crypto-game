import { PuffLoader } from "react-spinners";

function loading() {
  return (
    <div className=" w-full h-screen flex justify-center items-center ">
      <PuffLoader color="#facc15" />
    </div>
  );
}

export default loading;
