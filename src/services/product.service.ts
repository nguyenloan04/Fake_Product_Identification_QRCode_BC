// import productDataPromise from "@/services/data.service";
import { ProductCardType, ProductType } from "@/types/product.type";
import { ethers } from "ethers";
import ProductManagerABI from "@/abis/MainSystem.json";
import { getAddressByUsername, getUsernameByWallet } from "@/services/user.service";

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
    // const productHash = await contract.getProductHash(id);
    // console.log(product);
    if (!product) {
      throw new Error("404");
    }
    const oldOwner: string = await getUsernameByWallet(product[12].toString());
    return {
      id: product[0].toNumber(),
      productCode: product[1].toString(),
      title: product[2].toString(),
      category: product[3].toString(),
      image: product[4].toString(),
      price: product[5].toNumber(),
      unitShipped: product[6].toNumber(),
      unitSold: product[7].toNumber(),
      unitOnHand: product[8].toNumber(),
      supplier: product[9].toString(),
      farmLocation: product[10].toString(),
      saleDate: new Date(product[11].toNumber() * 1000),
      owner: oldOwner,
      // productHash: productHash.toString()
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
  // console.log(products);
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
  if (!window.ethereum) throw new Error("MetaMask not found");
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

export const updateProduct = async (product: {
  id: number;
  title: string;
  category: string;
  productCode: string;
  price: number;
  unitShipped: number;
  unitSold: number;
  unitOnHand: number;
  supplier: string;
  farmLocation: string;
  saleDate: string | Date;
  owner: string;
}) => {
  if (!window.ethereum) throw new Error("MetaMask not found");
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, ProductManagerABI, signer);

  const userIdAddress = await getAddressByUsername(product.owner);
  if (!ethers.utils.isAddress(userIdAddress)) {
    throw new Error("Không tìm thấy địa chỉ ví người dùng hợp lệ");
  }
//
//   console.log(product.id);
//   console.log(product.title);
//   console.log("saleDate đầu vào:", typeof product.saleDate);

  const saleDateObj = typeof product.saleDate === "string"
    ? new Date(product.saleDate)
    : product.saleDate;

  // 👇 Kiểm tra lại nếu vẫn lỗi
  if (!saleDateObj || isNaN(saleDateObj.getTime())) {
    // console.error("saleDate nhận được là:", product.saleDate);
    throw new Error("Invalid saleDate");
  }
  const count = await contract.getProductCount();
  // console.log("Amount:", count.toNumber())
  if (product.id >= count) throw new Error("Product ID không tồn tại trên chuỗi");
  const price = Math.floor(Number(product.price));
  // console.log("Đang cập nhật với dữ liệu:");
  // console.log("ID:", product.id);
  // console.log("productCode:", product.productCode);
  // console.log("title:", product.title);
  // console.log("category:", product.category);
  // console.log("price:", price);
  // console.log("unitShipped:", product.unitShipped);
  // console.log("unitSold:", product.unitSold);
  // console.log("unitOnHand:", product.unitOnHand);
  // console.log("supplier:", product.supplier);
  // console.log("farmLocation:", product.farmLocation);
  // console.log("saleDate:", Math.floor(saleDateObj.getTime() / 1000));
  // console.log("owner:", userIdAddress);
  // console.log(JSON.stringify({
  //   id: product.id,
  //   title: product.title,
  //   category: product.category,
  //   price: price,
  //   productCode: product.productCode,
  //   supplier: product.supplier,
  //   farmLocation: product.farmLocation,
  //   saleDate: Math.floor(saleDateObj.getTime() / 1000),
  //   userId: userIdAddress,
  // }));
  try {
    await contract.callStatic.updateProduct(
      product.id,
      product.productCode,
      product.title,
      product.category,
      price,
      product.unitShipped,
      product.unitSold,
      product.unitOnHand,
      product.supplier,
      product.farmLocation,
      Math.floor(saleDateObj.getTime() / 1000),
      userIdAddress
    );
  } catch (err: any) {
    console.error("Giao dịch sẽ bị revert. Lý do:", err);
    throw new Error(`Giao dịch bị từ chối: ${err?.reason || err?.message}`);
  }

  return await contract.updateProduct(
    product.id,
    product.productCode,
    product.title,
    product.category,
    price,
    product.unitShipped,
    product.unitSold,
    product.unitOnHand,
    product.supplier,
    product.farmLocation,
    Math.floor(saleDateObj.getTime() / 1000),
    userIdAddress,
  );
};
