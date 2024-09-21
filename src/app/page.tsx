import Header from "@/components/header";
import CubeAnimation from "@/components/CubeAnimation";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-gradient-to-b from-gray-900 to-gray-600">
      <Header />
      <div className="flex-grow flex items-center justify-center w-full p-8">
        <CubeAnimation />
      </div>
    </main>
  );
}
