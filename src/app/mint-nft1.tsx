import * as React from "react";
import { useAccount, useWriteContract, useChainId } from "wagmi";
import { abi } from "../app/chapter1/abi";
import type { Address } from "viem";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";


export function MintNFT1() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { data: hash, writeContract, isPending } = useWriteContract();
  const router = useRouter();

  const isWalletConnected = isConnected && address;
  const isCorrectNetwork = chainId === 42161; // Arbitrum one ID
  const canMint = isWalletConnected && isCorrectNetwork;
  const isAlreadyMinted = !!hash; // Nuevo estado para controlar el mint

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canMint || isAlreadyMinted) return;

    writeContract({
      address: "0x83eC0903201554fA805d62feE04772805b60Da27",
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
            <Button
              type="submit"
              disabled={!canMint || isPending || isAlreadyMinted} // Aquí añadimos la condición
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
          </TooltipTrigger>

          {(!canMint || isAlreadyMinted) && (
            <TooltipContent>
              <p className="text-sm">
                {!isWalletConnected
                  ? "No wallet? Hit the challenge at the top!"
                  : isAlreadyMinted
                    ? "You already claimed your NFT"
                    : "Switch to Arbitrum Sepolia to mint"}
              </p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>

      {hash && (
        <div className="mt-4 flex flex-col md:flex-row gap-4">
          <a
            href={`https://arbiscan.io/tx/${hash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-500 underline"
          >
            View on Arbiscan
          </a>

          
        </div>
      )}
    </form>
  );
}
