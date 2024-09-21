import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Menu, Search, ArrowUp, ArrowDown } from "lucide-react";

const cryptoData = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    price: 63215.13,
    change: -0.3,
    volume: "749.08M",
    range: 1156.0,
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    price: 2567.76,
    change: 0.32,
    volume: "502.72M",
    range: 64.0,
  },
  {
    symbol: "SOL",
    name: "Solana",
    price: 149.24,
    change: 0.25,
    volume: "344.81M",
    range: 5.6,
  },
  {
    symbol: "CATI",
    name: "Catecoin",
    price: 0.923,
    change: -13.64,
    volume: "336.19M",
    range: 0.28,
  },
  {
    symbol: "NEIRO",
    name: "Neiro",
    price: 0.001,
    change: -1.36,
    volume: "175.28M",
    range: 0.00012,
  },
];

export function CryptoMarketDashboard() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white font-sans">
      {/* Header */}
      <header className="p-4 flex items-center justify-between border-b border-gray-800">
        <div className="flex items-center space-x-4">
          <span className="text-yellow-400 text-2xl font-bold">生</span>
          <span className="text-yellow-400 text-xl font-bold">CRYPTOVIEW</span>
        </div>
        <nav className="flex space-x-4">
          <Button variant="ghost" className="text-gray-400 hover:text-white">
            Proof Of Work
          </Button>
          <Button variant="ghost" className="text-gray-400 hover:text-white">
            L1/L2
          </Button>
          <Button variant="ghost" className="text-gray-400 hover:text-white">
            DeFi/DEX/CEX
          </Button>
          <Button variant="ghost" className="text-gray-400 hover:text-white">
            Solana/Sui
          </Button>
          <Button variant="ghost" className="text-gray-400 hover:text-white">
            AI & Depin
          </Button>
          <Button variant="ghost" className="text-gray-400 hover:text-white">
            Depin/RWA
          </Button>
          <Button variant="ghost" className="text-gray-400 hover:text-white">
            NFTs
          </Button>
          <Button variant="ghost" className="text-gray-400 hover:text-white">
            Memes
          </Button>
        </nav>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search"
              className="pl-10 bg-gray-900 border-gray-700 text-white placeholder-gray-400 w-64"
            />
          </div>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6 text-gray-400" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex">
        {/* Crypto List */}
        <div className="w-3/4 p-6">
          <h1 className="text-3xl font-bold mb-6">AI-driven crypto analysis</h1>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Symbol</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Price(24h%)</TableHead>
                <TableHead>Volume(24h)</TableHead>
                <TableHead>24h Price Range</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cryptoData.map((crypto) => (
                <TableRow key={crypto.symbol}>
                  <TableCell className="font-medium">{crypto.symbol}</TableCell>
                  <TableCell>${crypto.price.toLocaleString()}</TableCell>
                  <TableCell
                    className={
                      crypto.change > 0 ? "text-green-500" : "text-red-500"
                    }
                  >
                    {crypto.change > 0 ? (
                      <ArrowUp className="inline h-4 w-4 mr-1" />
                    ) : (
                      <ArrowDown className="inline h-4 w-4 mr-1" />
                    )}
                    {Math.abs(crypto.change)}%
                  </TableCell>
                  <TableCell>${crypto.volume}</TableCell>
                  <TableCell>${crypto.range}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-yellow-400 border-yellow-400 hover:bg-yellow-400 hover:text-black"
                    >
                      Analysis
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Copilot Panel */}
        <div className="w-1/4 bg-gray-900 p-6 border-l border-gray-800">
          <h2 className="text-xl font-bold mb-4">Copilot</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">
                Stochastic Oscillator (STOCHk and STOCHd)
              </h3>
              <p className="text-sm text-gray-400">
                STOCHk (91.239) and STOCHd (92.982) are both in the overbought
                territory, indicating potential for a price correction.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Overall Trend Patterns</h3>
              <p className="text-sm text-gray-400">
                The asset is currently in a bullish phase, as indicated by the
                MACD and RSI. However, the overbought conditions in the
                Stochastic indicators suggest caution.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Buy or Sell Recommendation</h3>
              <p className="text-sm text-gray-400">
                Hold. Consider buying on a pullback to the support level of
                56392.38 to mitigate the risk of entering at an overbought
                condition.
              </p>
            </div>
          </div>
          <Button className="w-full mt-4 bg-yellow-400 text-black hover:bg-yellow-500">
            Quick Insights
          </Button>
        </div>
      </main>

      {/* Chat Input */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex space-x-2 max-w-3xl mx-auto relative">
          <Input
            placeholder="Ask a question to get started..."
            className="flex-grow bg-gray-800 border-gray-700 text-white placeholder-gray-400 pr-12 rounded-md"
          />
          <Button className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-yellow-500 hover:bg-yellow-600 text-black rounded-md p-2 w-10 h-10 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
}
