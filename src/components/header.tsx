"use client";

import dynamic from "next/dynamic";
import ThemeSwitcher from "./themeSwitcher";

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

const Header = () => {
  return (
    <div className="w-full flex justify-between items-center">
      <p className="font-mono text-sm">
        It is time to start&nbsp;
        <code className="font-mono font-bold">LIVING THE GOOD LIFE</code>
      </p>
      <div className="flex items-center gap-4">
        <WalletMultiButtonDynamic />
        <ThemeSwitcher />
      </div>
    </div>
  );
};

export default Header;
