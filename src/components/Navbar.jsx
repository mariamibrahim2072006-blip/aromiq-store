import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  ShoppingBag,
  User,
  X,
  Menu,
} from "lucide-react";

const API_URL = "https://charming-bravery-production-9bdf.up.railway.app";

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [results, setResults] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  // ==============================
  // LOAD PRODUCTS
  // ==============================

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/api/products`);
        const data = await response.json();

        if (data.success) {
          setProducts(data.products || []);
        }
      } catch (error) {
        console.error("Search products error:", error);
      }
    };

    fetchProducts();
  }, []);

  // ==============================
  // LOAD CART COUNT
  // ==============================

  const loadCartCount = async () => {
    const token = localStorage.getItem("aromiq_token");

    if (!token) {
      setCartCount(0);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setCartCount(0);
        return;
      }

      const items = data.cart?.items || [];

      const totalQuantity = items.reduce(
        (total, item) => total + Number(item.quantity || 0),
        0
      );

      setCartCount(totalQuantity);
    } catch (error) {
      console.error("LOAD CART COUNT ERROR:", error);
      setCartCount(0);
    }
  };

  useEffect(() => {
    loadCartCount();

    const handleCartUpdate = () => {
      loadCartCount();
    };

    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  useEffect(() => {
    const handleFocus = () => {
      loadCartCount();
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  // ==============================
  // SEARCH
  // ==============================

  useEffect(() => {
    const value = searchTerm.trim().toLowerCase();

    if (!value) {
      setResults([]);
      return;
    }

    const filteredProducts = products.filter((product) => {
      const name = product.name?.toLowerCase() || "";
      const description =
        product.description?.toLowerCase() || "";

      return (
        name.includes(value) ||
        description.includes(value)
      );
    });

    setResults(filteredProducts);
  }, [searchTerm, products]);

  const handleSearchToggle = () => {
    setSearchOpen((prev) => !prev);

    if (searchOpen) {
      setSearchTerm("");
      setResults([]);
    }
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#260304] border-b border-[#3b1214]/50 text-[#FDFBF7]">

      {/* ================= NAVBAR ================= */}

      <div className="w-full px-4 sm:px-6 lg:px-20 py-4 flex items-center justify-between gap-4">

        {/* MOBILE MENU BUTTON */}

        <button
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="lg:hidden flex items-center justify-center shrink-0"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X size={21} strokeWidth={1.5} />
          ) : (
            <Menu size={21} strokeWidth={1.5} />
          )}
        </button>

        {/* LOGO */}

        <div className="flex-1 lg:flex-none">
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="font-serif text-xl sm:text-2xl tracking-[0.15em] uppercase text-[#FDFBF7]"
          >
            Aromiq
          </Link>
        </div>

        {/* DESKTOP NAVIGATION */}

        <nav className="hidden lg:flex items-center justify-center gap-6 xl:gap-8 text-[11px] uppercase tracking-[0.2em] font-medium text-[#F7EFE8]">

          <Link to="/" className="hover:text-white transition">
            Home
          </Link>

          <Link to="/about" className="hover:text-white transition">
            About
          </Link>

          <Link
            to="/collection"
            className="hover:text-white transition"
          >
            Collection
          </Link>

          <Link
            to="/ingredients"
            className="hover:text-white transition"
          >
            Ingredients
          </Link>

          <Link
            to="/contact"
            className="hover:text-white transition"
          >
            Contact
          </Link>

        </nav>

        {/* ICONS */}

        <div className="flex items-center justify-end gap-4 sm:gap-5 lg:gap-6 text-[#F7EFE8]">

          {/* SEARCH */}

          <button
            onClick={handleSearchToggle}
            className="hover:text-white transition"
            aria-label="Search"
          >
            {searchOpen ? (
              <X size={18} strokeWidth={1.5} />
            ) : (
              <Search size={18} strokeWidth={1.5} />
            )}
          </button>

          {/* ACCOUNT */}

          <Link
            to="/account"
            className="hover:text-white transition"
            aria-label="Account"
          >
            <User size={18} strokeWidth={1.5} />
          </Link>

          {/* CART */}

          <Link
            to="/cart"
            className="relative hover:text-white transition"
            aria-label="Cart"
          >
            <ShoppingBag size={18} strokeWidth={1.5} />

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#8C7A6B] text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>

        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}

      {mobileMenuOpen && (
        <nav className="lg:hidden border-t border-[#3b1214]/60 bg-[#260304] px-5 sm:px-6 py-5">

          <div className="flex flex-col gap-5 text-[11px] uppercase tracking-[0.2em] font-medium">

            <Link
              to="/"
              onClick={closeMobileMenu}
              className="hover:text-white transition"
            >
              Home
            </Link>

            <Link
              to="/about"
              onClick={closeMobileMenu}
              className="hover:text-white transition"
            >
              About
            </Link>

            <Link
              to="/collection"
              onClick={closeMobileMenu}
              className="hover:text-white transition"
            >
              Collection
            </Link>

            <Link
              to="/ingredients"
              onClick={closeMobileMenu}
              className="hover:text-white transition"
            >
              Ingredients
            </Link>

            <Link
              to="/contact"
              onClick={closeMobileMenu}
              className="hover:text-white transition"
            >
              Contact
            </Link>

          </div>
        </nav>
      )}

      {/* ================= SEARCH PANEL ================= */}

      {searchOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#260304] border-b border-[#3b1214]/60 px-4 sm:px-6 lg:px-20 py-5 shadow-xl">

          <div className="max-w-3xl mx-auto">

            <div className="flex items-center gap-3 border-b border-[#8C7A6B]/60 pb-3">

              <Search
                size={17}
                strokeWidth={1.5}
                className="text-[#D8C8BC] shrink-0"
              />

              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    handleSearchToggle();
                  }
                }}
                autoFocus
                placeholder="Search your signature scent..."
                className="flex-1 min-w-0 bg-transparent outline-none text-sm text-[#FDFBF7] placeholder:text-[#D8C8BC]/60"
              />

              {searchTerm && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setResults([]);
                  }}
                  className="text-[#D8C8BC] hover:text-white transition shrink-0"
                >
                  <X size={15} />
                </button>
              )}

            </div>

            {searchTerm.trim() && (
              <div className="mt-4 max-h-[350px] overflow-y-auto">

                {results.length > 0 ? (
                  <div className="space-y-2">

                    {results.map((product) => (
                      <Link
                        key={product.id}
                        to={`/product/${product.id}`}
                        onClick={() => {
                          setSearchOpen(false);
                          setSearchTerm("");
                          setResults([]);
                          closeMobileMenu();
                        }}
                        className="flex items-center gap-3 sm:gap-4 p-3 rounded-lg hover:bg-[#3B1214] transition"
                      >

                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-md overflow-hidden bg-[#F5F0E6] shrink-0">

                          {product.image ? (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[#8C7A6B]">
                              <Search size={16} />
                            </div>
                          )}

                        </div>

                        <div className="flex-1 min-w-0">

                          <h3 className="text-sm font-serif text-[#FDFBF7] truncate">
                            {product.name}
                          </h3>

                          {product.description && (
                            <p className="mt-1 text-[10px] text-[#D8C8BC]/60 line-clamp-1">
                              {product.description}
                            </p>
                          )}

                        </div>

                        <span className="text-[10px] sm:text-xs text-[#D8C8BC] shrink-0">
                          {Number(product.price).toFixed(2)} EGP
                        </span>

                      </Link>
                    ))}

                  </div>
                ) : (
                  <div className="py-8 text-center">

                    <p className="text-sm font-serif text-[#FDFBF7]">
                      No fragrances found.
                    </p>

                    <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-[#D8C8BC]/60">
                      Try another scent
                    </p>

                  </div>
                )}

              </div>
            )}

          </div>
        </div>
      )}

    </header>
  );
}
