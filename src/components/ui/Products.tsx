import type { T_camera } from "../../types/api-types";
import ProductCard from "../shared/ProductCard/ProductCard";
import { useState } from "react";

const Products = ({ products }: { products: T_camera[] }) => {
  const [selectedProducts, setSelectedProducts] = useState<T_camera[]>([]);

  if (products.length === 0) return null;

  const handleSelect = (id: number) => {
    setSelectedProducts((prev) => {
      const exists = prev.some((p) => p.id === id);
      if (exists) return prev.filter((p) => p.id !== id);
      const product = products.find((p) => p.id === id);
      return product ? [...prev, product] : prev;
    });
  };

  return (
    <ul className="flex flex-col items-stretch gap-[15px] w-full sm:flex-row sm:flex-wrap sm:justify-center">
      {products.map((product) => (
        <li key={product.id} className="list-none">
          <ProductCard
            product={product}
            selected={selectedProducts.some((p) => p.id === product.id)}
            onSelect={handleSelect}
          />
        </li>
      ))}
    </ul>
  );
};

export default Products;
