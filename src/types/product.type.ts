export type ProductCardType = {
  id: number;
  title: string;
  category: string;
  image: string;
  price: number;
};

export type ProductType = ProductCardType & {
  productCode: string;
  unitShipped: number;
  unitSold: number;
  unitOnHand: number;
  supplier: string;
  farmLocation: string;
  saleDate: Date;
  owner: string;
};

export type ProductDataLoader = Record<
  number,
  ProductType
>;
