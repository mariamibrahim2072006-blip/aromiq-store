import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    ArrowRight,
    LogOut,
    User,
    Mail,
    Lock,
    Sparkles,
} from "lucide-react";

const API_URL = "https://charming-bravery-production-9bdf.up.railway.app/api";

export default function Account() {
    const navigate = useNavigate();

    const [mode, setMode] = useState("login");
    const [loading, setLoading] = useState(false);
    const [checkingAuth, setCheckingAuth] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [user, setUser] = useState(null);

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    // ========================================
    // CHECK CURRENT USER
    // ========================================

    useEffect(() => {
        const token = localStorage.getItem("aromiq_token");

        if (!token) {
            setCheckingAuth(false);
            return;
        }

        fetch(`${API_URL}/auth/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(async (response) => {
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Authentication failed.");
                }

                return data;
            })
            .then((data) => {
                setUser(data.user);
            })
            .catch(() => {
                localStorage.removeItem("aromiq_token");
                localStorage.removeItem("aromiq_user");
            })
            .finally(() => {
                setCheckingAuth(false);
            });
    }, []);

    // ========================================
    // FORM CHANGE
    // ========================================

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

        setError("");
        setSuccess("");
    }

    // ========================================
    // LOGIN / REGISTER
    // ========================================

    async function handleSubmit(e) {
        e.preventDefault();

        setError("");
        setSuccess("");
        setLoading(true);

        try {
            const endpoint =
                mode === "login"
                    ? `${API_URL}/auth/login`
                    : `${API_URL}/auth/register`;

            const body =
                mode === "login"
                    ? {
                        email: form.email,
                        password: form.password,
                    }
                    : {
                        name: form.name,
                        email: form.email,
                        password: form.password,
                    };

            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Something went wrong.");
            }

            localStorage.setItem("aromiq_token", data.token);
            localStorage.setItem("aromiq_user", JSON.stringify(data.user));

            setUser(data.user);

            setForm({
                name: "",
                email: "",
                password: "",
            });

            setSuccess(
                mode === "login"
                    ? "Welcome back to Aromiq."
                    : "Your Aromiq account has been created."
            );
        } catch (err) {
            setError(err.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    }

    // ========================================
    // LOGOUT
    // ========================================

    async function handleLogout() {
        const token = localStorage.getItem("aromiq_token");

        try {
            if (token) {
                await fetch(`${API_URL}/auth/logout`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            }
        } catch {
            // Even if API logout fails, remove local session.
        }

        localStorage.removeItem("aromiq_token");
        localStorage.removeItem("aromiq_user");

        setUser(null);
        setSuccess("You have been logged out.");
    }

    // ========================================
    // LOADING
    // ========================================

    if (checkingAuth) {
        return (
            <main className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
                <div className="text-center">
                    <Sparkles
                        size={24}
                        strokeWidth={1.3}
                        className="mx-auto text-[#8C7A6B] animate-pulse"
                    />

                    <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-[#7A695A]">
                        Checking your account
                    </p>
                </div>
            </main>
        );
    }

    // ========================================
    // LOGGED IN
    // ========================================

    if (user) {
        return (
            <main className="min-h-screen bg-[#FDFBF7] text-[#260304]">

                <section className="px-6 lg:px-20 py-20 lg:py-28">

                    <div className="max-w-5xl mx-auto">

                        <div className="text-center mb-14">

                            <Sparkles
                                size={25}
                                strokeWidth={1.3}
                                className="mx-auto text-[#8C7A6B]"
                            />

                            <span className="block mt-5 text-[10px] uppercase tracking-[0.35em] text-[#7A695A] font-bold">
                                WELCOME TO AROMIQ
                            </span>

                            <h1 className="mt-4 text-4xl lg:text-6xl font-serif text-[#260304]">
                                Welcome,{" "}
                                <span className="italic text-[#8C7A6B]">
                                    {user.name}.
                                </span>
                            </h1>

                            <p className="mt-5 text-sm leading-7 text-[#5E5148]">
                                Your personal fragrance space, all in one place.
                            </p>

                        </div>


                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* PROFILE */}

                            <div className="bg-[#F5F0E6] p-8 lg:p-10">

                                <div className="w-12 h-12 rounded-full bg-[#260304] flex items-center justify-center">
                                    <User
                                        size={20}
                                        strokeWidth={1.3}
                                        className="text-[#FDFBF7]"
                                    />
                                </div>

                                <p className="mt-8 text-[9px] uppercase tracking-[0.3em] text-[#8C7A6B] font-bold">
                                    YOUR PROFILE
                                </p>

                                <h2 className="mt-3 text-2xl font-serif text-[#260304]">
                                    {user.name}
                                </h2>

                                <div className="mt-6 flex items-center gap-3 text-sm text-[#5E5148]">
                                    <Mail size={16} strokeWidth={1.4} />
                                    {user.email}
                                </div>

                            </div>


                            {/* COLLECTION */}

                            <div className="bg-[#260304] p-8 lg:p-10 text-[#FDFBF7]">

                                <div className="w-12 h-12 rounded-full border border-[#D8C8BC]/30 flex items-center justify-center">
                                    <Sparkles
                                        size={20}
                                        strokeWidth={1.3}
                                        className="text-[#D8C8BC]"
                                    />
                                </div>

                                <p className="mt-8 text-[9px] uppercase tracking-[0.3em] text-[#D8C8BC] font-bold">
                                    YOUR JOURNEY
                                </p>

                                <h2 className="mt-3 text-2xl font-serif">
                                    Discover your signature.
                                </h2>

                                <p className="mt-4 text-sm leading-7 text-[#F7EFE8]/70">
                                    Explore our collection and find a fragrance that feels
                                    naturally yours.
                                </p>

                                <Link
                                    to="/collection"
                                    className="inline-flex items-center gap-3 mt-7 text-[10px] uppercase tracking-[0.2em] font-bold text-[#FDFBF7] border-b border-[#FDFBF7]/50 pb-2"
                                >
                                    Explore Collection
                                    <ArrowRight size={14} />
                                </Link>

                            </div>

                        </div>


                        {/* LOGOUT */}

                        <div className="mt-10 text-center">

                            <button
                                onClick={handleLogout}
                                className="inline-flex items-center gap-3 border border-[#260304]/20 px-7 py-3 text-[10px] uppercase tracking-[0.2em] font-bold text-[#260304] hover:bg-[#260304] hover:text-[#FDFBF7] transition"
                            >
                                <LogOut size={15} />
                                Sign Out
                            </button>

                        </div>

                    </div>

                </section>

            </main>
        );
    }

    // ========================================
    // LOGIN / REGISTER
    // ========================================

    return (
        <main className="min-h-screen bg-[#FDFBF7] text-[#260304]">

            <section className="min-h-[calc(100vh-72px)] flex items-center px-6 lg:px-20 py-16">

                <div className="max-w-md w-full mx-auto">

                    {/* HEADER */}

                    <div className="text-center mb-10">

                        <Sparkles
                            size={24}
                            strokeWidth={1.3}
                            className="mx-auto text-[#8C7A6B]"
                        />

                        <span className="block mt-5 text-[10px] uppercase tracking-[0.35em] text-[#7A695A] font-bold">
                            {mode === "login" ? "WELCOME BACK" : "JOIN AROMIQ"}
                        </span>

                        <h1 className="mt-4 text-4xl lg:text-5xl font-serif">
                            {mode === "login" ? (
                                <>
                                    Welcome{" "}
                                    <span className="italic text-[#8C7A6B]">
                                        back.
                                    </span>
                                </>
                            ) : (
                                <>
                                    Create your{" "}
                                    <span className="italic text-[#8C7A6B]">
                                        account.
                                    </span>
                                </>
                            )}
                        </h1>

                        <p className="mt-4 text-sm text-[#7A695A]">
                            {mode === "login"
                                ? "Sign in to continue your fragrance journey."
                                : "Create an account and make Aromiq yours."}
                        </p>

                    </div>


                    {/* FORM */}

                    <form
                        onSubmit={handleSubmit}
                        className="bg-[#F5F0E6] p-7 lg:p-9"
                    >

                        {mode === "register" && (
                            <div className="mb-5">

                                <label className="block text-[9px] uppercase tracking-[0.25em] text-[#7A695A] font-bold mb-2">
                                    Full Name
                                </label>

                                <div className="relative">

                                    <User
                                        size={16}
                                        strokeWidth={1.4}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8C7A6B]"
                                    />

                                    <input
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="Your name"
                                        className="w-full bg-[#FDFBF7] border border-[#260304]/10 px-11 py-3.5 text-sm text-[#260304] outline-none focus:border-[#8C7A6B] transition"
                                    />

                                </div>

                            </div>
                        )}


                        <div className="mb-5">

                            <label className="block text-[9px] uppercase tracking-[0.25em] text-[#7A695A] font-bold mb-2">
                                Email Address
                            </label>

                            <div className="relative">

                                <Mail
                                    size={16}
                                    strokeWidth={1.4}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8C7A6B]"
                                />

                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    className="w-full bg-[#FDFBF7] border border-[#260304]/10 px-11 py-3.5 text-sm text-[#260304] outline-none focus:border-[#8C7A6B] transition"
                                />

                            </div>

                        </div>


                        <div>

                            <label className="block text-[9px] uppercase tracking-[0.25em] text-[#7A695A] font-bold mb-2">
                                Password
                            </label>

                            <div className="relative">

                                <Lock
                                    size={16}
                                    strokeWidth={1.4}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8C7A6B]"
                                />

                                <input
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    minLength={6}
                                    className="w-full bg-[#FDFBF7] border border-[#260304]/10 px-11 py-3.5 text-sm text-[#260304] outline-none focus:border-[#8C7A6B] transition"
                                />

                            </div>

                        </div>


                        {/* ERROR */}

                        {error && (
                            <div className="mt-5 bg-[#260304]/5 border border-[#260304]/10 px-4 py-3 text-xs text-[#6D1A1D]">
                                {error}
                            </div>
                        )}


                        {/* SUCCESS */}

                        {success && (
                            <div className="mt-5 bg-[#8C7A6B]/10 border border-[#8C7A6B]/20 px-4 py-3 text-xs text-[#5E5148]">
                                {success}
                            </div>
                        )}


                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-7 bg-[#260304] text-[#FDFBF7] py-4 text-[10px] uppercase tracking-[0.22em] font-bold hover:bg-[#3B1214] disabled:opacity-50 transition flex items-center justify-center gap-3"
                        >
                            {loading
                                ? "Please wait..."
                                : mode === "login"
                                    ? "Sign In"
                                    : "Create Account"}

                            {!loading && <ArrowRight size={15} />}
                        </button>

                    </form>


                    {/* SWITCH MODE */}

                    <div className="text-center mt-7">

                        <p className="text-xs text-[#7A695A]">

                            {mode === "login"
                                ? "Don't have an account?"
                                : "Already have an account?"}

                            <button
                                type="button"
                                onClick={() => {
                                    setMode(mode === "login" ? "register" : "login");
                                    setError("");
                                    setSuccess("");
                                }}
                                className="ml-2 text-[#260304] font-bold border-b border-[#260304]"
                            >
                                {mode === "login"
                                    ? "Create one"
                                    : "Sign in"}
                            </button>

                        </p>

                    </div>

                </div>

            </section>

        </main>
    );
}
