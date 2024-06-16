import Header from "./_components/header";
import Navbar from "./_components/navbar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative main-bg-image mx-auto min-h-screen max-w-3xl">
      <Header />
      <div className=" w-full text-center p-4">
        <h2 className=" font-semibold mx-auto text-2xl text-yellow-500">
          $ 100,000,000,000
        </h2>
      </div>

      {children}
      <Navbar />
    </main>
  );
}
