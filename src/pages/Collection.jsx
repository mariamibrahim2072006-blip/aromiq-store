import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles, ShoppingBag, Check } from "lucide-react";

const API_URL = "https://aromiq-store-production.up.railway.app";

const collectionImages = {
    hero:
        "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1400&q=90",

    perfume1:
        "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=900&q=90",

    perfume2:
        "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=90",

    perfume3:
        "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=900&q=90",

    perfume4:
        "https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=900&q=90",

    perfume5:
        "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=900&q=90",

    perfume6:
        "https://images.unsplash.com/photo-1563170351-be82bc888aa4?auto=format&fit=crop&w=900&q=90",

    perfume7:
        "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=90",

    perfume8:
        "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=900&q=90",

    perfume9:
        "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=900&q=90",

    perfume10:
        "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=90",
};

const featuredProducts = [
    {
        id: 1,
        name: "Velvet Noir",
        price: "89.00",
        image: collectionImages.perfume1,
        label: "SIGNATURE",
    },
    {
        id: 2,
        name: "Oud Suprême",
        price: "99.00",
        image: collectionImages.perfume2,
        label: "BESTSELLER",
    },
    {
        id: 3,
        name: "Belle Éclat",
        price: "89.00",
        image: collectionImages.perfume3,
        label: "NEW",
    },
    {
        id: 4,
        name: "Lumière",
        price: "84.00",
        image: collectionImages.perfume4,
        label: "SIGNATURE",
    },
    {
        id: 5,
        name: "Eternal Blanc",
        price: "79.00",
        image: collectionImages.perfume5,
        label: "NEW",
    },
    {
        id: 6,
        name: "Rose Élégance",
        price: "94.00",
        image: collectionImages.perfume6,
        label: "FEMININE",
    },
    {
        id: 7,
        name: "Velvet Oud",
        price: "105.00",
        image: collectionImages.perfume7,
        label: "LUXURY",
    },
    {
        id: 8,
        name: "Santal Nocturne",
        price: "96.00",
        image: collectionImages.perfume8,
        label: "UNISEX",
    },
    {
        id: 9,
        name: "Éclat Rosé",
        price: "91.00",
        image: collectionImages.perfume9,
        label: "NEW",
    },
    {
        id: 10,
        name: "Maison Rouge",
        price: "109.00",
        image: collectionImages.perfume10,
        label: "EXCLUSIVE",
    },
];

function SafeImage({ src, alt, className = "" }) {
    return (
        <img
            src={src}
            alt={alt}
            loading="lazy"
            className={className}
            onError={(e) => {
                e.currentTarget.style.display = "none";
            }}
        />
    );
}

export default function Collection() {
    const navigate = useNavigate();

    const [addingProduct, setAddingProduct] = useState(null);
    const [addedProducts, setAddedProducts] = useState([]);

    // ==============================
    // ADD TO BAG
    // ==============================

    const addToBag = async (product) => {
        const token = localStorage.getItem("aromiq_token");

        // User must be logged in
        if (!token) {
            navigate("/account");
            return;
        }

        try {
            setAddingProduct(product.id);

            const response = await fetch(`${API_URL}/api/cart`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    productId: product.id,
                    quantity: 1,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to add product to bag."
                );
            }

            // Mark product as added
            setAddedProducts((current) => [
                ...current,
                product.id,
            ]);

            // Tell Navbar that cart changed
            window.dispatchEvent(new Event("cartUpdated"));

            // Remove "Added" state after 2 seconds
            setTimeout(() => {
                setAddedProducts((current) =>
                    current.filter((id) => id !== product.id)
                );
            }, 2000);

        } catch (error) {
            console.error("ADD TO BAG ERROR:", error);
            alert(error.message);
        } finally {
            setAddingProduct(null);
        }
    };

    return (
        <main className="min-h-screen bg-[#FDFBF7] text-[#2C2A29]">

            {/* ================= HERO ================= */}

            <section className="px-6 lg:px-20 pt-16 lg:pt-24 pb-14">
                <div className="max-w-6xl mx-auto">

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                        <div>

                            <span className="text-xs tracking-[0.3em] uppercase text-[#7A695A] font-bold">
                                THE AROMIQ COLLECTION
                            </span>

                            <h1 className="mt-4 text-5xl lg:text-6xl font-serif font-normal leading-tight text-[#1A1817]">
                                Fragrances made
                                <br />
                                <span className="text-[#8C7A6B]">
                                    to be remembered.
                                </span>
                            </h1>

                            <p className="mt-6 max-w-lg text-sm lg:text-base leading-7 text-neutral-800 font-medium">
                                Explore our carefully selected collection of elegant
                                fragrances. Each scent is created to express a different
                                mood, memory and personality.
                            </p>

                            <Link
                                to="/shop"
                                className="inline-flex items-center gap-3 mt-8 bg-[#260304] text-[#F7EFE8] px-7 py-4 text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#3b1214] transition shadow-sm"
                            >
                                Shop All Fragrances
                                <ArrowRight size={16} />
                            </Link>

                        </div>

                        {/* BURGUNDY PERFUME HERO */}

                        <div className="relative h-[420px] lg:h-[500px] rounded-2xl overflow-hidden bg-[#3B1214]">

                            <SafeImage
                                src={collectionImages.hero}
                                alt="Luxury burgundy perfume"
                                className="w-full h-full object-cover"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-[#260304]/60 via-transparent to-[#260304]/10" />

                            <div className="absolute bottom-7 left-7">

                                <p className="text-white text-xs uppercase tracking-[0.25em] font-bold">
                                    AROMIQ
                                </p>

                                <p className="text-white text-sm mt-1 font-medium">
                                    The art of fine fragrance
                                </p>

                            </div>

                        </div>

                    </div>
                </div>
            </section>

            {/* ================= INTRO ================= */}

            <section className="border-y border-[#E8E1D7] bg-[#F5F0E6] px-6 lg:px-20 py-16">

                <div className="max-w-4xl mx-auto text-center">

                    <Sparkles
                        size={22}
                        strokeWidth={1.8}
                        className="mx-auto text-[#8C7A6B]"
                    />

                    <span className="block mt-4 text-xs tracking-[0.3em] uppercase text-[#7A695A] font-bold">
                        FIND YOUR SIGNATURE
                    </span>

                    <h2 className="mt-3 text-3xl lg:text-4xl font-serif text-[#1A1817] font-normal">
                        A scent for every story.
                    </h2>

                    <p className="mt-4 text-sm lg:text-base leading-7 text-neutral-800 max-w-2xl mx-auto font-medium">
                        From deep and mysterious notes to soft and delicate compositions,
                        discover a fragrance that feels naturally yours.
                    </p>

                </div>

            </section>

            {/* ================= COLLECTION ================= */}

            <section className="px-6 lg:px-20 py-20 lg:py-24">

                <div className="max-w-6xl mx-auto">

                    <div className="mb-10">

                        <span className="text-xs tracking-[0.3em] uppercase text-[#7A695A] font-bold">
                            THE COLLECTION
                        </span>

                        <h2 className="mt-3 text-3xl lg:text-4xl font-serif text-[#1A1817] font-normal">
                            Discover our fragrances
                        </h2>

                        <p className="mt-3 text-sm text-neutral-800 font-medium">
                            A carefully selected world of elegant scents.
                        </p>

                    </div>

                    {/* 10 PERFUMES */}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-7 gap-y-12">

                        {featuredProducts.map((product) => {

                            const isAdding = addingProduct === product.id;
                            const isAdded = addedProducts.includes(product.id);

                            return (
                                <div
                                    key={product.id}
                                    className="group block"
                                >

                                    {/* PRODUCT IMAGE */}

                                    <Link
                                        to={`/product/${product.id}`}
                                        className="block"
                                    >

                                        <div className="relative h-[390px] overflow-hidden rounded-xl bg-[#F5F0E6]">

                                            <SafeImage
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-full object-cover group-hover:scale-[1.04] transition duration-700"
                                            />

                                            <div className="absolute inset-0 bg-gradient-to-t from-[#260304]/45 via-transparent to-transparent" />

                                            <div className="absolute top-5 left-5">

                                                <span className="bg-[#FDFBF7] text-[#2C2A29] px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] font-bold shadow-sm">
                                                    {product.label}
                                                </span>

                                            </div>

                                        </div>

                                    </Link>

                                    {/* PRODUCT INFO */}

                                    <div className="pt-5 px-1">

                                        <p className="text-[10px] uppercase tracking-[0.2em] text-[#7A695A] font-bold">
                                            AROMIQ PERFUME
                                        </p>

                                        <div className="flex items-center justify-between gap-3 mt-2">

                                            <Link
                                                to={`/product/${product.id}`}
                                            >
                                                <h3 className="font-serif text-xl text-[#1A1817] font-medium hover:text-[#7A695A] transition">
                                                    {product.name}
                                                </h3>
                                            </Link>

                                            <span className="text-sm text-[#1A1817] font-bold whitespace-nowrap">
                                                {Number(product.price).toFixed(2)} EGP
                                            </span>

                                        </div>

                                        <p className="mt-2 text-xs text-neutral-700 font-medium">
                                            Discover this fragrance
                                        </p>

                                        {/* ================= ADD TO BAG ================= */}

                                        <button
                                            type="button"
                                            onClick={() => addToBag(product)}
                                            disabled={isAdding}
                                            className={`w-full mt-4 flex items-center justify-center gap-2 px-5 py-3.5 text-[10px] uppercase tracking-[0.2em] font-bold transition ${isAdded
                                                    ? "bg-[#8C7A6B] text-white"
                                                    : "bg-[#260304] text-[#F7EFE8] hover:bg-[#3B1214]"
                                                } disabled:opacity-70`}
                                        >

                                            {isAdded ? (
                                                <>
                                                    <Check size={15} />
                                                    ADDED TO BAG
                                                </>
                                            ) : isAdding ? (
                                                "ADDING..."
                                            ) : (
                                                <>
                                                    <ShoppingBag size={15} />
                                                    ADD TO BAG
                                                </>
                                            )}

                                        </button>

                                    </div>

                                </div>
                            );
                        })}

                    </div>

                </div>

            </section>

            {/* ================= CATEGORIES ================= */}

            <section className="px-6 lg:px-20 pb-24">

                <div className="max-w-6xl mx-auto">

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        {[
                            {
                                title: "For Her",
                                text: "Soft, elegant and expressive fragrances.",
                                image: collectionImages.perfume6,
                            },
                            {
                                title: "For Him",
                                text: "Confident compositions with character.",
                                image: collectionImages.perfume7,
                            },
                            {
                                title: "Signature",
                                text: "Timeless scents made to become unforgettable.",
                                image: collectionImages.perfume10,
                            },
                        ].map((item) => (

                            <Link
                                key={item.title}
                                to="/shop"
                                className="group relative h-[280px] rounded-xl overflow-hidden"
                            >

                                <SafeImage
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                                />

                                <div className="absolute inset-0 bg-[#260304]/50 group-hover:bg-[#260304]/60 transition" />

                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">

                                    <span className="text-white text-[10px] uppercase tracking-[0.3em] font-semibold">
                                        AROMIQ
                                    </span>

                                    <h3 className="mt-3 text-3xl font-serif text-white font-normal">
                                        {item.title}
                                    </h3>

                                    <p className="mt-3 text-xs text-white/90 font-medium">
                                        {item.text}
                                    </p>

                                    <span className="mt-5 text-[10px] uppercase tracking-[0.2em] text-white border-b border-white pb-1 font-bold">
                                        Explore
                                    </span>

                                </div>

                            </Link>

                        ))}

                    </div>

                </div>

            </section>

            {/* ================= CTA ================= */}

            <section className="bg-[#260304] px-6 lg:px-20 py-20 text-center">

                <div className="max-w-2xl mx-auto">

                    <span className="text-xs tracking-[0.3em] uppercase text-[#F7EFE8] font-bold">
                        YOUR NEXT SIGNATURE
                    </span>

                    <h2 className="mt-4 text-4xl lg:text-5xl font-serif text-[#F7EFE8] font-normal">
                        Find the fragrance
                        <br />
                        that feels like you.
                    </h2>

                    <p className="mt-5 text-sm leading-7 text-[#F7EFE8]/90 font-medium">
                        Explore a collection of elegant perfumes created for every mood,
                        personality and unforgettable moment.
                    </p>

                    <Link
                        to="/shop"
                        className="inline-flex items-center gap-3 mt-8 bg-[#F5F0E6] text-[#260304] px-8 py-4 text-xs uppercase tracking-[0.2em] font-bold hover:bg-white transition shadow-sm"
                    >
                        Explore Collection
                        <ArrowRight size={16} />
                    </Link>

                </div>

            </section>

        </main>
    );
}
