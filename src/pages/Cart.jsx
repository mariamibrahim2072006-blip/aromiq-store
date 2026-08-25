import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Trash2,
  Minus,
  Plus,
  ArrowRight,
  ShoppingBag,
} from "lucide-react";

const API_URL = "https://charming-bravery-production-9bdf.up.railway.app";

export default function Cart() {
  const navigate = useNavigate();

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("aromiq_token");

  const loadCart = async () => {
    if (!token) {
      setLoading(false);
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
        throw new Error(
          data.message || "Failed to load your bag."
        );
      }

      setCart(data.cart);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  // ==============================
  // UPDATE QUANTITY
  // ==============================

  const updateQuantity = async (itemId, quantity) => {
    if (quantity < 1) return;

    try {
      const response = await fetch(
        `${API_URL}/api/cart/${itemId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            quantity,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
          "Failed to update quantity."
        );
      }

      setCart((currentCart) => ({
        ...currentCart,
        items: currentCart.items.map((item) =>
          item.id === itemId ? data.item : item
        ),
      }));

      // Update Navbar
      window.dispatchEvent(
        new Event("cartUpdated")
      );

    } catch (err) {
      setError(err.message);
    }
  };

  // ==============================
  // REMOVE ITEM
  // ==============================

  const removeItem = async (itemId) => {
    try {
      const response = await fetch(
        `${API_URL}/api/cart/${itemId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
          "Failed to remove product."
        );
      }

      setCart((currentCart) => ({
        ...currentCart,
        items: currentCart.items.filter(
          (item) => item.id !== itemId
        ),
      }));

      // Update Navbar
      window.dispatchEvent(
        new Event("cartUpdated")
      );

    } catch (err) {
      setError(err.message);
    }
  };

  // ==============================
  // NOT LOGGED IN
  // ==============================

  if (!token) {
    return (
      <main className="min-h-screen bg-[#FDFBF7] flex items-center justify-center px-6">

        <div className="text-center max-w-md">

          <ShoppingBag
            size={38}
            strokeWidth={1.2}
            className="mx-auto text-[#8C7A6B]"
          />

          <span className="block mt-6 text-[10px] tracking-[0.3em] uppercase text-[#7A695A] font-bold">
            YOUR AROMIQ BAG
          </span>

          <h1 className="mt-4 text-4xl lg:text-5xl font-serif text-[#260304]">
            Your bag awaits.
          </h1>

          <p className="mt-5 text-sm leading-7 text-[#6B625D]">
            Sign in to view your saved fragrances and continue
            your shopping experience.
          </p>

          <Link
            to="/account"
            className="inline-flex items-center gap-3 mt-8 bg-[#260304] text-white px-8 py-4 text-xs uppercase tracking-[0.2em] font-bold"
          >
            Go to Account
            <ArrowRight size={15} />
          </Link>

        </div>

      </main>
    );
  }

  // ==============================
  // LOADING
  // ==============================

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">

        <div className="text-center">

          <div className="w-8 h-8 border border-[#8C7A6B] border-t-transparent rounded-full animate-spin mx-auto" />

          <p className="mt-5 text-[10px] tracking-[0.3em] uppercase text-[#7A695A]">
            Preparing your bag...
          </p>

        </div>

      </main>
    );
  }

  const items = cart?.items || [];

  const subtotal = items.reduce(
    (total, item) =>
      total +
      Number(item.product.price) *
      item.quantity,
    0
  );

  const shipping = subtotal > 0 ? 15 : 0;

  const total = subtotal + shipping;

  // ==============================
  // EMPTY CART
  // ==============================

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#FDFBF7]">

        <section className="max-w-6xl mx-auto px-6 lg:px-20 pt-20 pb-28">

          <div className="text-center max-w-xl mx-auto">

            <ShoppingBag
              size={42}
              strokeWidth={1}
              className="mx-auto text-[#8C7A6B]"
            />

            <span className="block mt-7 text-[10px] tracking-[0.3em] uppercase text-[#7A695A] font-bold">
              AROMIQ
            </span>

            <h1 className="mt-4 text-5xl font-serif text-[#260304]">
              Your bag is empty.
            </h1>

            <p className="mt-5 text-sm leading-7 text-[#6B625D]">
              Your next signature fragrance is waiting
              to be discovered.
            </p>

            <Link
              to="/collection"
              className="inline-flex items-center gap-3 mt-8 bg-[#260304] text-white px-8 py-4 text-xs uppercase tracking-[0.2em] font-bold"
            >
              Explore Collection
              <ArrowRight size={15} />
            </Link>

          </div>

        </section>

      </main>
    );
  }

  // ==============================
  // CART
  // ==============================

  return (
    <main className="min-h-screen bg-[#FDFBF7]">

      {/* HEADER */}

      <section className="border-b border-[#E8E1D7]">

        <div className="max-w-6xl mx-auto px-6 lg:px-20 py-16">

          <span className="text-[10px] tracking-[0.3em] uppercase text-[#7A695A] font-bold">
            YOUR AROMIQ BAG
          </span>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mt-4">

            <div>

              <h1 className="text-5xl lg:text-6xl font-serif font-normal text-[#260304]">
                Shopping Bag
              </h1>

              <p className="mt-4 text-sm text-[#6B625D]">
                {items.length}{" "}
                {items.length === 1
                  ? "fragrance"
                  : "fragrances"}{" "}
                selected for you.
              </p>

            </div>

            <Link
              to="/collection"
              className="text-xs uppercase tracking-[0.2em] text-[#7A695A] border-b border-[#7A695A] pb-1"
            >
              Continue Shopping
            </Link>

          </div>

        </div>

      </section>

      {/* ERROR */}

      {error && (
        <div className="max-w-6xl mx-auto px-6 lg:px-20 pt-6">

          <div className="p-4 bg-[#F3E5E5] text-[#6B1719] text-sm">
            {error}
          </div>

        </div>
      )}

      {/* CONTENT */}

      <section className="max-w-6xl mx-auto px-6 lg:px-20 py-12 lg:py-16">

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12">

          {/* ITEMS */}

          <div>

            <div className="border-t border-[#E8E1D7]">

              {items.map((item) => {

                const product = item.product;

                return (
                  <div
                    key={item.id}
                    className="py-7 border-b border-[#E8E1D7]"
                  >

                    <div className="flex gap-5 sm:gap-7">

                      {/* IMAGE */}

                      <Link
                        to={`/product/${product.id}`}
                        className="w-28 h-36 sm:w-36 sm:h-44 shrink-0 bg-[#F5F0E6] overflow-hidden"
                      >

                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover hover:scale-105 transition duration-500"
                        />

                      </Link>

                      {/* INFO */}

                      <div className="flex-1 min-w-0">

                        <div className="flex justify-between gap-4">

                          <div>

                            <span className="text-[9px] uppercase tracking-[0.25em] text-[#7A695A] font-bold">
                              {product.category ||
                                "AROMIQ PERFUME"}
                            </span>

                            <Link
                              to={`/product/${product.id}`}
                            >

                              <h2 className="mt-2 text-2xl font-serif text-[#260304] hover:text-[#7A695A] transition">
                                {product.name}
                              </h2>

                            </Link>

                            <p className="mt-2 text-sm text-[#6B625D]">
                              {Number(product.price).toFixed(2)} EGP
                            </p>

                          </div>

                          {/* REMOVE */}

                          <button
                            onClick={() =>
                              removeItem(item.id)
                            }
                            className="text-[#8C7A6B] hover:text-[#260304] transition p-2"
                            title="Remove"
                          >

                            <Trash2
                              size={17}
                              strokeWidth={1.5}
                            />

                          </button>

                        </div>

                        {/* BOTTOM */}

                        <div className="flex items-center justify-between mt-8">

                          {/* QUANTITY */}

                          <div className="flex items-center border border-[#DCD2C7]">

                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  item.quantity - 1
                                )
                              }
                              disabled={item.quantity <= 1}
                              className="w-10 h-10 flex items-center justify-center hover:bg-[#F5F0E6] transition disabled:opacity-30"
                            >
                              <Minus size={13} />
                            </button>

                            <span className="w-10 text-center text-sm">
                              {item.quantity}
                            </span>

                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  item.quantity + 1
                                )
                              }
                              className="w-10 h-10 flex items-center justify-center hover:bg-[#F5F0E6] transition"
                            >
                              <Plus size={13} />
                            </button>

                          </div>

                          {/* ITEM TOTAL */}

                          <strong className="text-base text-[#260304]">

                            {(
                              Number(product.price) *
                              item.quantity
                            ).toFixed(2)}{" "}
                            EGP

                          </strong>

                        </div>

                      </div>

                    </div>

                  </div>
                );
              })}

            </div>

          </div>

          {/* SUMMARY */}

          <aside className="lg:sticky lg:top-28 h-fit">

            <div className="bg-[#F5F0E6] p-7 lg:p-8">

              <span className="text-[10px] tracking-[0.25em] uppercase text-[#7A695A] font-bold">
                YOUR ORDER
              </span>

              <h2 className="mt-3 text-3xl font-serif text-[#260304]">
                Order Summary
              </h2>

              <div className="mt-8 space-y-5">

                <div className="flex justify-between text-sm text-[#5F5752]">

                  <span>Subtotal</span>

                  <strong className="text-[#260304]">
                    {subtotal.toFixed(2)} EGP
                  </strong>

                </div>

                <div className="flex justify-between text-sm text-[#5F5752]">

                  <span>Shipping</span>

                  <strong className="text-[#260304]">
                    {shipping.toFixed(2)} EGP
                  </strong>

                </div>

                <div className="border-t border-[#DCD2C7] pt-5 flex justify-between">

                  <span className="text-sm uppercase tracking-[0.15em] font-bold text-[#260304]">
                    Total
                  </span>

                  <strong className="text-xl text-[#260304]">
                    {total.toFixed(2)} EGP
                  </strong>

                </div>

              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full mt-8 bg-[#260304] text-white py-5 text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#3B1214] transition flex items-center justify-center gap-3"
              >
                Proceed to Checkout
                <ArrowRight size={15} />
              </button>

              <div className="mt-6 text-center">

                <p className="text-[10px] uppercase tracking-[0.15em] text-[#7A695A]">
                  Secure checkout
                </p>

                <p className="mt-2 text-xs text-[#6B625D]">
                  Your fragrance is reserved in your bag.
                </p>

              </div>

            </div>

          </aside>

        </div>

      </section>

    </main>
  );
}
