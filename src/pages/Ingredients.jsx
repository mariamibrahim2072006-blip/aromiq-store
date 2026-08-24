import React from "react";
import { Link } from "react-router-dom";
import {
    ArrowRight,
    Sparkles,
    Flower2,
    Trees,
    Droplets,
    Gem,
} from "lucide-react";

const images = {
    // Luxury perfume on warm beige
    hero:
        "https://images.pexels.com/photos/14882100/pexels-photo-14882100.jpeg?auto=compress&cs=tinysrgb&w=1400",

    // Elegant perfume with soft beige / cream atmosphere
    ingredientsArt:
        "https://images.pexels.com/photos/14882099/pexels-photo-14882099.jpeg?auto=compress&cs=tinysrgb&w=1000",

    // Floral / soft luxury perfume
    perfume1:
        "https://images.pexels.com/photos/4110341/pexels-photo-4110341.jpeg?auto=compress&cs=tinysrgb&w=900",

    // Warm luxury perfume with golden lighting
    perfume2:
        "https://images.pexels.com/photos/12598073/pexels-photo-12598073.jpeg?auto=compress&cs=tinysrgb&w=900",

    // Elegant perfume on warm beige background
    perfume3:
        "https://images.pexels.com/photos/33711974/pexels-photo-33711974.jpeg?auto=compress&cs=tinysrgb&w=900",

    // Deep red / burgundy luxury perfume
    perfume4:
        "https://images.pexels.com/photos/10701986/pexels-photo-10701986.jpeg?auto=compress&cs=tinysrgb&w=900",
};
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

const notes = [
    {
        title: "Top Notes",
        subtitle: "THE FIRST IMPRESSION",
        description:
            "Fresh and luminous notes that create the first impression of a fragrance.",
        ingredients: ["Bergamot", "Citrus", "Pink Pepper"],
    },
    {
        title: "Heart Notes",
        subtitle: "THE SOUL OF THE SCENT",
        description:
            "The heart reveals the personality of the fragrance through elegant floral and aromatic compositions.",
        ingredients: ["Rose", "Jasmine", "Iris"],
    },
    {
        title: "Base Notes",
        subtitle: "THE LASTING MEMORY",
        description:
            "Deep and warm notes that remain on the skin and give the fragrance its lasting character.",
        ingredients: ["Oud", "Sandalwood", "Vanilla"],
    },
];

const families = [
    {
        title: "Floral",
        description:
            "Soft, elegant and expressive notes inspired by timeless flowers.",
        image: images.perfume1,
        icon: Flower2,
    },
    {
        title: "Woody",
        description:
            "Warm woods and sophisticated accords with depth and character.",
        image: images.perfume2,
        icon: Trees,
    },
    {
        title: "Fresh",
        description:
            "Clean, bright compositions created to feel effortless and refreshing.",
        image: images.perfume3,
        icon: Droplets,
    },
    {
        title: "Oriental",
        description:
            "Rich and mysterious accords inspired by warmth, spice and precious woods.",
        image: images.perfume4,
        icon: Gem,
    },
];

export default function Ingredients() {
    return (
        <main className="min-h-screen bg-[#FDFBF7] text-[#2C2A29]">

            {/* ================= HERO ================= */}

            <section className="px-6 lg:px-20 pt-16 lg:pt-24 pb-20">

                <div className="max-w-6xl mx-auto">

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                        <div>

                            <span className="text-xs tracking-[0.3em] uppercase text-[#7A695A] font-bold">
                                THE ART OF PERFUMERY
                            </span>

                            <h1 className="mt-5 text-5xl lg:text-6xl font-serif font-normal leading-tight text-[#1A1817]">
                                The ingredients
                                <br />
                                <span className="text-[#8C7A6B]">
                                    behind every scent.
                                </span>
                            </h1>

                            <p className="mt-6 max-w-xl text-sm lg:text-base leading-7 text-neutral-700 font-medium">
                                Every Aromiq fragrance begins with carefully selected notes.
                                From the first impression to the final dry-down, each
                                ingredient plays a role in creating a memorable scent.
                            </p>

                            <Link
                                to="/collection"
                                className="inline-flex items-center gap-3 mt-8 bg-[#260304] text-[#F7EFE8] px-7 py-4 text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#3b1214] transition shadow-sm"
                            >
                                Explore Collection
                                <ArrowRight size={16} />
                            </Link>

                        </div>

                        <div className="relative h-[440px] lg:h-[520px] rounded-2xl overflow-hidden bg-[#3B1214]">

                            <SafeImage
                                src={images.hero}
                                alt="Aromiq luxury perfume"
                                className="w-full h-full object-cover"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-[#260304]/75 via-[#260304]/10 to-transparent" />

                            <div className="absolute bottom-8 left-8">

                                <p className="text-[#F7EFE8] text-xs uppercase tracking-[0.3em] font-bold">
                                    AROMIQ
                                </p>

                                <p className="text-white text-lg font-serif mt-2 font-medium">
                                    Crafted with intention.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* ================= INTRO WITH ART IMAGE (تم إضافة الصورة الشيك هنا) ================= */}

            <section className="border-y border-[#E8E1D7] bg-[#F5F0E6] px-6 lg:px-20 py-16">

                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                        {/* الصورة الفنية المميزة اللي طلبتيها */}
                        <div className="relative h-[380px] lg:h-[450px] rounded-2xl overflow-hidden shadow-md">
                            <SafeImage
                                src={images.ingredientsArt}
                                alt="Fragrance Notes Art"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#260304]/40 via-transparent to-transparent" />
                        </div>

                        {/* الكلام التوضيحي */}
                        <div>
                            <Sparkles
                                size={22}
                                strokeWidth={1.8}
                                className="text-[#8C7A6B]"
                            />

                            <span className="block mt-4 text-xs tracking-[0.3em] uppercase text-[#7A695A] font-bold">
                                UNDERSTANDING FRAGRANCE
                            </span>

                            <h2 className="mt-3 text-3xl lg:text-4xl font-serif text-[#1A1817] font-normal">
                                Three layers. One signature.
                            </h2>

                            <p className="mt-4 text-sm lg:text-base leading-7 text-neutral-800 font-medium">
                                A fragrance evolves over time. Each layer appears at a different
                                moment, creating a scent that changes beautifully from the first
                                spray to the final trace, wrapping you in elegance.
                            </p>
                        </div>

                    </div>
                </div>

            </section>

            {/* ================= NOTES ================= */}

            <section className="px-6 lg:px-20 py-20 lg:py-24">

                <div className="max-w-6xl mx-auto">

                    <div className="mb-12">

                        <span className="text-xs tracking-[0.3em] uppercase text-[#7A695A] font-bold">
                            FRAGRANCE STRUCTURE
                        </span>

                        <h2 className="mt-3 text-3xl lg:text-4xl font-serif text-[#1A1817] font-normal">
                            Discover the notes
                        </h2>

                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 border-t border-[#E8E1D7]">

                        {notes.map((note, index) => (

                            <div
                                key={note.title}
                                className={`py-10 lg:px-8 ${index !== 0
                                    ? "lg:border-l border-[#E8E1D7]"
                                    : ""
                                    }`}
                            >

                                <span className="text-xs tracking-[0.25em] uppercase text-[#8C7A6B] font-bold">
                                    {note.subtitle}
                                </span>

                                <h3 className="mt-4 text-3xl font-serif text-[#1A1817] font-medium">
                                    {note.title}
                                </h3>

                                <p className="mt-4 text-sm leading-7 text-neutral-700 font-medium">
                                    {note.description}
                                </p>

                                <div className="mt-7 flex flex-wrap gap-2">

                                    {note.ingredients.map((ingredient) => (

                                        <span
                                            key={ingredient}
                                            className="px-3.5 py-2 bg-[#F5F0E6] text-xs uppercase tracking-[0.12em] text-[#5E5148] border border-[#E8E1D7] font-bold shadow-sm"
                                        >
                                            {ingredient}
                                        </span>

                                    ))}

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            </section>

            {/* ================= INGREDIENT FAMILIES ================= */}

            <section className="bg-[#260304] px-6 lg:px-20 py-20 lg:py-24">

                <div className="max-w-6xl mx-auto">

                    <div className="text-center mb-12">

                        <span className="text-xs tracking-[0.3em] uppercase text-[#D8C8BC] font-bold">
                            INGREDIENT FAMILIES
                        </span>

                        <h2 className="mt-3 text-3xl lg:text-4xl font-serif text-[#FDFBF7] font-normal">
                            Find the character you love.
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-[#F7EFE8]/80 max-w-2xl mx-auto font-medium">
                            Explore the different fragrance families that shape the Aromiq
                            collection.
                        </p>

                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

                        {families.map((family) => {

                            const Icon = family.icon;

                            return (
                                <Link
                                    key={family.title}
                                    to="/collection"
                                    className="group relative h-[390px] overflow-hidden rounded-xl bg-[#3B1214]"
                                >

                                    <SafeImage
                                        src={family.image}
                                        alt={family.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-[#180203] via-[#260304]/20 to-transparent" />

                                    <div className="absolute inset-x-0 bottom-0 p-6">

                                        <Icon
                                            size={23}
                                            strokeWidth={1.8}
                                            className="text-[#F5F0E6]"
                                        />

                                        <h3 className="mt-4 text-2xl font-serif text-white font-medium">
                                            {family.title}
                                        </h3>

                                        <p className="mt-2 text-xs leading-6 text-white/90 font-medium">
                                            {family.description}
                                        </p>

                                        <span className="inline-flex items-center gap-2 mt-5 text-xs uppercase tracking-[0.2em] text-[#F5F0E6] border-b border-[#F5F0E6] pb-1 font-bold">
                                            Explore
                                            <ArrowRight size={13} />
                                        </span>

                                    </div>

                                </Link>
                            );
                        })}

                    </div>

                </div>

            </section>

            {/* ================= QUOTE ================= */}

            <section className="px-6 lg:px-20 py-20 bg-[#F5F0E6]">

                <div className="max-w-4xl mx-auto text-center">

                    <span className="text-xs tracking-[0.3em] uppercase text-[#7A695A] font-bold">
                        THE AROMIQ PHILOSOPHY
                    </span>

                    <h2 className="mt-5 text-3xl lg:text-5xl font-serif leading-tight text-[#1A1817] font-normal">
                        “A beautiful fragrance is not
                        <br className="hidden lg:block" />
                        one note. It is a story.”
                    </h2>

                    <div className="w-12 h-px bg-[#8C7A6B] mx-auto mt-8" />

                    <p className="mt-6 text-xs text-[#7A695A] uppercase tracking-[0.2em] font-bold">
                        Aromiq
                    </p>

                </div>

            </section>

            {/* ================= CTA ================= */}

            <section className="bg-[#260304] px-6 lg:px-20 py-20 text-center">

                <div className="max-w-2xl mx-auto">

                    <span className="text-xs tracking-[0.3em] uppercase text-[#D8C8BC] font-bold">
                        FIND YOUR SIGNATURE
                    </span>

                    <h2 className="mt-4 text-4xl lg:text-5xl font-serif text-[#FDFBF7] font-normal">
                        Now discover your scent.
                    </h2>

                    <p className="mt-5 text-sm leading-7 text-[#F7EFE8]/85 font-medium">
                        Explore our collection and find the fragrance that feels
                        naturally yours.
                    </p>

                    <Link
                        to="/collection"
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