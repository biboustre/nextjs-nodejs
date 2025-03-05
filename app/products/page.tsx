"use client";

import { useEffect, useState } from "react";
import { fetchProducts } from "../services/productService";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await fetchProducts();
        setProducts(products);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    };

    loadProducts();
  }, []);

  return (
    <section className="flex justify-center h-auto bg-gray-500">
      <section className="w-full max-w-6xl pt-20 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Products
        </h1>
        {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 h-auto">
          {products.map((product) => (
            <div
              key={product._id}
              className="relative p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              <h2 className="text-2xl font-bold text-gray-800">
                {product.name}
              </h2>
              <p className="mt-2 text-gray-600">{product.description}</p>
              <p className="mt-4 text-xl font-bold text-gray-800">
                ${product.price}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Stock: {product.stock}
              </p>
              <button className="mt-4 w-full px-4 py-2 font-bold text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
};

export default Products;
