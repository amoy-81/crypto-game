import Header from "./_components/header";
import Navbar from "./_components/navbar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative main-bg-image mx-auto h-screen max-w-3xl">
      <Header />
      <div className=" w-full h-6-8 text-center p-4 pb-12">
        <h2 className=" font-semibold mx-auto mt-4 text-2xl text-yellow-500">
          $ 100,000,000,000
        </h2>
        <div className=" h-full overflow-y-scroll pb-2 sc px-0">{children}</div>
      </div>
      <Navbar />
    </main>
  );
}
