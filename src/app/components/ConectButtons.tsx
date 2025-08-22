"use client";

import React, { useState, useEffect, useRef } from "react";
import { useAccount, useConnect, useDisconnect, useWriteContract } from "wagmi";
// import { ScrollArea } from "./scroll-area";
import { MintNFT1 } from "../mint-nft1";

export const ConnectButtons = () => {
  const { address, isConnected } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // Added type here
  const { data: hash, writeContract } = useWriteContract();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Handles closing the dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      {!isConnected ? (
        <button
          onClick={toggleDropdown}
          type="button"
          className="text-sm bg-orange-400 hover:bg-black hover:text-gray-300 text-black font-semibold py-0 px-4 rounded-lg transition duration-300 ease-in-out"
        >
          {hash && (
            <div className="mt-4 text-yellow-500">Transaction Hash: {hash}</div>
          )}
          Connect Wallet
        </button>
      ) : (
        <>
          <div className="mb-2 text-sm  xl:border-none border-slate-700 mx-2 rounded-lg text-yellow-500">
            <span className="text-white">Status:</span> {isConnected ? "Connected" : "Disconnected"}
            <br />
            <span className="text-white">Address:</span> 
            <div className="text-xs overflow-hidden text-ellipsis whitespace-nowrap">{address}</div>
          </div>
          <button
            type="button"
            onClick={() => disconnect()}
            className="text-sm bg-gray-400 hover:bg-gray-500 text-white font-semibold py-0 px-2 rounded-lg transition duration-300 ease-in-out"
          >
            Disconnect
          </button>
        </>
      )}

      
    </div>
  );
};
