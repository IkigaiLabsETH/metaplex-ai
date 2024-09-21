import Header from "@/components/header";
import CubeAnimation from "@/components/CubeAnimation";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-gray-900 to-gray-600">
      <div className="w-full p-4 absolute top-0 left-0">
        <Header />
      </div>
      <div className="flex-grow flex items-center justify-center w-full p-8 mt-20">
        <CubeAnimation />
      </div>
    </main>
  );
}
