import { Link } from "react-router-dom";
import {
  Sparkles,
  Leaf,
  ArrowRight,
  Star,
  Flower2,
  Droplets,
  Wind,
} from "lucide-react";

const perfumeProducts = [
  {
    id: 1,
    name: "Velvet Noir",
    price: 129,
    image:
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=90",
  },
  {
    id: 2,
    name: "Rose Atelier",
    price: 119,
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=90",
  },
  {
    id: 3,
    name: "Citrus Muse",
    price: 99,
    image:
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=90",
  },
];

function PerfumeVideo({ src, className = "" }) {
  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      className={`w-full h-full object-cover ${className}`}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#FDFBF7] text-[#2C2A29]">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative h-[75vh] min-h-[520px] sm:h-[85vh] lg:min-h-[calc(100vh-72px)] lg:h-auto overflow-hidden bg-[#260304]">

        <div className="absolute inset-0">
          <PerfumeVideo src="/videos/hero.mp4" />
        </div>

        <div className="absolute inset-0 bg-[#260304]/25" />

        {/* Bottom Left */}
        <div className="absolute bottom-5 left-4 sm:bottom-8 sm:left-6 lg:left-20 z-10">
          <p
            className="text-[8px] sm:text-[9px] uppercase tracking-[0.25em] sm:tracking-[0.35em] text-[#F5F0E6]/80"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            AROMIQ — SIGNATURE FRAGRANCE
          </p>
        </div>

        {/* Bottom Right */}
        <div className="absolute bottom-5 right-4 sm:bottom-8 sm:right-6 lg:right-20 z-10 flex items-center gap-2 sm:gap-3 text-[#F5F0E6]">

          <span
            className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] sm:tracking-[0.25em]"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            Scroll
          </span>

          <div className="w-7 sm:w-10 h-px bg-[#F5F0E6]/60" />

        </div>

      </section>

      {/* =====================================================
          INTRO
      ===================================================== */}

      <section className="px-5 sm:px-6 lg:px-20 py-16 sm:py-20 lg:py-24 bg-[#FDFBF7]">

        <div className="max-w-4xl mx-auto text-center">

          <Sparkles
            size={22}
            strokeWidth={1.5}
            className="mx-auto text-[#8C7A6B]"
          />

          <span className="block mt-5 text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.35em] uppercase text-[#7A695A] font-bold">
            MORE THAN A FRAGRANCE
          </span>

          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-serif text-[#260304] leading-tight">
            A story captured in every bottle.
          </h2>

          <p className="mt-5 sm:mt-6 max-w-2xl mx-auto text-sm leading-7 text-[#5E5148] px-1">
            From the first luminous notes to the warm final trace,
            every Aromiq fragrance is designed to evolve beautifully
            on your skin.
          </p>

        </div>

      </section>

      {/* =====================================================
          THREE VISUAL CARDS
      ===================================================== */}

      <section className="px-5 sm:px-6 lg:px-20 pb-16 sm:pb-20 lg:pb-24 bg-[#FDFBF7]">

        <div className="max-w-7xl mx-auto">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">

            {/* CARD 1 */}

            <div className="group">

              <div className="relative h-[360px] sm:h-[420px] overflow-hidden rounded-2xl bg-[#EDE4D8]">

                <img
                  src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=90"
                  alt="Luxury fragrance"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#260304]/65 via-transparent to-transparent" />

                <div className="absolute bottom-6 left-6 sm:bottom-7 sm:left-7">

                  <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.3em] text-[#D8C8BC]">
                    01
                  </span>

                  <h3 className="mt-2 text-xl sm:text-2xl font-serif text-white">
                    The Craft
                  </h3>

                </div>

              </div>

            </div>

            {/* CARD 2 */}

            <div className="group">

              <div className="relative h-[360px] sm:h-[420px] overflow-hidden rounded-2xl bg-[#F5F0E6]">

                <img
                  src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=90"
                  alt="Elegant perfume bottle"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#260304]/65 via-transparent to-transparent" />

                <div className="absolute bottom-6 left-6 sm:bottom-7 sm:left-7">

                  <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.3em] text-[#D8C8BC]">
                    02
                  </span>

                  <h3 className="mt-2 text-xl sm:text-2xl font-serif text-white">
                    The Notes
                  </h3>

                </div>

              </div>

            </div>

            {/* CARD 3 */}

            <div className="group">

              <div className="relative h-[360px] sm:h-[420px] overflow-hidden rounded-2xl bg-[#260304]">

                <img
                  src="https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=900&q=90"
                  alt="Aromiq fragrance"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#260304]/75 via-transparent to-transparent" />

                <div className="absolute bottom-6 left-6 sm:bottom-7 sm:left-7">

                  <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.3em] text-[#D8C8BC]">
                    03
                  </span>

                  <h3 className="mt-2 text-xl sm:text-2xl font-serif text-white">
                    The Signature
                  </h3>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          SIDE VIDEO
      ===================================================== */}

      <section className="px-5 sm:px-6 lg:px-20 py-16 sm:py-20 lg:py-28 bg-[#F5F0E6]">

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_0.8fr] gap-10 sm:gap-14 lg:gap-24 items-center">

          <div className="max-w-xl">

            <span className="text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.35em] uppercase text-[#7A695A] font-bold">
              SCENT IS AN ART
            </span>

            <h2 className="mt-4 sm:mt-5 text-3xl sm:text-4xl lg:text-6xl font-serif text-[#260304] leading-tight">
              Every note has
              <br />
              <span className="italic text-[#8C7A6B]">
                a purpose.
              </span>
            </h2>

            <p className="mt-5 sm:mt-7 text-sm lg:text-base leading-7 text-[#5E5148]">
              Fragrance is built in layers. Bright citrus opens the
              composition, delicate florals reveal its soul, while
              precious woods create the final memory.
            </p>

            <Link
              to="/ingredients"
              className="inline-flex items-center gap-2 sm:gap-3 mt-7 sm:mt-8 border-b border-[#260304] pb-2 text-[10px] sm:text-xs uppercase tracking-[0.18em] sm:tracking-[0.2em] text-[#260304] font-bold"
            >
              Discover Ingredients
              <ArrowRight size={14} />
            </Link>

          </div>

          <div className="relative h-[430px] sm:h-[500px] lg:h-[620px] overflow-hidden rounded-2xl bg-[#260304]">

            <PerfumeVideo src="/videos/side.mp4" />

            <div className="absolute inset-0 bg-gradient-to-t from-[#260304]/65 via-transparent to-transparent" />

            <div className="absolute bottom-6 left-6 sm:bottom-7 sm:left-7">

              <p className="text-[#D8C8BC] text-[8px] sm:text-[9px] uppercase tracking-[0.3em] font-bold">
                AROMIQ
              </p>

              <p className="mt-2 text-white text-lg sm:text-xl font-serif">
                The beauty of detail.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          COLLECTION
      ===================================================== */}

      <section className="px-5 sm:px-6 lg:px-20 py-16 sm:py-20 lg:py-24 bg-[#FDFBF7]">

        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 sm:gap-6 mb-10 sm:mb-12">

            <div>

              <span className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-[#7A695A] font-bold">
                SIGNATURE COLLECTION
              </span>

              <h2 className="mt-3 text-3xl sm:text-4xl font-serif text-[#260304] leading-tight">
                Find your signature scent.
              </h2>

            </div>

            <Link
              to="/collection"
              className="self-start md:self-auto inline-flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.18em] sm:tracking-[0.2em] text-[#260304] border-b border-[#260304] pb-1 font-bold"
            >
              View All
              <ArrowRight size={14} />
            </Link>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-7">

            {perfumeProducts.map((product) => (

              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="group"
              >

                <div className="relative h-[380px] sm:h-[450px] overflow-hidden rounded-xl bg-[#F5F0E6]">

                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#260304]/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />

                </div>

                <div className="pt-4 sm:pt-5 flex items-start justify-between gap-3">

                  <div>

                    <h3 className="text-lg sm:text-xl font-serif text-[#260304]">
                      {product.name}
                    </h3>

                    <p className="mt-1 text-[9px] sm:text-[10px] uppercase tracking-[0.18em] sm:tracking-[0.2em] text-[#8C7A6B]">
                      Eau de Parfum
                    </p>

                  </div>

                  <span className="text-xs sm:text-sm font-medium text-[#5E5148] whitespace-nowrap">
                    {product.price} EGP
                  </span>

                </div>

              </Link>

            ))}

          </div>

        </div>

      </section>

      {/* =====================================================
          SCENT FAMILIES
      ===================================================== */}

      <section className="px-5 sm:px-6 lg:px-20 py-16 sm:py-20 lg:py-24 bg-[#EDE4D8]">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-10 sm:mb-14">

            <span className="text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.35em] uppercase text-[#7A695A] font-bold">
              DISCOVER YOUR MOOD
            </span>

            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-serif text-[#260304] leading-tight">
              Find your scent family.
            </h2>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">

            {/* FLORAL */}

            <Link
              to="/collection"
              className="group bg-[#FDFBF7] p-6 sm:p-8 min-h-[220px] sm:min-h-[260px] flex flex-col justify-between hover:-translate-y-1 transition duration-300"
            >

              <Flower2
                size={27}
                strokeWidth={1.2}
                className="text-[#8C7A6B]"
              />

              <div>

                <p className="text-[8px] sm:text-[9px] uppercase tracking-[0.3em] text-[#8C7A6B]">
                  01
                </p>

                <h3 className="mt-2 text-xl sm:text-2xl font-serif text-[#260304]">
                  Floral
                </h3>

                <p className="mt-3 text-xs leading-6 text-[#7A695A]">
                  Soft petals, romantic florals and graceful compositions.
                </p>

              </div>

            </Link>

            {/* WOODY */}

            <Link
              to="/collection"
              className="group bg-[#260304] p-6 sm:p-8 min-h-[220px] sm:min-h-[260px] flex flex-col justify-between hover:-translate-y-1 transition duration-300"
            >

              <Droplets
                size={27}
                strokeWidth={1.2}
                className="text-[#D8C8BC]"
              />

              <div>

                <p className="text-[8px] sm:text-[9px] uppercase tracking-[0.3em] text-[#D8C8BC]">
                  02
                </p>

                <h3 className="mt-2 text-xl sm:text-2xl font-serif text-[#FDFBF7]">
                  Woody
                </h3>

                <p className="mt-3 text-xs leading-6 text-[#D8C8BC]/70">
                  Deep woods, warm amber and sophisticated earthy notes.
                </p>

              </div>

            </Link>

            {/* FRESH */}

            <Link
              to="/collection"
              className="group bg-[#FDFBF7] p-6 sm:p-8 min-h-[220px] sm:min-h-[260px] flex flex-col justify-between hover:-translate-y-1 transition duration-300"
            >

              <Wind
                size={27}
                strokeWidth={1.2}
                className="text-[#8C7A6B]"
              />

              <div>

                <p className="text-[8px] sm:text-[9px] uppercase tracking-[0.3em] text-[#8C7A6B]">
                  03
                </p>

                <h3 className="mt-2 text-xl sm:text-2xl font-serif text-[#260304]">
                  Fresh
                </h3>

                <p className="mt-3 text-xs leading-6 text-[#7A695A]">
                  Bright citrus, clean accords and an effortless freshness.
                </p>

              </div>

            </Link>

          </div>

        </div>

      </section>

      {/* =====================================================
          BOTTOM VIDEO
      ===================================================== */}

      <section className="px-5 sm:px-6 lg:px-20 py-16 sm:py-20 lg:py-28 bg-[#260304]">

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[0.85fr_1fr] gap-10 sm:gap-14 lg:gap-24 items-center">

          <div className="relative h-[400px] sm:h-[480px] lg:h-[600px] overflow-hidden rounded-2xl">

            <PerfumeVideo src="/videos/bottom.mp4" />

            <div className="absolute inset-0 bg-gradient-to-t from-[#260304]/70 via-transparent to-transparent" />

            <div className="absolute bottom-6 left-6 sm:bottom-7 sm:left-7">

              <p className="text-[#D8C8BC] text-[8px] sm:text-[9px] uppercase tracking-[0.3em] font-bold">
                THE SIGNATURE
              </p>

              <p className="mt-2 text-white text-lg sm:text-xl font-serif">
                Made to be remembered.
              </p>

            </div>

          </div>

          <div className="text-[#FDFBF7] max-w-xl">

            <span className="text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.35em] uppercase text-[#D8C8BC] font-bold">
              YOUR SIGNATURE
            </span>

            <h2 className="mt-4 sm:mt-5 text-3xl sm:text-4xl lg:text-6xl font-serif leading-tight">
              Find the scent
              <br />
              <span className="italic text-[#D8C8BC]">
                that feels like you.
              </span>
            </h2>

            <p className="mt-5 sm:mt-7 text-sm leading-7 text-[#F7EFE8]/75">
              Some fragrances are worn.
              Others become part of who you are.
              Explore Aromiq and discover a composition that feels
              naturally yours.
            </p>

            <Link
              to="/collection"
              className="inline-flex items-center gap-3 mt-8 sm:mt-9 bg-[#F5F0E6] text-[#260304] px-6 sm:px-8 py-3.5 sm:py-4 text-[10px] sm:text-xs uppercase tracking-[0.18em] sm:tracking-[0.2em] font-bold hover:bg-white transition"
            >
              Explore Collection
              <ArrowRight size={16} />
            </Link>

          </div>

        </div>

      </section>

      {/* =====================================================
          THE AROMIQ DIFFERENCE
      ===================================================== */}

      <section className="px-5 sm:px-6 lg:px-20 py-16 sm:py-24 lg:py-32 bg-[#FDFBF7]">

        <div className="max-w-7xl mx-auto">

          <div className="text-center max-w-2xl mx-auto">

            <span className="text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.35em] uppercase text-[#8C7A6B] font-bold">
              THE AROMIQ DIFFERENCE
            </span>

            <h2 className="mt-4 sm:mt-5 text-3xl sm:text-4xl lg:text-5xl font-serif text-[#260304] leading-tight">
              Made with
              <span className="italic text-[#8C7A6B]">
                {" "}intention.
              </span>
            </h2>

            <p className="mt-5 text-sm leading-7 text-[#7A695A]">
              Thoughtfully created fragrances, designed around quality,
              elegance and the little details that make a scent unforgettable.
            </p>

          </div>

          {/* FOUR FEATURES */}

          <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-10 lg:gap-7">

            {/* FEATURE 01 */}

            <div className="text-center group">

              <div className="relative mx-auto w-[135px] h-[135px] sm:w-[150px] sm:h-[150px] rounded-full overflow-hidden bg-[#EDE4D8]">

                <img
                  src="https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=500&q=85"
                  alt="Precious ingredients"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                />

                <div className="absolute inset-0 bg-[#260304]/10" />

              </div>

              <span className="block mt-5 sm:mt-6 text-[8px] sm:text-[9px] tracking-[0.25em] uppercase text-[#A08F80]">
                01
              </span>

              <h3 className="mt-2 text-xl font-serif text-[#260304]">
                Precious Ingredients
              </h3>

              <p className="mt-3 max-w-[230px] mx-auto text-xs leading-6 text-[#7A695A]">
                Carefully selected ingredients create a refined and balanced
                fragrance experience.
              </p>

            </div>

            {/* FEATURE 02 */}

            <div className="text-center group">

              <div className="relative mx-auto w-[135px] h-[135px] sm:w-[150px] sm:h-[150px] rounded-full overflow-hidden bg-[#E8D9D4]">

                <img
                  src="https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=500&q=85"
                  alt="Lasting fragrance"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                />

                <div className="absolute inset-0 bg-[#260304]/10" />

              </div>

              <span className="block mt-5 sm:mt-6 text-[8px] sm:text-[9px] tracking-[0.25em] uppercase text-[#A08F80]">
                02
              </span>

              <h3 className="mt-2 text-xl font-serif text-[#260304]">
                Lasting Impression
              </h3>

              <p className="mt-3 max-w-[230px] mx-auto text-xs leading-6 text-[#7A695A]">
                Elegant compositions designed to stay beautifully with you
                throughout the day.
              </p>

            </div>

            {/* FEATURE 03 */}

            <div className="text-center group">

              <div className="relative mx-auto w-[135px] h-[135px] sm:w-[150px] sm:h-[150px] rounded-full overflow-hidden bg-[#E5D7C8]">

                <img
                  src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=500&q=85"
                  alt="Crafted fragrance"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                />

                <div className="absolute inset-0 bg-[#260304]/10" />

              </div>

              <span className="block mt-5 sm:mt-6 text-[8px] sm:text-[9px] tracking-[0.25em] uppercase text-[#A08F80]">
                03
              </span>

              <h3 className="mt-2 text-xl font-serif text-[#260304]">
                Crafted with Care
              </h3>

              <p className="mt-3 max-w-[230px] mx-auto text-xs leading-6 text-[#7A695A]">
                Every detail is thoughtfully considered, from the scent to
                the final presentation.
              </p>

            </div>

            {/* FEATURE 04 */}

            <div className="text-center group">

              <div className="relative mx-auto w-[135px] h-[135px] sm:w-[150px] sm:h-[150px] rounded-full overflow-hidden bg-[#E2D3CC]">

                <img
                  src="https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=500&q=85"
                  alt="A fragrance to love"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                />

                <div className="absolute inset-0 bg-[#260304]/10" />

              </div>

              <span className="block mt-5 sm:mt-6 text-[8px] sm:text-[9px] tracking-[0.25em] uppercase text-[#A08F80]">
                04
              </span>

              <h3 className="mt-2 text-xl font-serif text-[#260304]">
                Made to Be Loved
              </h3>

              <p className="mt-3 max-w-[230px] mx-auto text-xs leading-6 text-[#7A695A]">
                Fragrances created to become part of your everyday memories.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          TESTIMONIAL
      ===================================================== */}

      <section className="px-5 sm:px-6 lg:px-20 py-16 sm:py-20 lg:py-24 bg-[#EDE4D8]">

        <div className="max-w-3xl mx-auto text-center">

          <div className="flex justify-center gap-1 text-[#8C7A6B]">

            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={14}
                fill="currentColor"
                strokeWidth={1}
              />
            ))}

          </div>

          <p className="mt-6 sm:mt-7 text-xl sm:text-2xl lg:text-3xl font-serif italic leading-relaxed text-[#260304]">
            “Aromiq feels like wearing a memory.
            Elegant, warm and completely unforgettable.”
          </p>

          <p className="mt-5 sm:mt-6 text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-[#7A695A] font-bold">
            AROMIQ CUSTOMER
          </p>

        </div>

      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="px-5 sm:px-6 lg:px-20 py-20 sm:py-24 lg:py-28 bg-[#FDFBF7] text-center">

        <div className="max-w-3xl mx-auto">

          <span className="text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.35em] uppercase text-[#7A695A] font-bold">
            YOUR SIGNATURE AWAITS
          </span>

          <h2 className="mt-4 sm:mt-5 text-3xl sm:text-4xl lg:text-6xl font-serif text-[#260304] leading-tight">
            Find the scent
            <br />
            <span className="italic text-[#8C7A6B]">
              that feels like you.
            </span>
          </h2>

          <p className="mt-5 sm:mt-6 max-w-xl mx-auto text-sm leading-7 text-[#5E5148]">
            Explore our collection and discover a fragrance that becomes
            uniquely yours.
          </p>

          <Link
            to="/collection"
            className="inline-flex items-center gap-3 mt-8 sm:mt-9 bg-[#260304] text-[#F7EFE8] px-7 sm:px-9 py-3.5 sm:py-4 text-[10px] sm:text-xs uppercase tracking-[0.18em] sm:tracking-[0.2em] font-bold hover:bg-[#3B1214] transition"
          >
            Explore Collection
            <ArrowRight size={16} />
          </Link>

        </div>

      </section>

    </main>
  );
}
