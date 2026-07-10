import ProductCard from "../shared/ProductCard/ProductCard";
import type { T_product } from "../../types/api-types";

const Products = ({ products }: { products: T_product[] }) => {
  if (products.length === 0) return null;

  return (
    <ul className="flex flex-col items-stretch gap-3.75 w-full sm:flex-row sm:flex-wrap sm:justify-center">
      {products.map((product) => (
        <li key={product.id} className="list-none">
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
};

export default Products;
