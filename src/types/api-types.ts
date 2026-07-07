export type T_camera = {
  id: number;
  title: string;
  desc: string;
  variants: [
    {
      color: string;
      image: string;
    },
    {
      color: string;
      image: string;
    },
    {
      color: string;
      image: string;
    },
  ];
  price: number;
  discount: number;
};

export interface I_products {
  cameras: T_camera[];
}
