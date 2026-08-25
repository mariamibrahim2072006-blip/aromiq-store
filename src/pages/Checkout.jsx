import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = "https://aromiq-store-production.up.railway.app";

const governorates = {
    Cairo: [
        "Cairo",
        "New Cairo",
        "Nasr City",
        "Heliopolis",
        "Maadi",
        "Helwan",
        "Shubra",
    ],

    Giza: [
        "Giza",
        "6th of October",
        "Sheikh Zayed",
        "Haram",
        "Dokki",
        "Agouza",
        "Imbaba",
        "Bulaq Al Dakrur",
    ],

    Alexandria: [
        "Alexandria",
        "Montaza",
        "Sidi Gaber",
        "Smouha",
        "Miami",
        "Agami",
        "Borg El Arab",
    ],

    Dakahlia: [
        "Mansoura",
        "Talkha",
        "Mit Ghamr",
        "Aga",
        "Sherbin",
        "Belqas",
        "Dikirnis",
        "El Senbellawein",
        "Manzala",
        "Gamalia",
        "Bani Obaid",
        "Minet El Nasr",
        "Nabroh",
    ],

    Damietta: [
        "Damietta",
        "New Damietta",
        "Ras El Bar",
        "Faraskour",
        "Kafr Saad",
        "Kafr El Batikh",
        "El Zarqa",
    ],

    Sharqia: [
        "Zagazig",
        "10th of Ramadan",
        "Belbeis",
        "Minya El Qamh",
        "Abu Hammad",
        "Faqous",
        "Hehia",
        "Deyerb Negm",
    ],

    Qalyubia: [
        "Banha",
        "Shubra El Kheima",
        "Qalyub",
        "Khanka",
        "Obour",
        "Toukh",
        "Shibin El Qanater",
    ],

    Monufia: [
        "Shibin El Kom",
        "Menouf",
        "Ashmoun",
        "Sadat",
        "Tala",
        "Berket El Sab",
        "Quesna",
    ],

    Beheira: [
        "Damanhour",
        "Kafr El Dawwar",
        "Rashid",
        "Edko",
        "Abu Hummus",
        "Hosh Issa",
        "Kom Hamada",
        "Mahmoudiyah",
    ],

    Gharbia: [
        "Tanta",
        "El Mahalla El Kubra",
        "Kafr El Zayat",
        "Zefta",
        "Santa",
        "Qutour",
        "Basyoun",
    ],

    KafrElSheikh: [
        "Kafr El Sheikh",
        "Desouk",
        "Metoubes",
        "Baltim",
        "Fouh",
        "Sidi Salem",
        "El Hamool",
    ],

    Ismailia: [
        "Ismailia",
        "Fayed",
        "Qantara Sharq",
        "Qantara Gharb",
        "Tell El Kebir",
        "Abu Suwir",
    ],

    Suez: [
        "Suez",
        "Ain Sokhna",
        "Arbaeen",
        "Attaka",
    ],

    PortSaid: [
        "Port Said",
        "Port Fouad",
    ],

    Aswan: [
        "Aswan",
        "Edfu",
        "Kom Ombo",
        "Daraw",
        "Nasr El Nuba",
    ],

    Luxor: [
        "Luxor",
        "Esna",
        "Armant",
        "Qurna",
        "Tod",
    ],

    Qena: [
        "Qena",
        "Nag Hammadi",
        "Qus",
        "Dishna",
        "Farshout",
    ],

    Sohag: [
        "Sohag",
        "Akhmim",
        "Girga",
        "Tahta",
        "Al Maragha",
        "Juhayna",
    ],

    Assiut: [
        "Assiut",
        "Dairut",
        "Manfalut",
        "Abnoub",
        "Abu Tig",
        "El Qusiya",
    ],

    Minya: [
        "Minya",
        "Mallawi",
        "Samalut",
        "Beni Mazar",
        "Maghagha",
        "Abu Qurqas",
    ],

    BeniSuef: [
        "Beni Suef",
        "Al Fashn",
        "Biba",
        "Nasser",
        "Ihnasiya",
    ],

    Fayoum: [
        "Fayoum",
        "Sinnuris",
        "Tamiya",
        "Itsa",
        "Abshaway",
        "Youssef El Seddik",
    ],

    RedSea: [
        "Hurghada",
        "Safaga",
        "El Quseir",
        "Marsa Alam",
        "Ras Gharib",
    ],

    Matrouh: [
        "Marsa Matrouh",
        "El Alamein",
        "Dabaa",
        "Siwa",
        "Salloum",
    ],

    NorthSinai: [
        "Arish",
        "Sheikh Zuweid",
        "Rafah",
        "Bir El Abd",
    ],

    SouthSinai: [
        "Sharm El Sheikh",
        "Dahab",
        "Nuweiba",
        "Taba",
        "Saint Catherine",
        "El Tor",
    ],

    NewValley: [
        "Kharga",
        "Dakhla",
        "Farafra",
        "Baris",
        "Balat",
    ],
};

const governorateLabels = {
    Cairo: "Cairo",
    Giza: "Giza",
    Alexandria: "Alexandria",
    Dakahlia: "Dakahlia",
    Damietta: "Damietta",
    Sharqia: "Sharqia",
    Qalyubia: "Qalyubia",
    Monufia: "Monufia",
    Beheira: "Beheira",
    Gharbia: "Gharbia",
    KafrElSheikh: "Kafr El Sheikh",
    Ismailia: "Ismailia",
    Suez: "Suez",
    PortSaid: "Port Said",
    Aswan: "Aswan",
    Luxor: "Luxor",
    Qena: "Qena",
    Sohag: "Sohag",
    Assiut: "Assiut",
    Minya: "Minya",
    BeniSuef: "Beni Suef",
    Fayoum: "Fayoum",
    RedSea: "Red Sea",
    Matrouh: "Matrouh",
    NorthSinai: "North Sinai",
    SouthSinai: "South Sinai",
    NewValley: "New Valley",
};

export default function Checkout() {
    const navigate = useNavigate();

    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [placingOrder, setPlacingOrder] = useState(false);
    const [error, setError] = useState("");

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        governorate: "",
        city: "",
        address: "",
        apartment: "",
        notes: "",
    });

    const [paymentMethod, setPaymentMethod] = useState(
        "CASH_ON_DELIVERY"
    );

    const token = localStorage.getItem("aromiq_token");

    useEffect(() => {
        const loadCart = async () => {
            if (!token) {
                navigate("/account");
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
                        data.message || "Failed to load cart."
                    );
                }

                setCart(data.cart);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadCart();
    }, [navigate, token]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
            ...(name === "governorate"
                ? { city: "" }
                : {}),
        }));
    };

    const placeOrder = async () => {
        if (!token) {
            navigate("/account");
            return;
        }

        setError("");

        const requiredFields = [
            "firstName",
            "lastName",
            "email",
            "phone",
            "governorate",
            "city",
            "address",
        ];

        const missingField = requiredFields.some(
            (field) => !form[field].trim()
        );

        if (missingField) {
            setError(
                "Please complete all required customer and shipping information."
            );
            return;
        }

        setPlacingOrder(true);

        try {
            /* =========================
               STRIPE
            ========================= */

            if (paymentMethod === "STRIPE") {
                const response = await fetch(
                    `${API_URL}/api/orders/create-stripe-session`,
                    {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            ...form,
                        }),
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message ||
                        "Failed to create Stripe checkout."
                    );
                }

                if (!data.url) {
                    throw new Error(
                        "Stripe checkout URL was not returned."
                    );
                }

                window.location.href = data.url;
                return;
            }

            /* =========================
               CASH ON DELIVERY
            ========================= */

            const response = await fetch(
                `${API_URL}/api/orders`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ...form,
                        paymentMethod: "CASH_ON_DELIVERY",
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to place order."
                );
            }

            navigate(
                `/order-success/${data.order.id}`
            );
        } catch (err) {
            setError(err.message);
        } finally {
            setPlacingOrder(false);
        }
    };

    if (loading) {
        return (
            <section className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
                <p className="text-xs uppercase tracking-[0.3em] text-[#7A695A]">
                    Loading checkout...
                </p>
            </section>
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

    // Shipping = 15 EGP
    const shipping = subtotal > 0 ? 15 : 0;

    const total = subtotal + shipping;

    if (items.length === 0) {
        return (
            <section className="min-h-screen bg-[#FDFBF7] flex items-center justify-center px-6">
                <div className="text-center">
                    <span className="text-xs uppercase tracking-[0.3em] text-[#7A695A]">
                        AROMIQ
                    </span>

                    <h1 className="mt-4 text-4xl font-serif text-[#260304]">
                        Your bag is empty
                    </h1>

                    <Link
                        to="/shop"
                        className="inline-block mt-7 bg-[#260304] text-white px-8 py-4 text-xs uppercase tracking-[0.2em]"
                    >
                        Explore Collection
                    </Link>
                </div>
            </section>
        );
    }

    const cities = form.governorate
        ? governorates[form.governorate] || []
        : [];

    const inputClass =
        "w-full mt-2 px-4 py-4 rounded-xl border-2 border-[#D8CEC2] bg-white text-[#260304] outline-none transition focus:border-[#260304] focus:ring-2 focus:ring-[#260304]/10 placeholder:text-[#A99D91]";

    const labelClass =
        "text-xs font-bold uppercase tracking-[0.16em] text-[#5E5046]";

    return (
        <section className="min-h-screen bg-[#F8F3EA] px-5 lg:px-16 py-12 lg:py-20">
            <div className="max-w-7xl mx-auto">

                {/* HEADER */}

                <div className="mb-12">
                    <p className="text-xs uppercase tracking-[0.35em] font-semibold text-[#7A695A]">
                        AROMIQ CHECKOUT
                    </p>

                    <h1 className="mt-3 text-4xl lg:text-6xl font-serif text-[#260304]">
                        Complete your order
                    </h1>

                    <p className="mt-4 text-[#746A63]">
                        Enter your delivery details and choose
                        your preferred payment method.
                    </p>
                </div>

                {error && (
                    <div className="mb-8 rounded-xl border-2 border-[#D8A9A9] bg-[#F9E8E8] px-5 py-4 text-[#741B1D] font-medium">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-1 xl:grid-cols-[1.35fr_0.65fr] gap-10">

                    {/* CUSTOMER DETAILS */}

                    <div className="bg-white rounded-3xl shadow-sm border border-[#E3D9CC] p-6 lg:p-10">

                        <div className="mb-8">
                            <p className="text-xs uppercase tracking-[0.25em] text-[#8A796A]">
                                STEP 01
                            </p>

                            <h2 className="mt-2 text-3xl font-serif text-[#260304]">
                                Delivery Information
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            <div>
                                <label className={labelClass}>
                                    First Name *
                                </label>

                                <input
                                    name="firstName"
                                    value={form.firstName}
                                    onChange={handleChange}
                                    placeholder="Mariam"
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label className={labelClass}>
                                    Last Name *
                                </label>

                                <input
                                    name="lastName"
                                    value={form.lastName}
                                    onChange={handleChange}
                                    placeholder="Ibrahim"
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label className={labelClass}>
                                    Email *
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label className={labelClass}>
                                    Phone Number *
                                </label>

                                <input
                                    type="tel"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    placeholder="01XXXXXXXXX"
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label className={labelClass}>
                                    Governorate *
                                </label>

                                <select
                                    name="governorate"
                                    value={form.governorate}
                                    onChange={handleChange}
                                    className={inputClass}
                                >
                                    <option value="">
                                        Select Governorate
                                    </option>

                                    {Object.entries(
                                        governorateLabels
                                    ).map(
                                        ([value, label]) => (
                                            <option
                                                key={value}
                                                value={value}
                                            >
                                                {label}
                                            </option>
                                        )
                                    )}
                                </select>
                            </div>

                            <div>
                                <label className={labelClass}>
                                    City *
                                </label>

                                <select
                                    name="city"
                                    value={form.city}
                                    onChange={handleChange}
                                    disabled={!form.governorate}
                                    className={`${inputClass} disabled:bg-[#F1ECE4] disabled:text-[#AAA]`}
                                >
                                    <option value="">
                                        {form.governorate
                                            ? "Select City"
                                            : "Select Governorate First"}
                                    </option>

                                    {cities.map(
                                        (city) => (
                                            <option
                                                key={city}
                                                value={city}
                                            >
                                                {city}
                                            </option>
                                        )
                                    )}
                                </select>
                            </div>

                            <div className="md:col-span-2">
                                <label className={labelClass}>
                                    Full Address *
                                </label>

                                <input
                                    name="address"
                                    value={form.address}
                                    onChange={handleChange}
                                    placeholder="Street name, building number..."
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label className={labelClass}>
                                    Apartment / Floor
                                </label>

                                <input
                                    name="apartment"
                                    value={form.apartment}
                                    onChange={handleChange}
                                    placeholder="Apartment 5, Floor 2"
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label className={labelClass}>
                                    Order Notes
                                </label>

                                <input
                                    name="notes"
                                    value={form.notes}
                                    onChange={handleChange}
                                    placeholder="Optional notes..."
                                    className={inputClass}
                                />
                            </div>

                        </div>

                        {/* PAYMENT */}

                        <div className="mt-12 pt-10 border-t border-[#E6DED4]">

                            <p className="text-xs uppercase tracking-[0.25em] text-[#8A796A]">
                                STEP 02
                            </p>

                            <h2 className="mt-2 text-3xl font-serif text-[#260304]">
                                Payment Method
                            </h2>

                            <div className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-5">

                                {/* COD */}

                                <button
                                    type="button"
                                    onClick={() =>
                                        setPaymentMethod(
                                            "CASH_ON_DELIVERY"
                                        )
                                    }
                                    className={`text-left rounded-2xl border-2 p-6 transition ${paymentMethod ===
                                            "CASH_ON_DELIVERY"
                                            ? "border-[#260304] bg-[#F8F1E8]"
                                            : "border-[#DED5CA] bg-white hover:border-[#A99D91]"
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="text-lg font-semibold text-[#260304]">
                                            Cash on Delivery
                                        </span>

                                        <span className="text-xl">
                                            💵
                                        </span>
                                    </div>

                                    <p className="mt-3 text-sm text-[#746A63]">
                                        Pay when your order arrives.
                                    </p>
                                </button>

                                {/* CARD */}

                                <button
                                    type="button"
                                    onClick={() =>
                                        setPaymentMethod("STRIPE")
                                    }
                                    className={`text-left rounded-2xl border-2 p-6 transition ${paymentMethod === "STRIPE"
                                            ? "border-[#260304] bg-[#F8F1E8]"
                                            : "border-[#DED5CA] bg-white hover:border-[#A99D91]"
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="text-lg font-semibold text-[#260304]">
                                            Pay by Card
                                        </span>

                                        <span className="text-xl">
                                            💳
                                        </span>
                                    </div>

                                    <p className="mt-3 text-sm text-[#746A63]">
                                        Secure payment powered by Stripe.
                                    </p>
                                </button>

                            </div>

                            {paymentMethod === "STRIPE" && (
                                <div className="mt-5 rounded-xl bg-[#F5F0E6] border border-[#E0D5C8] p-5 text-sm text-[#5F554E]">
                                    You will be redirected to Stripe's
                                    secure checkout page to enter your
                                    card details.
                                </div>
                            )}

                        </div>
                    </div>

                    {/* SUMMARY */}

                    <div className="xl:sticky xl:top-8 h-fit">

                        <div className="bg-[#260304] text-white rounded-3xl p-7 lg:p-8 shadow-xl">

                            <p className="text-xs uppercase tracking-[0.3em] text-[#D8C4B2]">
                                YOUR ORDER
                            </p>

                            <h2 className="mt-3 text-3xl font-serif">
                                Order Summary
                            </h2>

                            <div className="mt-8 space-y-5">

                                {items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex gap-4"
                                    >
                                        <img
                                            src={item.product.image}
                                            alt={item.product.name}
                                            className="w-16 h-20 rounded-lg object-cover"
                                        />

                                        <div className="flex-1">
                                            <p className="font-serif text-lg">
                                                {item.product.name}
                                            </p>

                                            <p className="mt-1 text-sm text-[#D8C4B2]">
                                                Qty: {item.quantity}
                                            </p>
                                        </div>

                                        <p className="font-semibold">
                                            {(
                                                Number(
                                                    item.product.price
                                                ) * item.quantity
                                            ).toFixed(2)}{" "}
                                            EGP
                                        </p>
                                    </div>
                                ))}

                            </div>

                            <div className="border-t border-white/20 mt-8 pt-6 space-y-4">

                                <div className="flex justify-between text-[#D8C4B2]">
                                    <span>
                                        Subtotal
                                    </span>

                                    <span>
                                        {subtotal.toFixed(2)} EGP
                                    </span>
                                </div>

                                <div className="flex justify-between text-[#D8C4B2]">
                                    <span>
                                        Shipping
                                    </span>

                                    <span>
                                        {shipping.toFixed(2)} EGP
                                    </span>
                                </div>

                                <div className="flex justify-between text-xl pt-4 border-t border-white/20">
                                    <span>
                                        Total
                                    </span>

                                    <strong>
                                        {total.toFixed(2)} EGP
                                    </strong>
                                </div>

                            </div>

                            <button
                                onClick={placeOrder}
                                disabled={placingOrder}
                                className="w-full mt-8 rounded-xl bg-white text-[#260304] py-5 text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#F1E7DA] transition disabled:opacity-50"
                            >
                                {placingOrder
                                    ? paymentMethod === "STRIPE"
                                        ? "CONNECTING TO STRIPE..."
                                        : "PLACING ORDER..."
                                    : paymentMethod === "STRIPE"
                                        ? "PAY WITH CARD"
                                        : "PLACE ORDER"}
                            </button>

                            <Link
                                to="/cart"
                                className="block text-center mt-5 text-xs uppercase tracking-[0.15em] text-[#D8C4B2] hover:text-white"
                            >
                                ← Back to Cart
                            </Link>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
