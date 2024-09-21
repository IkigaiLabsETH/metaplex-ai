"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SolanaQRCode } from "@/components/qr-code";
import { Button } from "@/components/ui/button";
import { DEFAULT_VALIDATOR_VOTE_PUBKEY } from "../api/actions/stake/const";

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
    <div className="container py-8 md:py-16">
      <div className="mx-auto max-w-4xl space-y-12">
        <div className="space-y-4 text-center">
          <h1 className="font-heading text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
            Stake Your SOL
          </h1>
          <p className="text-xl text-muted-foreground">
            Easily stake SOL to the Solana network using this Action.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle className="text-2xl">Stake SOL QR Code</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center p-6 bg-black">
              <SolanaQRCode
                url={apiEndpoint}
                color="white"
                background="black"
                size={250}
                className="rounded-lg"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Action Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
                <p className="text-sm text-muted-foreground break-all">
                  {validator}
                </p>
              </div>
              <Button className="w-full mt-4" asChild>
                <Link href={apiEndpoint} target="_blank">
                  Open Action
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <p className="text-muted-foreground">
            Scan the QR code with a Solana-compatible wallet to initiate the
            staking process.
          </p>
        </div>
      </div>
    </div>
  );
}
