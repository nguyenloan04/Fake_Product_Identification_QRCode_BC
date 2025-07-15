import { ethers } from "ethers";

// Hàm kiểm tra kết nối ví
export const checkWalletConnection = async (): Promise<boolean> => {
  if (!window.ethereum) {
    console.error("MetaMask is not installed!");
    return false;
  }

  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.listAccounts();
    return accounts.length > 0;
  } catch (error) {
    console.error("Error checking wallet connection:", error);
    return false;
  }
};

// Hàm yêu cầu người dùng kết nối ví
export const connectWallet = async (): Promise<string[]> => {
  if (!window.ethereum) {
    throw new Error("MetaMask not installed");
  }
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const accounts = await provider.send("eth_requestAccounts", []);
  return accounts;
};
