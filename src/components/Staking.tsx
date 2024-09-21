"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { SolanaQRCode } from "@/components/qr-code";
import { Button } from "@/components/ui/button";
import { DEFAULT_VALIDATOR_VOTE_PUBKEY } from "@/api/actions/stake/const";

export default function StakePage() {
  const [apiEndpoint, setApiEndpoint] = useState("");
  const apiPath = "/api/actions/stake";
  const validator = DEFAULT_VALIDATOR_VOTE_PUBKEY.toBase58();

  useEffect(() => {
    setApiEndpoint(
      `${new URL(
        apiPath,
        window.location.href
      ).toString()}?validator=${validator}`
    );
  }, [validator]);

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
        Stake Your SOL
      </h1>
      <p className="text-lg text-muted-foreground text-center mb-8">
        Easily stake SOL to the Solana network using this Action.
      </p>

      <Card className="w-full max-w-md mb-8">
        <CardContent className="p-6 flex flex-col items-center">
          <div className="bg-black p-4 rounded-lg mb-6">
            <SolanaQRCode
              url={apiEndpoint}
              color="white"
              background="black"
              size={250}
              className="rounded-lg"
            />
          </div>
          <Button className="w-full mb-4" asChild>
            <Link href={apiEndpoint} target="_blank">
              Open Action
            </Link>
          </Button>
          <p className="text-sm text-muted-foreground text-center">
            Scan the QR code or click the button above to initiate the staking
            process.
          </p>
        </CardContent>
      </Card>

      <div className="w-full max-w-md space-y-4">
        <div>
          <h3 className="font-semibold mb-2">Endpoint:</h3>
          <Link
            href={apiEndpoint}
            target="_blank"
            className="text-sm text-muted-foreground hover:text-primary underline break-all"
          >
            {apiEndpoint}
          </Link>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Validator:</h3>
          <p className="text-sm text-muted-foreground break-all">{validator}</p>
        </div>
      </div>
    </div>
  );
}
