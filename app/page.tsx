"use client";

import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Navigation } from "./components/Navigation";
import { Product, ProductApiResponse } from "./types";
import { Card } from "./components/Card";

const PRODUCTS_PER_PAGE = 10;

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  // const filteredProducts = products.filter((product) => {
  //   if (activeTab === Categories) return product.category;
  // });

  const Categories = [
    { name: "All", label: "all" },
    { name: "Fragrances", label: "Fragrances" },
    { name: "Furniture", label: "Furniture" },
    { name: "Groceries", label: "Groceries" },
    { name: "Home Decoration", label: "Home Decoration" },
    { name: "Kitchen Accessories", label: "Kitchen Accessories" },
    { name: "Labtops", label: "Labtops" },
    { name: "Smartphones", label: "Smartphones" },
    { name: "Sport Accessories", label: "Sport Accessories" },
  ];
  useEffect(() => {
    let url = `https://dummyjson.com/products?limit=${PRODUCTS_PER_PAGE}&skip=${skip}`;
    if (search) {
      if (ac)
        url = `https://dummyjson.com/products/search?q=${search}&limit=${PRODUCTS_PER_PAGE}&skip=${skip}`;
    }
    fetch(url)
      .then((res) => {
        setLoading(true);
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

  // TODO 8: Хайлт хийх handler
  // function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
  //   setSearch(e.target.value);
  //   setSkip(0);
  // }
  // 194
  // skip=10
  // TODO 9: Pagination handler-ууд

  const totalPages = Math.ceil(total / PRODUCTS_PER_PAGE);
  const currentPage = Math.ceil(skip / PRODUCTS_PER_PAGE + 1);
  const handlePriv = () => {
    return setSkip(skip - PRODUCTS_PER_PAGE);
  };
  const handleNext = () => {
    return setSkip(skip + PRODUCTS_PER_PAGE);
  };
  // function handlePrev() { setSkip((s) => Math.max(0, s - PRODUCTS_PER_PAGE)); }
  // function handleNext() { setSkip((s) => s + PRODUCTS_PER_PAGE); }

  // TODO 10: Ачааллын төлөв (loading state)

  // TODO 11: Алдааны төлөв (error state)

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Header */}
      <Header />

      {/* Category Navigation */}
      {/* TODO 15: Идэвхтэй категорийг тодруулах, дарахад тухайн категорийн бүтээгдэхүүн шүүх */}
      {/* API: https://dummyjson.com/products/category/{category} */}
      <nav className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl px-6">
          <ul className="flex gap-1 overflow-x-auto py-3 no-scrollbar">
            <div>
              {Categories.map((cat) => {
                <Navigation category={cat.label} onClick={onClick}  />;
              })}
            </div>

            {/* <li>
              <button className="rounded-full px-4 py-1.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800">
                Beauty
              </button>
            </li>
            <li>
              <button className="rounded-full px-4 py-1.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800">
                Fragrances
              </button>
            </li>
            <li>
              <button className="rounded-full px-4 py-1.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800">
                Furniture
              </button>
            </li>
            <li>
              <button className="rounded-full px-4 py-1.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800">
                Groceries
              </button>
            </li>
            <li>
              <button className="rounded-full px-4 py-1.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800">
                Home Decoration
              </button>
            </li>
            <li>
              <button className="rounded-full px-4 py-1.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800">
                Kitchen Accessories
              </button>
            </li>
            <li>
              <button className="rounded-full px-4 py-1.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800">
                Laptops
              </button>
            </li>
            <li>
              <button className="rounded-full px-4 py-1.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800">
                Smartphones
              </button>
            </li>
            <li>
              <button className="rounded-full px-4 py-1.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800">
                Sports Accessories
              </button>
            </li>
            <li>
              <button className="rounded-full px-4 py-1.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800">
                Vehicle
              </button>
            </li> */}
          </ul>
        </div>
      </nav>

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
        <div className="mt-10 flex items-center justify-center gap-4">
          {/* TODO: onClick={handlePrev} disabled={skip === 0} холбох */}
          <button
            onClick={handlePriv}
            disabled={currentPage === 1}
            className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm transition-colors hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            &larr; Өмнөх
          </button>
          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            {/* TODO 14: Хуудасны дугаар харуулах */}
            {/* Хуудас {Math.floor(skip / PRODUCTS_PER_PAGE) + 1} / {Math.ceil(total / PRODUCTS_PER_PAGE)} */}
            Хуудас {currentPage} / {totalPages}
          </span>
          {/* TODO: onClick={handleNext} disabled={skip + PRODUCTS_PER_PAGE >= total} холбох */}
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm transition-colors hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            Дараах &rarr;
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl px-6 py-4 text-center text-xs text-zinc-400">
          Exercise App &middot; Data from dummyjson.com
        </div>
      </footer>
    </div>
  );
}

// БОНУС TODO 14: Компонент болгон задлах
//   - app/types/product.ts
//   - app/components/ProductCard.tsx
//   - app/components/SearchBar.tsx
//   - app/components/Pagination.tsx
//   - app/components/ProductList.tsx
//   - app/page.tsx
