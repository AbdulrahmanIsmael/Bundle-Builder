import ProductCard from "../shared/ProductCard/ProductCard";
import type { T_product } from "../../types/api-types";

const Products = ({ products }: { products: T_product[] }) => {
  if (products.length === 0) return null;

  return (
    <ul className="flex flex-col items-stretch gap-3.75 w-full lg:grid lg:grid-cols-2 md:overflow-visible md:pb-0 md:gap-4 2xl:grid-cols-5">
      {products.map((product) => (
        <li
          key={product.id}
          className="list-none md:snap-start md:shrink-0 2xl:shrink"
        >
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
};

export default Products;
