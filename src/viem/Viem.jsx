import React from 'react';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { createClient, http } from 'viem';
import { mainnet } from 'viem/chains';
import { getBalance } from 'viem/actions';

// Create a viem client
const client = createClient({
    chain: mainnet,
    transport: http(),
});

// Initialize React Query client
const queryClient = new QueryClient();

// Fetch balance function
const fetchBalance = async () => {

        const balance = await getBalance({
            client,
            address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e', // Replace with a valid address
        });
        return balance; // Return the balance
   
};

// Custom hook to fetch balance using React Query
function useBalance() {
    return useQuery({
        queryKey: ['balance'],
        queryFn: fetchBalance,
        refetchInterval: 10000, // Fetch every 10 seconds
    });
}

// React component
function Viem() {
    const { data, isLoading, error } = useBalance();

    if (isLoading) {
        return <div className='flex justify-center text-2xl py-10 font-mono'>Loading...</div>;
    }

    if (error) {
        return <div className='flex justify-center text-2xl py-10 font-mono'>Error: {error.message}</div>;
    }

    return (
        <div className="flex justify-center text-2xl py-10 font-mono">
            <h1>Balance: {data?.formatted || data}</h1>
        </div>
    );
}

// Wrap the app with QueryClientProvider
export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Viem />
        </QueryClientProvider>
    );
}
