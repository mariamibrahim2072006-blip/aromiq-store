import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "https://aromiq-store-production.up.railway.app";

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const token = localStorage.getItem("aromiq_token");

    useEffect(() => {
        const loadOrders = async () => {
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(
                    `${API_URL}/api/orders`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Failed to load orders."
                    );
                }

                setOrders(data.orders);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadOrders();
    }, [token]);

    if (!token) {
        return (
            <section className="min-h-[70vh] flex items-center justify-center bg-[#FDFBF7]">
                <div className="text-center">

                    <h1 className="text-4xl font-serif text-[#260304]">
                        Sign in to view your orders
                    </h1>

                    <Link
                        to="/account"
                        className="inline-block mt-7 bg-[#260304] text-white px-7 py-4 text-xs uppercase tracking-[0.2em]"
                    >
                        Go to Account
                    </Link>

                </div>
            </section>
        );
    }

    if (loading) {
        return (
            <section className="min-h-[70vh] flex items-center justify-center bg-[#FDFBF7]">
                <p className="text-xs uppercase tracking-[0.3em] text-[#7A695A]">
                    Loading orders...
                </p>
            </section>
        );
    }

    return (
        <section className="min-h-screen bg-[#FDFBF7] px-6 lg:px-20 py-16">

            <div className="max-w-6xl mx-auto">

                <span className="text-xs uppercase tracking-[0.3em] text-[#7A695A]">
                    AROMIQ
                </span>

                <h1 className="mt-4 text-5xl font-serif text-[#260304]">
                    My Orders
                </h1>

                {error && (
                    <div className="mt-8 p-4 bg-[#F3E5E5] text-[#6B1719]">
                        {error}
                    </div>
                )}

                {orders.length === 0 ? (
                    <div className="mt-20 text-center">

                        <h2 className="text-3xl font-serif text-[#260304]">
                            No orders yet
                        </h2>

                        <p className="mt-4 text-sm text-[#6B625D]">
                            Your completed orders will appear here.
                        </p>

                        <Link
                            to="/shop"
                            className="inline-block mt-7 bg-[#260304] text-white px-8 py-4 text-xs uppercase tracking-[0.2em]"
                        >
                            Explore Collection
                        </Link>

                    </div>
                ) : (
                    <div className="mt-12 space-y-8">

                        {orders.map((order) => (
                            <div
                                key={order.id}
                                className="bg-[#F5F0E6] p-6 lg:p-8"
                            >

                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                                    <div>
                                        <p className="text-xs uppercase tracking-[0.2em] text-[#7A695A]">
                                            ORDER
                                        </p>

                                        <p className="mt-2 text-sm break-all">
                                            {order.id}
                                        </p>
                                    </div>

                                    <div>
                                        <span className="inline-block px-4 py-2 bg-[#260304] text-white text-xs uppercase tracking-[0.15em]">
                                            {order.status}
                                        </span>
                                    </div>

                                </div>

                                <div className="mt-7 space-y-4">

                                    {order.items.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex items-center gap-4 border-t border-[#D8CEC2] pt-4"
                                        >

                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-16 h-20 object-cover"
                                            />

                                            <div className="flex-1">
                                                <h3 className="font-serif text-lg text-[#260304]">
                                                    {item.name}
                                                </h3>

                                                <p className="text-sm text-[#6B625D]">
                                                    Qty: {item.quantity}
                                                </p>
                                            </div>

                                            <strong>
                                                $
                                                {(item.price * item.quantity).toFixed(2)}
                                            </strong>

                                        </div>
                                    ))}

                                </div>

                                <div className="mt-7 border-t border-[#D8CEC2] pt-5 flex justify-between">

                                    <span>
                                        Total
                                    </span>

                                    <strong className="text-lg">
                                        ${order.total.toFixed(2)}
                                    </strong>

                                </div>

                            </div>
                        ))}

                    </div>
                )}

            </div>

        </section>
    );
}
