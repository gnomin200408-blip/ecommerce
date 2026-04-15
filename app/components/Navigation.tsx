import React from "react";

export const Navigation = ({ category, isActive, onClick }) => {
  return (
    <li onClick={onClick}>
      <button
        className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
          isActive
            ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
            : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
        }`}
      >
        {category}
      </button>
    </li>
  );
};
