export type T_product = {
  id: number;
  title: string;
  desc: string;
  variants?: {
    color: string;
    image: string;
  }[];
  image?: string;
  price: number;
  discount: number;
};

export interface I_products {
  cameras: T_product[];
  plans: T_product[];
  sensors: T_product[];
  accessories: T_product[];
}
