import React, { useRef } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createConfig, http, useAccount, useBalance, useConnect, WagmiConfig } from "wagmi";
import { mainnet, seiDevnet } from "viem/chains";
import { metaMask, injected } from "wagmi/connectors";
import { useSendTransaction } from "wagmi";
import { parseEther } from "viem";
import { useReadContract } from "wagmi";
import { wagmiContractConfig } from "./wagmiContractConfig";
import { ethers } from 'ethers';


const queryClient = new QueryClient();

const config = createConfig({
  publicClient: http(),
  chains: [mainnet, seiDevnet],
  connectors: [metaMask(), injected()],
});



function ReadContract() {
    const { data: balance, isLoading, error } = useReadContract({
        ...wagmiContractConfig,
        functionName: 'balanceOf',
        args: ['0x03A71968491d55603FFe1b11A9e23eF013f75bCF'],
    });

    const formattedBalance = balance
        ? ethers.utils.formatEther(balance.toString())
        : null;

    return (
        <div className="text-center py-10 text-2xl">
            {error ? (
                <div className="text-red-500">
                    <h1>Error: {error.message || error.toString()}</h1>
                </div>
            ) : isLoading ? (
                <h1>Loading the balance...</h1>
            ) : (
                <h1>Contract Balance: {formattedBalance} ETH</h1>
            )}
        </div>
    );
}




function WalletConnector() {
  const { connectors, connect, isLoading } = useConnect();

  return (
    <>
      <div className="flex justify-center py-10 gap-5">
        {connectors.map((connector, index) => (
          <div key={index} className="">
            <button
              onClick={() => connect({ connector })}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              disabled={isLoading}
            >
              {connector.name}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

function MyAddress() {
  const { address, isConnecting } = useAccount();
  const { data: balance, isLoading, isError } = useBalance({
    address : "0x881156e3BC81a67fB5DF63470cC73351e895F149",
  });

  if (isConnecting) {
    return (
      <div className="flex justify-center py-10 text-2xl font-mono">
        <h1>Connecting...</h1>
      </div>
    );
  }

  if (!address) {
    return (
      <div className="flex justify-center py-10 text-2xl font-mono">
        <h1>No wallet connected. Please connect a wallet.</h1>
      </div>
    );
  }

  return (
    <div className="flex justify-center py-10 text-2xl font-mono">
      <div className="flex flex-col gap-5">
        <h1>{`Address: ${address}`}</h1>
        {isLoading ? (
          <h1>Loading balance...</h1>
        ) : isError ? (
          <h1>Failed to fetch balance</h1>
        ) : (
          <h1>{`Balance: ${balance?.toString()}`}</h1>
        )}
      </div>
    </div>
  );
}

function SendETH(){
  const amount = useRef(0);
  const RwalletAddress = useRef(null);

  const { sendTransaction } = useSendTransaction();
  const send = () => {
    const address = RwalletAddress.current.value;
    const amountValue = amount.current.value;
    sendTransaction({
      to: address,
      value: parseEther(amountValue),
    });
};

  return (
    <>
      <div className="flex justify-center">
        <div className="flex flex-col gap-5">
          <input
            ref={RwalletAddress}
            type="text"
            placeholder="Receiver Wallet Address"
            className="border-2 border-gray-600 py-2 px-1 w-72 rounded-xl"
            required
          />
          <input
            ref={amount}
            type="text"
            placeholder="Enter Amount"
            className="border-2 border-gray-600 py-2 px-1 w-72 rounded-xl"
            required
          />
          <button
            onClick={send}
            className="border-2 border-gray-600 py-2 w-40 flex justify-center rounded-xl hover:bg-gray-400"
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
}

function Connect() {
  return (
    <WagmiConfig config={config}>
      <QueryClientProvider client={queryClient}>
        <WalletConnector />
        <MyAddress />
        <SendETH />
        <ReadContract />
      </QueryClientProvider>
    </WagmiConfig>
  );
}

export default Connect;




// fix the balance fetch issue !!!
// Assignment :-  Read only docs, Write functions, write functions with payable...