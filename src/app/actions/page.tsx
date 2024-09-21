import Link from "next/link";
import { FileTextIcon, ShieldIcon, WalletIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const actionCards = [
  {
    title: "Transfer Native SOL",
    href: "/transfer-sol",
    description: "Easily transfer native SOL to any other Solana wallet.",
    icon: <WalletIcon className="size-8" />,
  },
  {
    title: "On-chain Memo",
    href: "/memo",
    description: "Send a simple message on-chain using an SPL Memo.",
    icon: <FileTextIcon className="size-8" />,
  },
  {
    title: "Staking SOL",
    href: "/stake",
    description:
      "Help secure the Solana network by staking SOL to a validator.",
    icon: <ShieldIcon className="size-8" />,
  },
];

export default function ActionsPage() {
  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-center text-white mb-12">
        Choose an Action
      </h1>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {actionCards.map((card, index) => (
          <Link key={index} href={card.href} className="group">
            <Card className="h-full transition-all hover:shadow-lg bg-white/10 backdrop-blur-lg border-transparent">
              <CardHeader>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary-600 text-white group-hover:bg-primary-500">
                  {card.icon}
                </div>
                <CardTitle className="text-white group-hover:text-primary-300">
                  {card.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 group-hover:text-gray-200">
                  {card.description}
                </p>
              </CardContent>
              <CardFooter>
                <p className="text-sm font-medium text-primary-400 group-hover:text-primary-300 group-hover:underline">
                  Learn more →
                </p>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
