import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#260304] text-[#F7EFE8]">

      {/* ================= CTA ================= */}
      <section className="relative max-w-[1280px] mx-auto px-8 md:px-14 lg:px-20 pt-16 pb-14">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

          {/* Left */}
          <div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-[52px] font-light leading-[1.05] tracking-tight max-w-md text-white">
              Get the scent of
              <br />
              your dreams
            </h2>

            <button
              type="button"
              className="
                mt-8
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-[#F8F4EF]
                text-[#260304]
                px-5
                py-2.5
                text-xs
                font-semibold
                hover:bg-[#D8AA36]
                transition-all
                duration-300
              "
            >
              Get yours · 30% off

              <span className="w-5 h-5 rounded-full bg-[#7B171A] text-white flex items-center justify-center">
                <ArrowRight size={11} />
              </span>
            </button>
          </div>

          {/* Right */}
          <div className="md:pt-2 md:max-w-sm">
            <p className="text-xs md:text-sm leading-6 text-[#F7EFE8]/90 font-medium">
              Crafted for quiet confidence, this scent opens with spicy
              florals and amber warmth. It lingers long after — magnetic,
              unapologetic, and timeless.
            </p>
          </div>

        </div>


        {/* Divider */}
        <div className="mt-12 h-px bg-[#E8D8D0]/25" />


        {/* ================= FOOTER LINKS ================= */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pt-9 relative z-10">

          {/* Brand */}
          <div className="col-span-2 md:col-span-2">

            <h3 className="font-serif text-lg mb-4 text-white font-medium">
              Aromiq
            </h3>

            <p className="text-xs md:text-sm leading-6 text-[#F7EFE8]/85 max-w-xs font-medium">
              Showcase your product with Aromiq.
              <br />
              Fine fragrances crafted for unforgettable moments.
            </p>

            <p className="text-xs text-[#F7EFE8]/75 mt-4 font-medium">
              Luxury perfume · Crafted with intention
            </p>

          </div>


          {/* Sections */}
          <div>
            <h4 className="text-xs md:text-sm mb-5 font-bold text-white tracking-wider uppercase">
              Sections
            </h4>

            <div className="flex flex-col gap-3.5 text-xs md:text-sm text-[#F7EFE8]/85 font-medium">

              <Link
                to="/"
                className="hover:text-[#D8AA36] transition-colors"
              >
                Home
              </Link>

              <Link
                to="/about"
                className="hover:text-[#D8AA36] transition-colors"
              >
                About
              </Link>

              <Link
                to="/collection"
                className="hover:text-[#D8AA36] transition-colors"
              >
                The Collection
              </Link>

              <Link
                to="/contact"
                className="hover:text-[#D8AA36] transition-colors"
              >
                Contact
              </Link>

            </div>
          </div>


          {/* Socials */}
          <div>
            <h4 className="text-xs md:text-sm mb-5 font-bold text-white tracking-wider uppercase">
              Socials
            </h4>

            <div className="flex flex-col gap-3.5 text-xs md:text-sm text-[#F7EFE8]/85 font-medium">

              <a
                href="#"
                className="flex items-center gap-2.5 hover:text-[#D8AA36] transition-colors"
              >
                <Twitter size={14} strokeWidth={1.8} />
                Twitter
              </a>

              <a
                href="#"
                className="flex items-center gap-2.5 hover:text-[#D8AA36] transition-colors"
              >
                <Instagram size={14} strokeWidth={1.8} />
                Instagram
              </a>

              <a
                href="#"
                className="flex items-center gap-2.5 hover:text-[#D8AA36] transition-colors"
              >
                <Facebook size={14} strokeWidth={1.8} />
                Facebook
              </a>

            </div>
          </div>

        </div>


        {/* ================= BOTTOM LINE ================= */}
        <div className="mt-14 h-px bg-[#E8D8D0]/25" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 relative z-10">

          <p className="text-xs tracking-[0.15em] uppercase text-[#F7EFE8]/75 font-medium">
            © 2026 Aromiq Perfume. All rights reserved.
          </p>

          <div className="flex items-center gap-5 text-[#F7EFE8]/85">
            <Instagram size={16} strokeWidth={1.8} />
            <Facebook size={16} strokeWidth={1.8} />
            <Twitter size={16} strokeWidth={1.8} />
          </div>

        </div>

      </section>


      {/* ================= HUGE BACKGROUND WORD ================= */}
      <div
        className="
          pointer-events-none
          absolute
          bottom-[-55px]
          left-1/2
          -translate-x-1/2
          whitespace-nowrap
          select-none
          font-serif
          text-[150px]
          md:text-[230px]
          lg:text-[300px]
          leading-none
          tracking-[-0.06em]
          text-[#F7EFE8]/10
        "
      >
        Perfuma
      </div>

    </footer>
  );
}

