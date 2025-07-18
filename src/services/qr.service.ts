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
    console.log(data)
    if (!data.trim().startsWith("Lịch sử thay đổi:")) {
        return false
    }
    const changedData = data.split(/\nNội dung:/).map(e => e.trim()).filter(Boolean)
    let productId = -1
    let lastProductCode = ""
    let lastSupplier = ""
    let lastLocation = ""

    for (let i = changedData.length - 1; i >= 2; i--) {
        const entry = changedData[i]
        console.log("Changes entry:", entry);
        // if (productId === -1) {
        //     const match = entry.match(/Product has id:\s*(\d+)/);
        //     if (match) productId = parseInt(match[1], 10);
        // }

        if (!lastProductCode) {
            const match = entry.match(/product code changes from \((.*?)\) to \((.*?)\)/);
            if (match) lastProductCode = match[2];
        }

        if (!lastSupplier) {
            const match = entry.match(/supplier changes from \((.*?)\) to \((.*?)\)/);
            if (match) lastSupplier = match[2];
        }

        if (!lastLocation) {
            const match = entry.match(/farm location changes from \((.*?)\) to \((.*?)\)/);
            if (match) lastLocation = match[2];
        }

        if (lastProductCode && lastSupplier && lastLocation && productId !== -1) break;
    }

    //Nếu k có thay đổi thì lấy ở gốc
    const original = changedData[1]
    console.log("Original entry:", original);
    if (productId === -1) {
        const match = original.match(/Product has id:\s*(\d+)/);
        if (match) productId = parseInt(match[1], 10);
    }
    if (!lastProductCode) {
        const match = original.match(/Product code:\s*'(.*?)'/)
        if (match) lastProductCode = match[1]
    }

    if (!lastSupplier) {
        const match = original.match(/Supplier:\s*(.*?)(,|$)/)
        if (match) lastSupplier = match[1].trim()
    }

    if (!lastLocation) {
        const match = original.match(/Farm Location:\s*(.*?)(?=,|$)/)
        if (match) lastLocation = match[1].trim()
    }
    console.log(productId)
    console.log(lastProductCode)
    console.log(lastSupplier)
    console.log(lastLocation)
    //Gọi API xuống server ở đây
    const isAuth: boolean = await contract.checkAuthProduct(productId, lastProductCode, lastSupplier, lastLocation)
    console.log(isAuth)
    console.log((typeof isAuth))
    //return tạm
    return isAuth
}