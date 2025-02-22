import { ProductDataLoader } from "@/types/product.type";

class ProductDataSingleton {
  private static instance: ProductDataSingleton | null =
    null;
  private data!: ProductDataLoader;

  private constructor() {}

  private async loadData(): Promise<void> {
    try {
      const response = await fetch(
        "/data/products.json",
      );
      if (!response.ok) {
        throw new Error();
      }
      const json =
        (await response.json()) as Record<
          string,
          {
            product_name: string;
            category: string;
            price_per_kg: number;
            units_shipped_kg: number;
            units_sold_kg: number;
            units_on_hand_kg: number;
            supplier: string;
            farm_location: string;
            sale_date: string;
            image: string;
          }
        >;

      this.data = Object.entries(json).reduce(
        (acc, [key, value]) => {
          acc[key] = {
            id: key,
            name: value.product_name,
            image: value.image,
            price: value.price_per_kg,
            category: value.category,
            unitShipped: value.units_shipped_kg,
            unitOnHand: value.units_on_hand_kg,
            supplier: value.supplier,
            farmLocation: value.farm_location,
            saleDate: new Date(value.sale_date),
          };
          return acc;
        },
        {} as ProductDataLoader,
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public static async getInstance(): Promise<ProductDataSingleton> {
    if (!this.instance) {
      this.instance = new ProductDataSingleton();
      await this.instance.loadData();
    }
    return this.instance;
  }

  public getData() {
    return this.data;
  }
}

// Singleton instance for products.json
const productDataPromise =
  ProductDataSingleton.getInstance().then(
    (instance) => instance.getData(),
  );

export default productDataPromise;
