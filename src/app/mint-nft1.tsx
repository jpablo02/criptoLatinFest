import * as React from "react";
import { useAccount, useWriteContract, useChainId, useSwitchChain } from "wagmi";
import { abi } from "../app/chapter1/abi";
import type { Address } from "viem";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Loader2 } from "lucide-react";

export function MintNFT1() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const { data: hash, writeContract, isPending } = useWriteContract();

  const isWalletConnected = isConnected && address;
  const isCorrectNetwork = chainId === 81; // ✅ Shibuya Testnet
  const canMint = isWalletConnected && isCorrectNetwork;
  const isAlreadyMinted = !!hash;

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canMint || isAlreadyMinted) return;

    writeContract({
      address: "0x1D4de18300d2869B50632A5Fc67c1Ddd1A07F4b6", // ✅ tu contrato en Shibuya
      abi,
      functionName: "safeMint",
      args: [address as Address],
    });
  }

  return (
    <form onSubmit={submit} className="text-center w-full max-w-md mx-auto">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {isWalletConnected && !isCorrectNetwork ? (
              <Button
                type="button"
                onClick={() => switchChain({ chainId: 81 })}
                className="bg-red-600 hover:bg-red-700 transition-all"
              >
                Switch to Shibuya
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={!canMint || isPending || isAlreadyMinted}
                className={`transition-all ${
                  !canMint || isAlreadyMinted
                    ? "bg-gray-500 hover:bg-gray-500 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {isPending ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="animate-spin h-5 w-5" />
                    Processing...
                  </div>
                ) : isAlreadyMinted ? (
                  "NFT Claimed!"
                ) : (
                  "Save the Bag"
                )}
              </Button>
            )}
          </TooltipTrigger>

          {(!canMint || isAlreadyMinted) && (
            <TooltipContent>
              <p className="text-sm">
                {!isWalletConnected
                  ? "Connect your wallet to mint"
                  : isAlreadyMinted
                  ? "You already claimed your NFT"
                  : "Switch to Shibuya Testnet to mint"}
              </p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    </form>
  );
}
