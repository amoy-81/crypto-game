"use client";

const ProgressBar = ({ progress }: { progress: number }) => {
  return (
    <div className="flex flex-col items-center w-2/3">
      <div className="flex w-full max-w-md justify-between my-4">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className={`w-1/5 h-4 mx-1 ${
              index < progress ? "bg-yellow-500" : " bg-neutral-500"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
