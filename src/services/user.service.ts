import { ethers } from "ethers";
import UserABI from "@/abis/User.json";

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_USER;

export const loginUser = async (username: string, password: string): Promise<{
  success: boolean;
  role?: number;
}> => {
  if (!window.ethereum) throw new Error("MetaMask not found");

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, UserABI, signer);

  // Gọi hàm login trên smart contract (dùng ví đang kết nối)
  const isValid = await contract.login(username, password);
  if (!isValid) return { success: false };

  const userData = await contract.getUserByUsername(username);

  const userInfo = {
    userId: userData[0].toNumber(),
    username: userData[1],
    name: userData[3],
    authorizeId: userData[4],
    role: userData[5].toNumber(),
    birthday: userData[6],
    email: userData[7],
    wallet: userData[8],
  };

  sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
  return { success: true, role: userInfo.role };
};
export const registerUser = async (
  username: string,
  password: string,
  name: string,
  authorizeId: string,
  birthday: string,
  email: string,
  role: number
) => {
  if (!window.ethereum) throw new Error("MetaMask không được tìm thấy");

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, UserABI, signer);

  const tx = await contract.registerUser(
    username,
    password,
    name,
    authorizeId,
    birthday,
    email,
    role
  );
  await tx.wait();
};
export const isUsernameTaken = async (username: string): Promise<boolean> => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, UserABI, provider);
  const user = await contract.getUserByUsername(username);
  return !!user && user.username !== "";
};

export const getAddressByUsername = async (username: string): Promise<string> => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, UserABI, provider);
  const user = await contract.getUserByUsername(username);
  return user[8]; // user.wallet
};
export const getUsernameByWallet = async (wallet: string): Promise<string> => {
  if (!window.ethereum) throw new Error("MetaMask not found");

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, UserABI, provider);

  const username = await contract.getUsernamesByAddress(wallet);
  return username;
};
