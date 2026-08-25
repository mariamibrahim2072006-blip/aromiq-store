import React from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Heart,
  ShieldCheck,
  Truck,
  Headphones,
  Gem,
  ArrowRight,
} from "lucide-react";

const perfumeImages = {
  // Burgundy / elegant perfume hero
  hero:
    "https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=1400&q=90",

  // Warm neutral luxury perfume
  bottle:
    "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1200&q=90",

  // Soft rose / burgundy perfume
  perfume:
    "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1200&q=90",

  // Elegant warm perfume
  luxury:
    "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1200&q=90",
};

function SafeImage({ src, alt, className }) {
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

export default function About() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2C2A29] overflow-hidden">

      {/* ================= HERO ================= */}
      <section
        className="relative min-h-[520px] flex items-center bg-cover bg-center"
        style={{
          backgroundImage: `
            linear-gradient(
              90deg,
              rgba(38,3,4,.94) 0%,
              rgba(38,3,4,.78) 42%,
              rgba(38,3,4,.30) 100%
            ),
            url("${perfumeImages.hero}")
          `,
        }}
      >
        <div className="absolute inset-0 bg-[#260304]/10" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-16 py-24">
          <div className="max-w-2xl">

            <span className="text-[#F5F0E6] text-xs tracking-[0.35em] uppercase font-bold">
              ABOUT AROMIQ
            </span>

            <h1 className="mt-5 text-5xl md:text-6xl lg:text-7xl font-serif font-normal leading-[1.05] text-[#FDFBF7]">
              The Art of
              <br />
              <span className="text-[#E8C9C7] font-medium">
                Fine Fragrance
              </span>
            </h1>

            <p className="mt-7 text-base md:text-lg text-[#FDFBF7]/90 leading-8 max-w-xl font-medium">
              We create luxurious perfumes inspired by memories, emotions,
              and the beauty of everyday moments. Every fragrance is carefully
              designed to leave a lasting impression.
            </p>

            <Link
              to="/shop"
              className="inline-flex items-center gap-3 mt-9 bg-[#F5F0E6] text-[#260304] px-7 py-4 text-sm font-bold uppercase tracking-wider hover:bg-white transition"
            >
              Discover Collection
              <ArrowRight size={17} />
            </Link>

          </div>
        </div>
      </section>


      {/* ================= FEATURED ================= */}
      <section className="bg-[#FDFBF7] py-24 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto">

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">

            {/* TEXT */}
            <div className="lg:col-span-1 flex flex-col justify-center">

              <span className="text-[#8C7A6B] text-sm uppercase tracking-[0.3em] font-bold">
                Our Philosophy
              </span>

              <h2 className="text-4xl md:text-5xl font-serif font-normal mt-4 leading-tight text-[#1A1817]">
                The perfection
                <br />
                <span className="text-[#260304] font-medium">
                  in every drop.
                </span>
              </h2>

              <p className="mt-6 text-[#2C2A29]/80 text-base leading-8 font-medium">
                Aromiq believes that perfume is not simply something you wear.
                It becomes part of your identity, your memories and the way
                people remember you.
              </p>

            </div>


            {/* PERFUME IMAGE 1 */}
            <div className="relative min-h-[380px] rounded-2xl overflow-hidden border border-[#E8E1D7] bg-[#F5F0E6]">

              <SafeImage
                src={perfumeImages.bottle}
                alt="Aromiq luxury perfume bottle"
                className="absolute inset-0 w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#260304]/85 via-[#260304]/15 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-7">

                <Gem
                  className="text-[#E8C9C7] mb-4"
                  size={30}
                />

                <h3 className="text-2xl font-serif text-white font-medium">
                  Premium Fragrance
                </h3>

                <p className="text-white/90 mt-2 leading-6 font-medium">
                  Sophisticated scents created for people who appreciate
                  genuine luxury.
                </p>

              </div>
            </div>


            {/* PERFUME IMAGE 2 */}
            <div className="relative min-h-[380px] rounded-2xl overflow-hidden border border-[#E8E1D7] bg-[#F5F0E6]">

              <SafeImage
                src={perfumeImages.perfume}
                alt="Elegant perfume bottle"
                className="absolute inset-0 w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#260304]/85 via-[#260304]/15 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-7">

                <Sparkles
                  className="text-[#E8C9C7] mb-4"
                  size={30}
                />

                <h3 className="text-2xl font-serif text-white font-medium">
                  Signature Scents
                </h3>

                <p className="text-white/90 mt-2 leading-6 font-medium">
                  Elegant perfume compositions created for every personality
                  and every unforgettable moment.
                </p>

              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ================= STATS ================= */}
      <section className="border-y border-[#E8E1D7] bg-[#F5F0E6]">

        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4">

          {[
            ["13", "Years Experience"],
            ["20+", "Luxury Perfumes"],
            ["100+", "Happy Customers"],
            ["11", "Collections"],
          ].map(([number, label]) => (

            <div
              key={label}
              className="py-12 text-center border-[#E8E1D7] lg:border-r last:border-r-0"
            >

              <div className="text-4xl font-serif font-medium text-[#260304]">
                {number}
              </div>

              <div className="mt-2 text-sm text-[#7A695A] uppercase tracking-wider font-semibold">
                {label}
              </div>

            </div>

          ))}

        </div>
      </section>


      {/* ================= STORY ================= */}
      <section className="py-24 px-6 lg:px-16 bg-[#FDFBF7]">

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          <div className="relative h-[500px] rounded-2xl overflow-hidden border border-[#E8E1D7]">

            <SafeImage
              src={perfumeImages.luxury}
              alt="Aromiq luxury perfume"
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#260304]/70 to-transparent" />

            <div className="absolute bottom-7 left-7">

              <span className="text-[#F5F0E6] text-sm uppercase tracking-[0.25em] font-bold">
                Aromiq
              </span>

              <h3 className="text-3xl font-serif text-white font-medium mt-2">
                A new fresh sensation
              </h3>

            </div>

          </div>


          <div>

            <span className="text-[#8C7A6B] text-sm uppercase tracking-[0.3em] font-bold">
              Our Story
            </span>

            <h2 className="text-4xl md:text-5xl font-serif font-normal mt-5 leading-tight text-[#1A1817]">
              More than
              <br />
              <span className="text-[#260304] font-medium">
                just perfume.
              </span>
            </h2>

            <p className="mt-7 text-[#2C2A29]/85 text-base leading-8 font-medium">
              Aromiq was created from a simple idea: every person deserves a
              fragrance that feels uniquely theirs.
            </p>

            <p className="mt-5 text-[#2C2A29]/75 text-base leading-8 font-medium">
              From the first note to the final dry-down, our fragrances are
              designed with balance, character and elegance in mind. We
              carefully select ingredients and combine traditional perfume
              craftsmanship with a modern aesthetic.
            </p>

            <p className="mt-5 text-[#2C2A29]/75 text-base leading-8 font-medium">
              Whether you prefer fresh citrus, warm oud, soft florals or deep
              oriental notes, our collection is designed to help you discover
              your signature scent.
            </p>

            <Link
              to="/shop"
              className="inline-flex items-center gap-3 mt-8 border border-[#260304] text-[#260304] px-7 py-3.5 uppercase tracking-wider text-sm font-bold hover:bg-[#260304] hover:text-[#F7EFE8] transition"
            >
              Explore Perfumes
              <ArrowRight size={17} />
            </Link>

          </div>

        </div>
      </section>


      {/* ================= BENEFITS ================= */}
      <section className="py-24 px-6 lg:px-16 bg-[#F5F0E6]">
        <div className="max-w-7xl mx-auto">

          {/* SECTION HEADER */}
          <div className="text-center mb-16">

            <span className="inline-flex items-center gap-3 text-[#7A695A] text-xs uppercase tracking-[0.35em] font-semibold">
              <span className="w-8 h-px bg-[#8C7A6B]" />
              WHY CHOOSE AROMIQ
              <span className="w-8 h-px bg-[#8C7A6B]" />
            </span>

            <h2 className="text-4xl md:text-5xl font-serif font-normal text-[#1A1817] mt-5">
              The Aromiq Difference
            </h2>

            <p className="max-w-2xl mx-auto mt-5 text-sm md:text-base text-[#5F5752] leading-7">
              Thoughtful details, refined fragrances and a beautiful experience
              from the first impression to the final note.
            </p>

          </div>

          {/* BENEFITS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* CARD 1 */}
            <div className="group bg-[#FDFBF7] border border-[#E4D9CC] p-10 text-center rounded-2xl hover:border-[#8C7A6B] hover:-translate-y-1 transition-all duration-500">

              <div className="w-16 h-16 mx-auto rounded-full bg-[#260304] flex items-center justify-center shadow-sm group-hover:scale-105 transition duration-500">
                <Truck
                  className="text-[#F5F0E6]"
                  size={26}
                  strokeWidth={1.5}
                />
              </div>

              <span className="block mt-7 text-[10px] uppercase tracking-[0.25em] text-[#8C7A6B] font-semibold">
                AROMIQ SERVICE
              </span>

              <h3 className="text-xl font-serif text-[#1A1817] mt-3">
                Fast Delivery
              </h3>

              <p className="text-[#6B625C] mt-4 leading-7 text-sm">
                Your favorite fragrances delivered safely and quickly
                to your doorstep.
              </p>

            </div>

            {/* CARD 2 */}
            <div className="group bg-[#260304] border border-[#3B1214] p-10 text-center rounded-2xl hover:-translate-y-1 transition-all duration-500">

              <div className="w-16 h-16 mx-auto rounded-full bg-[#F5F0E6] flex items-center justify-center shadow-sm group-hover:scale-105 transition duration-500">
                <ShieldCheck
                  className="text-[#260304]"
                  size={26}
                  strokeWidth={1.5}
                />
              </div>

              <span className="block mt-7 text-[10px] uppercase tracking-[0.25em] text-[#C9B8A8] font-semibold">
                AROMIQ QUALITY
              </span>

              <h3 className="text-xl font-serif text-[#FDFBF7] mt-3">
                Authentic Products
              </h3>

              <p className="text-[#F7EFE8]/70 mt-4 leading-7 text-sm">
                Carefully selected fragrances with a focus on quality
                and authenticity.
              </p>

            </div>

            {/* CARD 3 */}
            <div className="group bg-[#FDFBF7] border border-[#E4D9CC] p-10 text-center rounded-2xl hover:border-[#8C7A6B] hover:-translate-y-1 transition-all duration-500">

              <div className="w-16 h-16 mx-auto rounded-full bg-[#260304] flex items-center justify-center shadow-sm group-hover:scale-105 transition duration-500">
                <Headphones
                  className="text-[#F5F0E6]"
                  size={26}
                  strokeWidth={1.5}
                />
              </div>

              <span className="block mt-7 text-[10px] uppercase tracking-[0.25em] text-[#8C7A6B] font-semibold">
                AROMIQ CARE
              </span>

              <h3 className="text-xl font-serif text-[#1A1817] mt-3">
                24/7 Support
              </h3>

              <p className="text-[#6B625C] mt-4 leading-7 text-sm">
                Our team is always ready to help you choose the
                perfect scent.
              </p>

            </div>

          </div>

        </div>
      </section>
      {/* ================= VALUES ================= */}
      <section className="py-24 px-6 lg:px-16 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto">

          {/* SECTION HEADER */}
          <div className="text-center mb-16">

            <span className="inline-flex items-center gap-3 text-[#7A695A] text-xs uppercase tracking-[0.35em] font-semibold">
              <span className="w-8 h-px bg-[#8C7A6B]" />
              OUR VALUES
              <span className="w-8 h-px bg-[#8C7A6B]" />
            </span>

            <h2 className="text-4xl md:text-5xl font-serif font-normal text-[#1A1817] mt-5">
              What makes us different
            </h2>

            <p className="max-w-2xl mx-auto mt-5 text-sm md:text-base text-[#6B625C] leading-7">
              Every detail is thoughtfully created to make the Aromiq experience
              feel elegant, personal and unforgettable.
            </p>

          </div>

          {/* VALUES */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* VALUE 1 */}
            <div className="group relative bg-[#F5F0E6] border border-[#E4D9CC] rounded-2xl p-9 hover:-translate-y-1 hover:border-[#8C7A6B] transition-all duration-500">

              <div className="flex items-center justify-between">

                <span className="text-[10px] tracking-[0.25em] uppercase text-[#8C7A6B] font-semibold">
                  01
                </span>

                <Sparkles
                  className="text-[#260304]"
                  size={27}
                  strokeWidth={1.5}
                />

              </div>

              <h3 className="font-serif text-2xl text-[#1A1817] mt-10">
                Exceptional Quality
              </h3>

              <div className="w-10 h-px bg-[#8C7A6B] mt-5" />

              <p className="text-[#6B625C] mt-5 leading-7 text-sm">
                We focus on refined compositions and carefully selected
                fragrance ingredients to create scents that feel truly special.
              </p>

            </div>

            {/* VALUE 2 */}
            <div className="group relative bg-[#260304] border border-[#3B1214] rounded-2xl p-9 hover:-translate-y-1 transition-all duration-500">

              <div className="flex items-center justify-between">

                <span className="text-[10px] tracking-[0.25em] uppercase text-[#C9B8A8] font-semibold">
                  02
                </span>

                <Heart
                  className="text-[#F5F0E6]"
                  size={27}
                  strokeWidth={1.5}
                />

              </div>

              <h3 className="font-serif text-2xl text-[#FDFBF7] mt-10">
                Made With Passion
              </h3>

              <div className="w-10 h-px bg-[#8C7A6B] mt-5" />

              <p className="text-[#F7EFE8]/70 mt-5 leading-7 text-sm">
                Every fragrance is created with attention to detail and
                a genuine love for the art of perfumery.
              </p>

            </div>

            {/* VALUE 3 */}
            <div className="group relative bg-[#F5F0E6] border border-[#E4D9CC] rounded-2xl p-9 hover:-translate-y-1 hover:border-[#8C7A6B] transition-all duration-500">

              <div className="flex items-center justify-between">

                <span className="text-[10px] tracking-[0.25em] uppercase text-[#8C7A6B] font-semibold">
                  03
                </span>

                <Gem
                  className="text-[#260304]"
                  size={27}
                  strokeWidth={1.5}
                />

              </div>

              <h3 className="font-serif text-2xl text-[#1A1817] mt-10">
                Luxury Experience
              </h3>

              <div className="w-10 h-px bg-[#8C7A6B] mt-5" />

              <p className="text-[#6B625C] mt-5 leading-7 text-sm">
                From the bottle to the final scent, every detail is designed
                to make your fragrance experience feel premium.
              </p>

            </div>

          </div>

        </div>
      </section>












      {/* ================= CTA ================= */}
      <section
        className="relative py-28 px-6 text-center bg-cover bg-center"
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(38,3,4,.91),
              rgba(38,3,4,.94)
            ),
            url("${perfumeImages.hero}")
          `,
        }}
      >

        <div className="relative max-w-3xl mx-auto">

          <span className="text-[#E8C9C7] text-sm uppercase tracking-[0.35em] font-bold">
            FIND YOUR SCENT
          </span>

          <h2 className="text-4xl md:text-6xl font-serif font-normal text-[#FDFBF7] mt-5">
            Find your signature fragrance.
          </h2>

          <p className="text-[#F7EFE8]/85 text-base md:text-lg mt-6 leading-8 font-medium">
            Discover a collection of elegant perfumes created for every mood,
            personality and unforgettable moment.
          </p>

          <Link
            to="/shop"
            className="inline-flex items-center gap-3 mt-9 bg-[#F5F0E6] text-[#260304] px-9 py-4 font-bold uppercase tracking-wider hover:bg-white transition"
          >
            Shop Collection
            <ArrowRight size={18} />
          </Link>

        </div>

      </section>

    </div>
  );
}
