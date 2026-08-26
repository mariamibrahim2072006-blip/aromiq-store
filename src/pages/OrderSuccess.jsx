import { Link, useLocation } from "react-router-dom";
import { CheckCircle2, ArrowRight, Package } from "lucide-react";

export default function OrderSuccess() {
    const location = useLocation();

    const order = location.state?.order;

    return (
        <main className="min-h-[80vh] bg-[#FDFBF7] px-6 lg:px-20 py-20 flex items-center justify-center">
            <div className="w-full max-w-2xl text-center">

                {/* SUCCESS ICON */}

                <div className="flex justify-center">
                    <div className="w-20 h-20 rounded-full bg-[#F5F0E6] flex items-center justify-center">
                        <CheckCircle2
                            size={42}
                            strokeWidth={1.5}
                            className="text-[#260304]"
                        />
                    </div>
                </div>

                {/* TEXT */}

                <span className="block mt-8 text-xs tracking-[0.3em] uppercase text-[#7A695A] font-bold">
                    AROMIQ
                </span>

                <h1 className="mt-4 text-4xl lg:text-5xl font-serif text-[#260304]">
                    Order Confirmed
                </h1>

                <p className="mt-5 max-w-xl mx-auto text-sm leading-7 text-[#6B625D]">
                    Thank you for your order. Your fragrance is now being prepared
                    and we will take care of the rest.
                </p>

                {/* ORDER INFO */}

                {order && (
                    <div className="mt-10 bg-white border border-[#E8E1D7] p-7 text-left">

                        <div className="flex items-center gap-3 pb-5 border-b border-[#E8E1D7]">
                            <Package
                                size={20}
                                strokeWidth={1.5}
                                className="text-[#7A695A]"
                            />

                            <div>
                                <p className="text-[10px] uppercase tracking-[0.2em] text-[#7A695A] font-bold">
                                    Order Number
                                </p>

                                <p className="mt-1 text-sm text-[#260304] font-semibold break-all">
                                    {order.id}
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 space-y-4">

                            <div className="flex justify-between text-sm">
                                <span className="text-[#6B625D]">
                                    Subtotal
                                </span>

                                <strong className="text-[#260304]">
                                    ${Number(order.subtotal).toFixed(2)}
                                </strong>
                            </div>

                            <div className="flex justify-between text-sm">
                                <span className="text-[#6B625D]">
                                    Shipping
                                </span>

                                <strong className="text-[#260304]">
                                    ${Number(order.shipping).toFixed(2)}
                                </strong>
                            </div>

                            <div className="pt-4 border-t border-[#E8E1D7] flex justify-between">
                                <span className="font-semibold text-[#260304]">
                                    Total
                                </span>

                                <strong className="text-lg text-[#260304]">
                                    ${Number(order.total).toFixed(2)}
                                </strong>
                            </div>

                        </div>

                        <div className="mt-6 bg-[#F5F0E6] p-4">
                            <p className="text-xs text-[#6B625D]">
                                Payment Method
                            </p>

                            <p className="mt-1 text-sm font-semibold text-[#260304]">
                                Cash on Delivery
                            </p>
                        </div>

                    </div>
                )}

                {/* BUTTONS */}

                <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">

                    <Link
                        to="/orders"
                        className="inline-flex items-center justify-center gap-3 bg-[#260304] text-white px-7 py-4 text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#3B1214] transition"
                    >
                        View My Orders
                        <ArrowRight size={16} />
                    </Link>

                    <Link
                        to="/collection"
                        className="inline-flex items-center justify-center border border-[#260304] text-[#260304] px-7 py-4 text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#F5F0E6] transition"
                    >
                        Continue Shopping
                    </Link>

                </div>

            </div>
        </main>
    );
}

