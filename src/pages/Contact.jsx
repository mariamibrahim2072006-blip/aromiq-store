import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { MapPin, Mail, Phone, Send } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSending(true);
    setSent(false);
    setError(false);

    try {
      await emailjs.send(
        "service_aromiq",
        "template_jk1xwpi",
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        "rnM-CkflWP7fFmkSK"
      );

      setSent(true);

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("EmailJS Error:", error);
      setError(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#FDFBF7] text-[#2C2A29] font-sans pt-8 pb-16 px-6 lg:px-20">

      {/* HERO */}
      <div className="max-w-6xl mx-auto pt-2 pb-8 text-center">
        <span className="text-xs tracking-[0.3em] uppercase text-[#8C7A6B] font-semibold">
          GET IN TOUCH
        </span>

        <h1 className="mt-2 text-4xl lg:text-5xl font-serif font-normal text-[#1A1817]">
          Contact Us
        </h1>

        <p className="mt-3 max-w-xl mx-auto text-sm leading-relaxed text-neutral-700 font-medium">
          Have a question about our fragrances, your order, or our collection?
          We'd love to hear from you.
        </p>
      </div>

      {/* MAIN CARD */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 overflow-hidden rounded-2xl border border-[#E8E1D7] bg-white shadow-[0_15px_45px_rgba(44,42,41,0.06)]">

          {/* LEFT SIDE */}
          <div className="lg:col-span-5 bg-[#F5F0E6] p-8 lg:p-12">

            <span className="text-xs tracking-[0.3em] uppercase text-[#8C7A6B] font-semibold">
              AROMIQ
            </span>

            <h2 className="mt-3 text-3xl lg:text-4xl font-serif font-normal text-[#1A1817]">
              Let's talk fragrance.
            </h2>

            <p className="mt-4 text-sm leading-7 text-neutral-700 font-medium">
              Whether you're looking for your next signature scent or need help
              with an order, our team is here to help.
            </p>

            {/* CONTACT INFO */}
            <div className="mt-8 space-y-6">

              {/* LOCATION */}
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full border border-[#CDBBA8] flex items-center justify-center shrink-0 bg-white/50">
                  <MapPin
                    size={17}
                    strokeWidth={1.8}
                    className="text-[#8C7A6B]"
                  />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-[#1A1817]">
                    Visit Us
                  </h3>

                  <p className="text-xs leading-5 text-neutral-700 font-medium mt-0.5">
                    123 Fragrance Avenue
                    <br />
                    Cairo, Egypt
                  </p>
                </div>
              </div>

              {/* EMAIL */}
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full border border-[#CDBBA8] flex items-center justify-center shrink-0 bg-white/50">
                  <Mail
                    size={17}
                    strokeWidth={1.8}
                    className="text-[#8C7A6B]"
                  />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-[#1A1817]">
                    Email
                  </h3>

                  <p className="text-xs text-neutral-700 font-medium mt-0.5">
                    hello@aromiq.com
                  </p>
                </div>
              </div>

              {/* PHONE */}
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full border border-[#CDBBA8] flex items-center justify-center shrink-0 bg-white/50">
                  <Phone
                    size={17}
                    strokeWidth={1.8}
                    className="text-[#8C7A6B]"
                  />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-[#1A1817]">
                    Phone
                  </h3>

                  <p className="text-xs text-neutral-700 font-medium mt-0.5">
                    +20 100 000 0000
                  </p>
                </div>
              </div>

            </div>

            {/* PERFUME IMAGE */}
            <div className="mt-10 h-40 rounded-xl overflow-hidden relative group">
              <img
                src="https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=85&w=900"
                alt="Aromiq perfume"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
              />

              <div className="absolute inset-0 bg-[#2C2A29]/25" />

              <div className="absolute bottom-4 left-5">
                <p className="text-white text-xs tracking-[0.2em] uppercase font-bold">
                  The Art of Fragrance
                </p>
              </div>
            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="lg:col-span-7 p-8 lg:p-12 bg-[#FDFBF7]">

            <span className="text-xs tracking-[0.3em] uppercase text-[#8C7A6B] font-semibold">
              LEAVE YOUR MESSAGE
            </span>

            <h2 className="mt-3 text-3xl font-serif font-normal text-[#1A1817]">
              We'd love to hear from you.
            </h2>

            <p className="mt-3 text-sm text-neutral-700 font-medium">
              Fill in the form and we'll get back to you as soon as possible.
            </p>

            {/* FORM */}
            <form
              className="mt-8 space-y-6"
              onSubmit={handleSubmit}
            >

              {/* NAME */}
              <div>
                <label className="block text-xs font-bold tracking-[0.15em] uppercase text-[#1A1817] mb-2">
                  Your Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your name"
                  className="w-full bg-white border border-[#DDD4CA] px-4 py-3.5 text-sm text-[#1A1817] font-medium outline-none transition focus:border-[#260304] placeholder:text-[#A49A91]"
                />
              </div>

              {/* EMAIL */}
              <div>
                <label className="block text-xs font-bold tracking-[0.15em] uppercase text-[#1A1817] mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                  className="w-full bg-white border border-[#DDD4CA] px-4 py-3.5 text-sm text-[#1A1817] font-medium outline-none transition focus:border-[#260304] placeholder:text-[#A49A91]"
                />
              </div>

              {/* SUBJECT */}
              <div>
                <label className="block text-xs font-bold tracking-[0.15em] uppercase text-[#1A1817] mb-2">
                  Subject
                </label>

                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="How can we help?"
                  className="w-full bg-white border border-[#DDD4CA] px-4 py-3.5 text-sm text-[#1A1817] font-medium outline-none transition focus:border-[#260304] placeholder:text-[#A49A91]"
                />
              </div>

              {/* MESSAGE */}
              <div>
                <label className="block text-xs font-bold tracking-[0.15em] uppercase text-[#1A1817] mb-2">
                  Your Message
                </label>

                <textarea
                  rows="5"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Write your message..."
                  className="w-full bg-white border border-[#DDD4CA] px-4 py-3.5 text-sm text-[#1A1817] font-medium outline-none resize-none transition focus:border-[#260304] placeholder:text-[#A49A91]"
                />
              </div>

              {/* SUCCESS */}
              {sent && (
                <div className="rounded-lg border border-[#C8DCC2] bg-[#F1F7EF] px-4 py-3 text-sm font-medium text-[#3F6038]">
                  ✓ Message sent successfully! We'll get back to you soon.
                </div>
              )}

              {/* ERROR */}
              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  Something went wrong. Please try again.
                </div>
              )}

              {/* BUTTON */}
              <button
                type="submit"
                disabled={sending}
                className="inline-flex items-center justify-center gap-3 bg-[#260304] text-[#F7EFE8] px-8 py-4 text-xs uppercase tracking-[0.2em] hover:bg-[#3b1214] transition duration-300 font-bold shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {sending ? "Sending..." : "Send Message"}

                {!sending && (
                  <Send
                    size={14}
                    strokeWidth={2}
                  />
                )}
              </button>

            </form>

          </div>

        </div>
      </div>

    </section>
  );
}
