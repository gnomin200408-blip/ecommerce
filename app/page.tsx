"use client";

import { useState, useEffect, useContext } from "react";
import { Header } from "./components/Header";
import { Product, ProductApiResponse } from "./types";
import { Card } from "./components/Card";
import { Navigation } from "./components/Navigation";
import { Pagination } from "./components/Pagination";
import { Footer } from "./components/Footer";
import { UserContext } from "./providers/user-provider";

const PRODUCTS_PER_PAGE = 10;

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    let url = `https://dummyjson.com/products?limit=${PRODUCTS_PER_PAGE}&skip=${skip}`;
    if (search) {
      url = `https://dummyjson.com/products/search?q=${search}&limit=${PRODUCTS_PER_PAGE}&skip=${skip}`;
    }
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data: ProductApiResponse) => {
        setProducts(data.products);
        setTotal(data.total);
        setSkip(data.skip);
        setLoading(false);
      })
      .catch(() => {
        setError("aldaa garlaa");
      });
  }, [skip, search]);

  const totalPages = Math.ceil(total / PRODUCTS_PER_PAGE);
  const currentPage = Math.ceil(skip / PRODUCTS_PER_PAGE + 1);
  const handlePrev = () => {
    return setSkip(skip - PRODUCTS_PER_PAGE);
  };
  const handleNext = () => {
    return setSkip(skip + PRODUCTS_PER_PAGE);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Header */}
      <Header />

      <Navigation />

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-10">
        {/* Search */}
        <div className="mb-8">
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            type="text"
            placeholder="Бүтээгдэхүүн хайх..."
            className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 shadow-sm outline-none transition-colors focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-zinc-500 dark:focus:ring-zinc-800 sm:max-w-md"
          />
        </div>

        <p className="mb-6 text-sm text-zinc-500 dark:text-zinc-400">
          {total} products found
        </p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Card 1 */}
          {products.map((product) => (
            <Card product={product} key={product.id} />
          ))}
        </div>

        {/* Pagination */}
        <div>
          <Pagination
            handlePrev={() => {
              setSkip(skip - PRODUCTS_PER_PAGE);
            }}
            handleNext={() => {
              setSkip(skip + PRODUCTS_PER_PAGE);
            }}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
