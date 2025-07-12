// import productDataPromise from "@/services/data.service";
import { ProductCardType, ProductType } from "@/types/product.type";
import { ethers } from "ethers";
import ProductManagerABI from "@/abis/MainSystem.json";
import { getProductImage } from "@/utils/imageHelper";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export const getProductById = async (
  id: number,
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
    const contract = new ethers.Contract(contractAddress, ProductManagerABI, signer);
    const product = await contract.getProduct(id);
    console.log(product)
    if (!product) {
      throw new Error("404");
    }
    return {
      id: product[0],
      productCode: product[1].toString(),
      title: product[2].toString(),
      category: product[3].toString(),
      image: getProductImage(product[2].toString(), product[3].toString()),
      price: product[4].toNumber(),
      unitShipped: product[5],
      unitSold: product[6],
      unitOnHand: product[7],
      supplier: product[8].toString(),
      farmLocation: product[9].toString(),
      saleDate: product[10],
    };
  } catch (e) {
    throw e;
  }
};

// export const getProductRandom = async (
//   quantity: number,
// ): Promise<ProductCardType[]> => {
//   // eslint-disable-next-line no-useless-catch
//   try {
//     const response = await productDataPromise;
//     const keys = Object.keys(response);
//     if (keys.length === 0) return []; // Handle empty object case
//
//     // Ensure quantity does not exceed available items
//     const count = Math.min(quantity, keys.length);
//
//     // Shuffle keys and pick the first `count` items
//     const shuffledKeys = keys.sort(
//       () => 0.5 - Math.random(),
//     );
//
//     return shuffledKeys
//       .slice(0, count)
//       .map((key) => response[key])
//       .map((product) => ({
//         ...product,
//         id: product.id,
//       }));
//   } catch (e) {
//     throw e;
//   }
// };

export const getAllProducts = async (): Promise<ProductCardType[]> => {
  if (!window.ethereum) throw new Error("MetaMask not found");

  const provider = new ethers.providers.Web3Provider(window.ethereum);

  // 👇 Bước kiểm tra + yêu cầu ví kết nối
  const accounts = await provider.send("eth_requestAccounts", []);
  if (accounts.length === 0) {
    throw new Error("No MetaMask accounts found");
  }

  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, ProductManagerABI.abi, signer);

  const count = await contract.getProductCount();
  const products: ProductCardType[] = [];

  for (let i = 0; i < count; i++) {
    const product= await contract.getProduct(i);
    const productImage = getProductImage(product[2].toString(),product[3].toString());
    products.push({  id: i, title: product[2].toString() ,category: product[3].toString() , image: productImage,price: product[4].toNumber()});
  }
  console.log(products)
  return products;
};
