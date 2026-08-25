import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingBag, Check } from "lucide-react";

const API_URL = "https://charming-bravery-production-9bdf.up.railway.app";

export default function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [adding, setAdding] = useState(false);
    const [added, setAdded] = useState(false);

    useEffect(() => {
        const loadProduct = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(
                    `${API_URL}/api/products/${id}`
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Product not found."
                    );
                }

                setProduct(data.product);
            } catch (err) {
                console.error("PRODUCT DETAILS ERROR:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadProduct();
    }, [id]);

    const addToCart = async () => {
        const token = localStorage.getItem("aromiq_token");

        if (!token) {
            navigate("/account");
            return;
        }

        try {
            setAdding(true);
            setError("");

            const response = await fetch(
                `${API_URL}/api/cart`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        productId: product.id,
                        quantity: 1,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Failed to add product to cart."
                );
            }

            setAdded(true);

            // Update Navbar cart count
            window.dispatchEvent(
                new Event("cartUpdated")
            );

            setTimeout(() => {
                navigate("/cart");
            }, 700);

        } catch (err) {
            console.error("ADD TO CART ERROR:", err);
            setError(err.message);
        } finally {
            setAdding(false);
        }
    };

    if (loading) {
        return (
            <section className="min-h-[70vh] bg-[#FDFBF7] flex items-center justify-center">
                <p className="text-xs tracking-[0.25em] uppercase text-[#7A695A]">
                    Loading fragrance...
                </p>
            </section>
        );
    }

    if (!product || error) {
        return (
            <section className="min-h-[70vh] bg-[#FDFBF7] flex items-center justify-center px-6">

                <div className="text-center">

                    <span className="text-xs tracking-[0.3em] uppercase text-[#7A695A]">
                        AROMIQ
                    </span>

                    <h1 className="mt-4 text-4xl font-serif text-[#260304]">
                        Product not found
                    </h1>

                    <p className="mt-4 text-sm text-[#6B625D]">
                        {error || "This fragrance does not exist."}
                    </p>

                    <Link
                        to="/collection"
                        className="inline-block mt-7 bg-[#260304] text-white px-7 py-4 text-xs tracking-[0.2em] uppercase"
                    >
                        Back to Collection
                    </Link>

                </div>

            </section>
        );
    }

    return (
        <section className="product-details min-h-screen bg-[#FDFBF7] px-6 lg:px-20 py-16">

            <div className="max-w-6xl mx-auto">

                <Link
                    to="/collection"
                    className="back-link inline-flex items-center gap-2 mb-10"
                >
                    <ArrowLeft size={16} />
                    BACK TO COLLECTION
                </Link>

                {error && (
                    <div className="mb-6 p-4 bg-[#F3E5E5] text-[#6B1719] text-sm">
                        {error}
                    </div>
                )}

                <div className="details-grid grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

                    {/* IMAGE */}

                    <div className="details-image bg-[#F5F0E6] rounded-2xl overflow-hidden">

                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-[550px] object-cover"
                        />

                    </div>

                    {/* DETAILS */}

                    <div className="details-content flex flex-col justify-center">

                        <span className="eyebrow text-xs tracking-[0.3em] uppercase text-[#7A695A] font-bold">
                            {product.category || "AROMIQ PERFUME"}
                        </span>

                        <h1 className="mt-4 text-5xl font-serif text-[#260304]">
                            {product.name}
                        </h1>

                        {/* PRICE */}

                        <div className="details-price mt-5 text-2xl font-bold text-[#260304]">
                            {Number(product.price).toFixed(2)} EGP
                        </div>

                        <p className="details-description mt-6 text-sm leading-7 text-[#5F5752]">
                            {product.description ||
                                "A carefully crafted fragrance from the Aromiq collection, created to leave an unforgettable impression."}
                        </p>

                        {/* NOTES */}

                        <div className="notes-box mt-8 border-t border-[#E8E1D7] pt-5">

                            <span className="block text-[10px] uppercase tracking-[0.25em] text-[#7A695A] font-bold">
                                FRAGRANCE NOTES
                            </span>

                            <strong className="block mt-2 text-sm text-[#260304] font-medium">
                                {product.notes ||
                                    "Elegant signature fragrance"}
                            </strong>

                        </div>

                        {/* SIZE */}

                        <div className="size-box mt-5 border-t border-[#E8E1D7] pt-5">

                            <span className="block text-[10px] uppercase tracking-[0.25em] text-[#7A695A] font-bold">
                                SIZE
                            </span>

                            <strong className="block mt-2 text-sm text-[#260304] font-medium">
                                {product.size || "50 ML"}
                            </strong>

                        </div>

                        {/* ADD TO CART */}

                        <button
                            onClick={addToCart}
                            disabled={adding || added}
                            className="dark-button add-button mt-8 w-full flex items-center justify-center gap-3 bg-[#260304] text-white px-8 py-5 text-xs tracking-[0.2em] uppercase font-bold disabled:opacity-70"
                        >

                            {added ? (
                                <>
                                    <Check size={17} />
                                    ADDED TO BAG
                                </>
                            ) : adding ? (
                                "ADDING..."
                            ) : (
                                <>
                                    <ShoppingBag size={17} />
                                    ADD TO BAG
                                </>
                            )}

                        </button>

                    </div>

                </div>

            </div>

        </section>
    );
}
