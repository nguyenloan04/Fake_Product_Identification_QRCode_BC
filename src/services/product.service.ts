// import productDataPromise from "@/services/data.service";
import { ProductCardType, ProductType } from "@/types/product.type";
import { ethers } from "ethers";
import ProductManagerABI from "@/abis/MainSystem.json";

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_MAINSYSTEM;

export const getProductById = async (
  id: number
): Promise<ProductType> => {
  // eslint-disable-next-line no-useless-catch
  try {
    // const response = await productDataPromise;
    // const product = response[id];
    if (!window.ethereum) throw new Error("MetaMask not found");
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    // 👇 Bước kiểm tra + yêu cầu ví kết nối
    const accounts = await provider.send("eth_requestAccounts", []);
    if (accounts.length === 0) {
      throw new Error("No MetaMask accounts found");
    }

    const signer = provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ProductManagerABI, signer);
    const product = await contract.getProduct(id);
    const productHash = await contract.getProductHash(id);
    console.log(product);
    if (!product) {
      throw new Error("404");
    }
    return {
      id: product[0],
      productCode: product[1].toString(),
      title: product[2].toString(),
      category: product[3].toString(),
      image: product[4].toString(),
      price: product[5].toNumber(),
      unitShipped: product[6],
      unitSold: product[7],
      unitOnHand: product[8],
      supplier: product[9].toString(),
      farmLocation: product[10].toString(),
      saleDate: new Date(product[11].toNumber() * 1000),
      productHash: productHash.toString()
    };
  } catch (e) {
    throw e;
  }
};


export const getAllProducts = async (): Promise<ProductCardType[]> => {
  if (!window.ethereum) throw new Error("MetaMask not found");
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  // 👇 Bước kiểm tra + yêu cầu ví kết nối
  const accounts = await provider.send("eth_requestAccounts", []);
  if (accounts.length === 0) {
    throw new Error("No MetaMask accounts found");
  }

  const signer = provider.getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, ProductManagerABI, signer);

  const count = await contract.getProductCount();
  const products: ProductCardType[] = [];

  for (let i = 0; i < count; i++) {
    const product = await contract.getProduct(i);
    const productImage = product[4].toString();
    products.push({
      id: i,
      title: product[2].toString(),
      category: product[3].toString(),
      image: productImage,
      price: product[5].toNumber()
    });
  }
  console.log(products);
  return products;
};

export const createProduct = async (data: {
  title: string;
  category: string;
  image: string;
  productCode: string;
  price: number;
  unitShipped: number;
  unitSold: number;
  unitOnHand: number;
  supplier: string;
  farmLocation: string;
  saleDate: Date;
}) => {
  if (!window.ethereum) throw new Error("MetaMask not found");
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, ProductManagerABI, signer);
  const accounts = await provider.send("eth_requestAccounts", []);
  return contract.createProduct(
    data.productCode,
    data.title,
    data.category,
    data.image,
    data.price,
    data.unitShipped,
    data.unitSold,
    data.unitOnHand,
    data.supplier,
    data.farmLocation,
    Math.floor(data.saleDate.getTime() / 1000),
    accounts[0]
  );
};

export const getProductCount = async (): Promise<number> => {
  if (!window.ethereum) throw new Error("MetaMask not found");
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, ProductManagerABI, signer);
  return (await contract.getProductCount()).toNumber();
};

export const getLogsByProductId = async (productId: number) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, ProductManagerABI, signer);

  const logCount = await contract.getLogsCount();
  const logs: string[] = [];

  for (let i = 0; i < logCount.toNumber(); i++) {
    const log = await contract.getLog(i);
    if (log[4].toNumber() === productId) {
      const time = new Date(log[1].toNumber() * 1000).toLocaleString("vi-VN");
      logs.push(`Nội dung: ${log[2]}\n Ngày cập nhật: ${time}`);
    }
  }

  return logs;
};

