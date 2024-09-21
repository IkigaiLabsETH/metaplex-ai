"use client";

import dynamic from "next/dynamic";
import Image from "next/image";

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

const HamburgerMenuDynamic = dynamic(() => import("./HamburgerMenu"), {
  ssr: false,
  loading: () => <div className="w-10 h-10"></div>, // Placeholder while loading
});

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-transparent">
      <div className="flex items-center space-x-4">
        <HamburgerMenuDynamic />
      </div>
      <div className="flex items-center space-x-4">
        <WalletMultiButtonDynamic />
      </div>
    </header>
  );
}
