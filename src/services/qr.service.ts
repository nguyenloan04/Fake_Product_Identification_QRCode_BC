import { ethers } from "ethers";
import ProductManagerABI from "@/abis/MainSystem.json";

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_MAINSYSTEM;
export default async function extractDataFromQR(data: string): Promise<boolean> {
    // Lấy ABI từ server
    if (!window.ethereum) throw new Error("MetaMask not found");
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    // 👇 Bước kiểm tra + yêu cầu ví kết nối
    const accounts = await provider.send("eth_requestAccounts", []);
    if (accounts.length === 0) {
        throw new Error("No MetaMask accounts found");
    }

    const signer = provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ProductManagerABI, signer);
    // Xử lý QR
    if (!data.startsWith("Lịch sử thay đổi:\nNội dung:")) return false
    const changedData = data.split(/\nNội dung:/).map(e => e.trim()).filter(Boolean)
    let lastProductCode = ""
    let lastSupplier = ""

    for (let i = changedData.length - 1; i >= 1; i--) {
        const entry = changedData[i]

        if (!lastProductCode) {
            const match = entry.match(/product code changes from '(.*?)' to '(.*?)'/)
            if (match) lastProductCode = match[2]
        }
        if (!lastSupplier) {
            const match = entry.match(/supplier changes from '(.*?)' to '(.*?)'/)
            if (match) lastSupplier = match[2]
        }

        if (lastProductCode && lastSupplier) break
    }

    //Nếu k có thay đổi thì lấy ở gốc
    const original = changedData[0]
    if (!lastProductCode) {
        const match = original.match(/Product Code:\s*'(.*?)'/)
        if (match) lastProductCode = match[1]
    }

    if (!lastSupplier) {
        const match = original.match(/Supplier:\s*(.*?)(,|$)/)
        if (match) lastSupplier = match[1].trim()
    }

    //Gọi API xuống server ở đây
    const isAuth: boolean = await contract.checkAuthProduct(lastProductCode,lastSupplier)
    //return tạm
    return isAuth
}