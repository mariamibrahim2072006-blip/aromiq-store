import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";

import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

export default function Shop() {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");

  const categories = [
    "All",
    "For Him",
    "For Her",
    "Unisex",
  ];

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory =
        filter === "All" ||
        product.category === filter;

      const matchesSearch =
        !search ||
        product.name
          ?.toLowerCase()
          .includes(search) ||
        product.brand
          ?.toLowerCase()
          .includes(search) ||
        product.type
          ?.toLowerCase()
          .includes(search);

      return matchesCategory && matchesSearch;
    });
  }, [filter, query]);

  return (
    <section className="min-h-screen bg-[#FDFBF7] text-[#2C2A29] px-6 lg:px-20 py-16 lg:py-24">

      {/* ==============================
          HEADER
      ============================== */}

      <motion.div
        className="max-w-6xl mx-auto"
        initial={{
          opacity: 0,
          y: 25,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
      >

        <span className="text-[11px] tracking-[0.3em] uppercase text-neutral-400">
          THE COLLECTION
        </span>

        <h1 className="text-5xl lg:text-6xl font-serif font-light mt-3">
          Shop fragrances
        </h1>

        <p className="text-sm text-neutral-500 mt-4">
          Discover your next signature.
        </p>

      </motion.div>

      {/* ==============================
          TOOLBAR
      ============================== */}

      <div className="max-w-6xl mx-auto mt-12">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 border-y border-[#E8E1D7] py-5">

          {/* FILTERS */}

          <div className="flex items-center gap-2 flex-wrap">

            <SlidersHorizontal
              size={15}
              className="text-neutral-400 mr-2"
            />

            {categories.map((category) => (

              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`
                  px-4 py-2
                  text-[10px]
                  uppercase
                  tracking-[0.15em]
                  border
                  transition
                  duration-300
                  ${filter === category
                    ? "bg-[#2C2A29] text-white border-[#2C2A29]"
                    : "bg-transparent text-neutral-600 border-neutral-200 hover:border-[#2C2A29]"
                  }
                `}
              >
                {category}
              </button>

            ))}

          </div>

          {/* SEARCH */}

          <div className="relative w-full lg:w-72">

            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
            />

            <input
              value={query}
              onChange={(event) =>
                setQuery(event.target.value)
              }
              placeholder="Search fragrance..."
              className="w-full bg-white border border-neutral-200 pl-11 pr-4 py-3 text-xs outline-none focus:border-[#2C2A29] transition"
            />

          </div>

        </div>

      </div>

      {/* ==============================
          RESULTS
      ============================== */}

      <div className="max-w-6xl mx-auto">

        <div className="flex justify-between items-center mt-10 mb-8">

          <p className="text-xs text-neutral-400 uppercase tracking-widest">
            {filtered.length}{" "}
            {filtered.length === 1
              ? "fragrance"
              : "fragrances"}
          </p>

          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-[10px] uppercase tracking-widest border-b border-neutral-400 hover:border-black transition"
            >
              Clear search
            </button>
          )}

        </div>

        {/* ==============================
            PRODUCTS
        ============================== */}

        {filtered.length > 0 ? (

          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-7 gap-y-12"
          >

            <AnimatePresence mode="popLayout">

              {filtered.map((product) => (

                <motion.div
                  key={product.id}
                  layout
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.95,
                  }}
                  transition={{
                    duration: 0.35,
                  }}
                >

                  <ProductCard product={product} />

                </motion.div>

              ))}

            </AnimatePresence>

          </motion.div>

        ) : (

          /* ==============================
              NO RESULTS
          ============================== */

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            className="min-h-[350px] flex flex-col items-center justify-center text-center"
          >

            <div className="w-14 h-14 rounded-full bg-[#F5F0E6] flex items-center justify-center mb-5">

              <Search
                size={20}
                className="text-neutral-400"
              />

            </div>

            <h2 className="font-serif text-2xl">
              No fragrances found
            </h2>

            <p className="text-sm text-neutral-400 mt-2 max-w-sm">
              Try another fragrance name or choose a different
              category.
            </p>

            <button
              onClick={() => {
                setQuery("");
                setFilter("All");
              }}
              className="mt-6 bg-[#2C2A29] text-white px-7 py-3 text-[10px] uppercase tracking-[0.2em] hover:bg-black transition"
            >
              View all fragrances
            </button>

          </motion.div>

        )}

      </div>

    </section>
  );
}