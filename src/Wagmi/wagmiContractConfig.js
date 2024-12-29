import { mainnet } from 'wagmi/chains';
import contractABI from "./contractABI.json" // Replace with the actual ABI JSON file

export const wagmiContractConfig = {
  address: '0xd16B472C1b3AB8bc40C1321D7b33dB857e823f01', // Replace with your contract address
  abi: contractABI, // Your contract ABI
  chainId: mainnet.id, // Or polygon.id, or the chain you're using
};