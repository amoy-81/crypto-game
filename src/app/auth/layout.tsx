import Image from "next/image";
import logo from "../../../public/Logo-300.png";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <section className="h-screen auth-bg flex flex-col justify-center items-center">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-white"
          >
            <Image className="w-8 h-8 mr-2" src={logo} alt="logo" />
            D-CoiN
          </a>
          <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 border-neutral-700">
            {children}
          </div>
        </div>
      </section>
    </main>
  );
}
