import Header from "@/components/header";
import TradingViewWidget from "@/components/TradingViewWidget";

export default function TickersPage() {
  return (
    <main className="flex flex-col h-screen bg-gradient-to-b from-gray-900 to-gray-600">
      <Header />
      <div className="flex-grow">
        <TradingViewWidget />
      </div>
    </main>
  );
}
