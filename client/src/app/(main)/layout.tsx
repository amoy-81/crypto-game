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
      <div className=" w-full h-6-8 text-center px-4 py-0">
        <div className=" h-full overflow-y-scroll sc px-0">{children}</div>
      </div>
      <Navbar />
    </main>
  );
}
