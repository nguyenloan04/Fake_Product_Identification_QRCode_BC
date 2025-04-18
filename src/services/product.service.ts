import productDataPromise from "@/services/data.service";
import {ProductCardType, ProductType} from "@/types/product.type";
import { ethers } from 'ethers';
import ProductManagerABI from '@/abis/ProductManager.json';

export const getProductById = async (
  id: string,
): Promise<ProductType> => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await productDataPromise;
    const product = response[id];
    if (!product) {
      throw new Error("404");
    }
    return {
      ...product,
      id: id,
    };
  } catch (e) {
    throw e;
  }
};

export const getProductRandom = async (
  quantity: number,
): Promise<ProductCardType[]> => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await productDataPromise;
    const keys = Object.keys(response);
    if (keys.length === 0) return []; // Handle empty object case

    // Ensure quantity does not exceed available items
    const count = Math.min(quantity, keys.length);

    // Shuffle keys and pick the first `count` items
    const shuffledKeys = keys.sort(
      () => 0.5 - Math.random(),
    );

    return shuffledKeys
      .slice(0, count)
      .map((key) => response[key])
      .map((product) => ({
        ...product,
        id: product.id,
      }));
  } catch (e) {
    throw e;
  }
};
