import { useEffect, useState } from "react";
import { ProductCategory } from "../types";
import Link from "next/link";
import { useParams } from "next/navigation";

export const Navigation = () => {
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const { slug } = useParams();
  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      });
  }, []);
  const activeClasses =
    "block rounded-full bg-zinc-900 px-4 py-1.5 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900";
  const defaultClasses =
    "block rounded-full px-4 py-1.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800";
  return (
    <div>
      <nav className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl px-6">
          <ul className="flex gap-1 overflow-x-auto py-3 no-scrollbar items-center">
            <li>
              <Link
                href={`/`}
                className={slug === undefined ? activeClasses : defaultClasses}
              >
                All
              </Link>
            </li>
            {categories.slice(0, 10).map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/category/${category.slug}`}
                  className={
                    slug === category.slug ? activeClasses : defaultClasses
                  }
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
};
