"use client";

import { useState, useEffect } from "react";
import { Header } from "@/app/components/Header";
import { Product } from "@/app/types";
import { Card } from "@/app/components/Card";
import { Navigation } from "@/app/components/Navigation";
import { Pagination } from "@/app/components/Pagination";
import { Footer } from "@/app/components/Footer";
import { useParams } from "next/navigation";

const PRODUCTS_PER_PAGE = 10;

export default function Home() {
  const { slug } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const url = `https://dummyjson.com/products/category/${slug}?limit=${PRODUCTS_PER_PAGE}&skip=${skip}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setTotal(data.total);
        setLoading(false);
      });
  }, [skip, slug]);

  const totalPages = Math.ceil(total / PRODUCTS_PER_PAGE);
  const currentPage = Math.ceil(skip / PRODUCTS_PER_PAGE + 1);

  if (loading) {
    return <div className="w-full py-20 text-center text-2xl">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Header */}
      <Header />

      <Navigation />

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-10">
        {/* Search */}
        <div className="mb-8">
          {/* TODO: value={search} onChange={handleSearch} холбох */}
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
          {/* TODO 12: Бүтээгдэхүүний тоо харуулах */}
          {total} products found
        </p>

        {/* TODO 13: Доорх hardcode-г products.map() ашиглан солих */}
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
