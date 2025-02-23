export type ProductCardType = {
  id: string;
  name: string;
  image: string;
  price: number;
};

export type ProductType = ProductCardType & {
  category: string;
  unitShipped: number;
  unitOnHand: number;
  supplier: string;
  farmLocation: string;
  saleDate: Date;
};

export type ProductDataLoader = Record<
  string,
  ProductType
>;
