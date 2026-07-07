import { type I_products } from "../types/api-types";

export async function getProducts(): Promise<I_products | null> {
  try {
    const res = await fetch("/api/products");
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
