import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const API_URL = "https://aromiq-store-production.up.railway.app";

export default function AdminDashboard() {
    const navigate = useNavigate();

    const [admin, setAdmin] = useState(null);

    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [stats, setStats] = useState(null);

    const [loading, setLoading] = useState(true);
    const [activeSection, setActiveSection] = useState("dashboard");

    const [editingProduct, setEditingProduct] = useState(null);
    const [showAddProduct, setShowAddProduct] = useState(false);

    const [savingProduct, setSavingProduct] = useState(false);
    const [updatingOrder, setUpdatingOrder] = useState(null);

    const [productForm, setProductForm] = useState({
        name: "",
        price: "",
        image: "",
        category: "",
        description: "",
    });

    /* =========================================================
       AUTHENTICATION
    ========================================================= */

    useEffect(() => {
        const storedAdmin = localStorage.getItem("adminUser");
        const token = localStorage.getItem("adminToken");

        if (!storedAdmin || !token) {
            navigate("/admin/login");
            return;
        }

        try {
            const user = JSON.parse(storedAdmin);

            if (user.role !== "ADMIN") {
                localStorage.removeItem("adminUser");
                localStorage.removeItem("adminToken");

                navigate("/admin/login");
                return;
            }

            setAdmin(user);
            loadAllAdminData();
        } catch (error) {
            console.error("Admin authentication error:", error);

            localStorage.removeItem("adminUser");
            localStorage.removeItem("adminToken");

            navigate("/admin/login");
        }
    }, [navigate]);

    /* =========================================================
       HEADERS
    ========================================================= */

    const getHeaders = () => {
        const token = localStorage.getItem("adminToken");

        return {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        };
    };

    /* =========================================================
       UNAUTHORIZED
    ========================================================= */

    const handleUnauthorized = () => {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUser");

        navigate("/admin/login");
    };

    /* =========================================================
       API REQUEST HELPER
    ========================================================= */

    const apiRequest = async (url, options = {}) => {
        const response = await fetch(url, {
            ...options,
            headers: {
                ...getHeaders(),
                ...(options.headers || {}),
            },
        });

        if (response.status === 401) {
            handleUnauthorized();
            throw new Error("Unauthorized");
        }

        return response;
    };

    /* =========================================================
       LOAD ALL ADMIN DATA
    ========================================================= */

    const loadAllAdminData = async () => {
        setLoading(true);

        try {
            const [
                dashboardResponse,
                productsResponse,
                ordersResponse,
                customersResponse,
            ] = await Promise.all([
                apiRequest(`${API_URL}/api/admin/dashboard`),

                apiRequest(`${API_URL}/api/admin/products`),

                apiRequest(`${API_URL}/api/admin/orders`),

                apiRequest(`${API_URL}/api/admin/customers`),
            ]);

            /* =================================================
               DASHBOARD
            ================================================= */

            if (dashboardResponse.ok) {
                const data = await dashboardResponse.json();

                setStats(data.stats || data || null);
            }

            /* =================================================
               PRODUCTS
            ================================================= */

            if (productsResponse.ok) {
                const data = await productsResponse.json();

                setProducts(
                    Array.isArray(data)
                        ? data
                        : data.products || []
                );
            }

            /* =================================================
               ORDERS
            ================================================= */

            if (ordersResponse.ok) {
                const data = await ordersResponse.json();

                setOrders(
                    Array.isArray(data)
                        ? data
                        : data.orders || []
                );
            }

            /* =================================================
               CUSTOMERS
            ================================================= */

            if (customersResponse.ok) {
                const data = await customersResponse.json();

                setCustomers(
                    Array.isArray(data)
                        ? data
                        : data.customers || []
                );
            }
        } catch (error) {
            if (error.message !== "Unauthorized") {
                console.error(
                    "Admin dashboard loading error:",
                    error
                );
            }
        } finally {
            setLoading(false);
        }
    };

    /* =========================================================
       PRODUCT FORM
    ========================================================= */

    const resetProductForm = () => {
        setProductForm({
            name: "",
            price: "",
            image: "",
            category: "",
            description: "",
        });
    };

    const openAddProduct = () => {
        setEditingProduct(null);
        resetProductForm();
        setShowAddProduct(true);
    };

    const openEditProduct = (product) => {
        setEditingProduct(product);

        setProductForm({
            name: product.name || "",
            price: product.price ?? "",
            image: product.image || "",
            category: product.category || "",
            description: product.description || "",
        });

        setShowAddProduct(false);
    };

    const closeProductForm = () => {
        setEditingProduct(null);
        setShowAddProduct(false);
        resetProductForm();
    };

    const handleProductChange = (event) => {
        const { name, value } = event.target;

        setProductForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    /* =========================================================
       CREATE PRODUCT
    ========================================================= */

    const createProduct = async (event) => {
        event.preventDefault();

        if (!productForm.name.trim()) {
            alert("Please enter product name.");
            return;
        }

        if (!productForm.price) {
            alert("Please enter product price.");
            return;
        }

        if (!productForm.image.trim()) {
            alert("Please enter product image URL.");
            return;
        }

        setSavingProduct(true);

        try {
            const response = await apiRequest(
                `${API_URL}/api/admin/products`,
                {
                    method: "POST",
                    body: JSON.stringify({
                        name: productForm.name.trim(),
                        price: Number(productForm.price),
                        image: productForm.image.trim(),
                        category:
                            productForm.category.trim() ||
                            "AROMIQ PERFUME",
                        description:
                            productForm.description.trim(),
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(
                    data.message ||
                    "Failed to create product."
                );
                return;
            }

            alert("Product created successfully.");

            closeProductForm();

            await loadAllAdminData();
        } catch (error) {
            if (error.message !== "Unauthorized") {
                console.error(
                    "CREATE PRODUCT ERROR:",
                    error
                );

                alert(
                    "Something went wrong while creating the product."
                );
            }
        } finally {
            setSavingProduct(false);
        }
    };

    /* =========================================================
       UPDATE PRODUCT
    ========================================================= */

    const updateProduct = async (event) => {
        event.preventDefault();

        if (!editingProduct) return;

        setSavingProduct(true);

        try {
            const response = await apiRequest(
                `${API_URL}/api/admin/products/${editingProduct.id}`,
                {
                    method: "PATCH",
                    body: JSON.stringify({
                        name: productForm.name.trim(),
                        price: Number(productForm.price),
                        image: productForm.image.trim(),
                        category:
                            productForm.category.trim() ||
                            "AROMIQ PERFUME",
                        description:
                            productForm.description.trim(),
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(
                    data.message ||
                    "Failed to update product."
                );
                return;
            }

            alert("Product updated successfully.");

            closeProductForm();

            await loadAllAdminData();
        } catch (error) {
            if (error.message !== "Unauthorized") {
                console.error(
                    "UPDATE PRODUCT ERROR:",
                    error
                );

                alert(
                    "Something went wrong while updating the product."
                );
            }
        } finally {
            setSavingProduct(false);
        }
    };

    /* =========================================================
       DELETE PRODUCT
    ========================================================= */

    const deleteProduct = async (productId) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmed) return;

        try {
            const response = await apiRequest(
                `${API_URL}/api/admin/products/${productId}`,
                {
                    method: "DELETE",
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(
                    data.message ||
                    "Failed to delete product."
                );
                return;
            }

            alert("Product deleted successfully.");

            await loadAllAdminData();
        } catch (error) {
            if (error.message !== "Unauthorized") {
                console.error(
                    "DELETE PRODUCT ERROR:",
                    error
                );

                alert(
                    "Something went wrong while deleting the product."
                );
            }
        }
    };

    /* =========================================================
       UPDATE ORDER STATUS
    ========================================================= */

    const updateOrderStatus = async (orderId, status) => {
        setUpdatingOrder(orderId);

        try {
            const response = await apiRequest(
                `${API_URL}/api/admin/orders/${orderId}/status`,
                {
                    method: "PATCH",
                    body: JSON.stringify({
                        status,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(
                    data.message ||
                    "Failed to update order status."
                );
                return;
            }

            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.id === orderId
                        ? {
                            ...order,
                            status:
                                data.order?.status ||
                                status,
                        }
                        : order
                )
            );
        } catch (error) {
            if (error.message !== "Unauthorized") {
                console.error(
                    "UPDATE ORDER STATUS ERROR:",
                    error
                );

                alert(
                    "Something went wrong while updating the order."
                );
            }
        } finally {
            setUpdatingOrder(null);
        }
    };

    /* =========================================================
       LOGOUT
    ========================================================= */

    const logout = () => {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUser");

        navigate("/admin/login");
    };

    /* =========================================================
       HELPERS
    ========================================================= */

    const getStatusClass = (status) => {
        return String(status || "PENDING")
            .toLowerCase()
            .replace(/\s+/g, "-");
    };

    const getOrderId = (id) => {
        if (!id) return "------";

        return String(id).slice(-6).toUpperCase();
    };

    const getProductImage = (image) => {
        if (!image) return null;

        if (
            image.startsWith("http://") ||
            image.startsWith("https://") ||
            image.startsWith("/")
        ) {
            return image;
        }

        return image;
    };

    const totalProducts =
        stats?.totalProducts ??
        products.length;

    const totalOrders =
        stats?.totalOrders ??
        orders.length;

    const totalCustomers =
        stats?.totalCustomers ??
        customers.length;

    const totalRevenue =
        Number(stats?.totalRevenue ?? 0);

    const pendingOrders =
        stats?.pendingOrders ??
        orders.filter(
            (order) =>
                String(order.status || "")
                    .toUpperCase() === "PENDING"
        ).length;

    /* =========================================================
       LOADING
    ========================================================= */

    if (loading && !admin) {
        return (
            <div className="admin-loading">
                <div>
                    <div className="admin-spinner"></div>
                    <p>Loading Admin Panel...</p>
                </div>
            </div>
        );
    }

    /* =========================================================
       RENDER
    ========================================================= */

    return (
        <div className="admin-layout">

            {/* =================================================
                SIDEBAR
            ================================================= */}

            <aside className="admin-sidebar">

                <div className="sidebar-logo">
                    AROMIQ
                </div>

                <div className="sidebar-label">
                    ADMIN PANEL
                </div>

                <nav className="admin-nav">

                    <button
                        className={
                            activeSection === "dashboard"
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            setActiveSection("dashboard")
                        }
                    >
                        <span>⌂</span>
                        Dashboard
                    </button>

                    <button
                        className={
                            activeSection === "products"
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            setActiveSection("products")
                        }
                    >
                        <span>◈</span>
                        Products
                    </button>

                    <button
                        className={
                            activeSection === "orders"
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            setActiveSection("orders")
                        }
                    >
                        <span>▣</span>
                        Orders
                    </button>

                    <button
                        className={
                            activeSection === "customers"
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            setActiveSection("customers")
                        }
                    >
                        <span>♙</span>
                        Customers
                    </button>

                </nav>

                <div className="sidebar-bottom">

                    <button
                        onClick={() => navigate("/")}
                    >
                        ← View Store
                    </button>

                    <button
                        className="logout-button"
                        onClick={logout}
                    >
                        ⎋ Logout
                    </button>

                </div>

            </aside>

            {/* =================================================
                MAIN
            ================================================= */}

            <main className="admin-main">

                {/* HEADER */}

                <header className="admin-header">

                    <div>
                        <p className="header-small">
                            AROMIQ STORE
                        </p>

                        <h1>
                            {activeSection === "dashboard" &&
                                "Dashboard"}

                            {activeSection === "products" &&
                                "Products"}

                            {activeSection === "orders" &&
                                "Orders"}

                            {activeSection === "customers" &&
                                "Customers"}
                        </h1>
                    </div>

                    <div className="admin-profile">

                        <div className="profile-avatar">
                            {admin?.name
                                ?.charAt(0)
                                ?.toUpperCase() || "A"}
                        </div>

                        <div>
                            <strong>
                                {admin?.name || "Admin"}
                            </strong>

                            <span>
                                Administrator
                            </span>
                        </div>

                    </div>

                </header>

                {/* =================================================
                    DASHBOARD
                ================================================= */}

                {activeSection === "dashboard" && (

                    <section>

                        <div className="welcome-card">

                            <div>
                                <p>WELCOME BACK</p>

                                <h2>
                                    Hello,{" "}
                                    {admin?.name || "Admin"} 👋
                                </h2>

                                <span>
                                    Here's what's happening
                                    with your store today.
                                </span>
                            </div>

                            <div className="welcome-logo">
                                A
                            </div>

                        </div>

                        {/* STATS */}

                        {/* STATS */}

                        <div className="stats-grid">

                            {/* TOTAL PRODUCTS */}

                            <div
                                className="stat-card clickable-stat"
                                onClick={() => setActiveSection("products")}
                            >
                                <div className="stat-icon">
                                    ◈
                                </div>

                                <div>
                                    <span>
                                        Total Products
                                    </span>

                                    <strong>
                                        {totalProducts}
                                    </strong>
                                </div>
                            </div>


                            {/* TOTAL ORDERS */}

                            <div
                                className="stat-card clickable-stat"
                                onClick={() => setActiveSection("orders")}
                            >
                                <div className="stat-icon">
                                    ▣
                                </div>

                                <div>
                                    <span>
                                        Total Orders
                                    </span>

                                    <strong>
                                        {totalOrders}
                                    </strong>
                                </div>
                            </div>


                            {/* REVENUE */}

                            <div
                                className="stat-card clickable-stat"
                                onClick={() => setActiveSection("orders")}
                            >
                                <div className="stat-icon">
                                    $
                                </div>

                                <div>
                                    <span>
                                        Revenue
                                    </span>

                                    <strong>
                                        {totalRevenue.toFixed(2)} EGP
                                    </strong>
                                </div>
                            </div>


                            {/* PENDING ORDERS */}

                            <div
                                className="stat-card clickable-stat"
                                onClick={() => setActiveSection("orders")}
                            >
                                <div className="stat-icon">
                                    !
                                </div>

                                <div>
                                    <span>
                                        Pending Orders
                                    </span>

                                    <strong>
                                        {pendingOrders}
                                    </strong>
                                </div>
                            </div>

                        </div>

                        {/* QUICK STATS */}

                        <div className="section-card">

                            <div className="section-header">

                                <div>
                                    <h2>
                                        Store Overview
                                    </h2>

                                    <p>
                                        Quick overview of your store
                                    </p>
                                </div>

                                <button
                                    onClick={loadAllAdminData}
                                >
                                    Refresh
                                </button>

                            </div>

                            <div className="stats-grid">

                                {/* CUSTOMERS */}

                                <div
                                    className="stat-card clickable-stat"
                                    onClick={() => setActiveSection("customers")}
                                >
                                    <div className="stat-icon">
                                        ♙
                                    </div>

                                    <div>
                                        <span>
                                            Customers
                                        </span>

                                        <strong>
                                            {totalCustomers}
                                        </strong>
                                    </div>
                                </div>


                                {/* DELIVERED */}

                                <div
                                    className="stat-card clickable-stat"
                                    onClick={() => setActiveSection("orders")}
                                >
                                    <div className="stat-icon">
                                        ✓
                                    </div>

                                    <div>
                                        <span>
                                            Delivered
                                        </span>

                                        <strong>
                                            {
                                                orders.filter(
                                                    (order) =>
                                                        String(
                                                            order.status
                                                        ).toUpperCase() ===
                                                        "DELIVERED"
                                                ).length
                                            }
                                        </strong>
                                    </div>
                                </div>


                                {/* SHIPPED */}

                                <div
                                    className="stat-card clickable-stat"
                                    onClick={() => setActiveSection("orders")}
                                >
                                    <div className="stat-icon">
                                        →
                                    </div>

                                    <div>
                                        <span>
                                            Shipped
                                        </span>

                                        <strong>
                                            {
                                                orders.filter(
                                                    (order) =>
                                                        String(
                                                            order.status
                                                        ).toUpperCase() ===
                                                        "SHIPPED"
                                                ).length
                                            }
                                        </strong>
                                    </div>
                                </div>


                                {/* CANCELLED */}

                                <div
                                    className="stat-card clickable-stat"
                                    onClick={() => setActiveSection("orders")}
                                >
                                    <div className="stat-icon">
                                        ×
                                    </div>

                                    <div>
                                        <span>
                                            Cancelled
                                        </span>

                                        <strong>
                                            {
                                                orders.filter(
                                                    (order) =>
                                                        String(
                                                            order.status
                                                        ).toUpperCase() ===
                                                        "CANCELLED"
                                                ).length
                                            }
                                        </strong>
                                    </div>
                                </div>

                            </div>

                        </div>

                        {/* RECENT ORDERS */}

                        <div className="section-card">

                            <div className="section-header">

                                <div>
                                    <h2>
                                        Recent Orders
                                    </h2>

                                    <p>
                                        Latest orders from your customers
                                    </p>
                                </div>

                                <button
                                    onClick={() =>
                                        setActiveSection("orders")
                                    }
                                >
                                    View All
                                </button>

                            </div>

                            {orders.length === 0 ? (

                                <div className="empty-state">
                                    No orders yet.
                                </div>

                            ) : (

                                <div className="orders-table">

                                    <div className="table-header">

                                        <span>Order</span>
                                        <span>Customer</span>
                                        <span>Total</span>
                                        <span>Status</span>

                                    </div>

                                    {orders
                                        .slice(0, 5)
                                        .map((order) => (

                                            <div
                                                className="table-row"
                                                key={order.id}
                                            >

                                                <span>
                                                    #
                                                    {getOrderId(
                                                        order.id
                                                    )}
                                                </span>

                                                <span>
                                                    {order.firstName ||
                                                        "-"}{" "}
                                                    {order.lastName ||
                                                        ""}
                                                </span>

                                                <span>
                                                    {Number(
                                                        order.total || 0
                                                    ).toFixed(2)}{" "}
                                                    EGP
                                                </span>

                                                <span>
                                                    <b
                                                        className={`status ${getStatusClass(
                                                            order.status
                                                        )}`}
                                                    >
                                                        {order.status ||
                                                            "PENDING"}
                                                    </b>
                                                </span>

                                            </div>

                                        ))}

                                </div>

                            )}

                        </div>

                    </section>
                )}

                {/* =================================================
                    PRODUCTS
                ================================================= */}

                {activeSection === "products" && (

                    <section className="section-card">

                        <div className="section-header">

                            <div>
                                <h2>
                                    Products
                                </h2>

                                <p>
                                    Manage your AROMIQ products
                                </p>
                            </div>

                            <div
                                style={{
                                    display: "flex",
                                    gap: "10px",
                                }}
                            >

                                <button
                                    onClick={loadAllAdminData}
                                >
                                    Refresh
                                </button>

                                <button
                                    className="primary-button"
                                    onClick={openAddProduct}
                                >
                                    + Add Product
                                </button>

                            </div>

                        </div>

                        {products.length === 0 ? (

                            <div className="empty-state">
                                No products found.
                            </div>

                        ) : (

                            <div className="products-grid">

                                {products.map((product) => {

                                    const image =
                                        getProductImage(
                                            product.image
                                        );

                                    return (
                                        <div
                                            className="product-admin-card"
                                            key={product.id}
                                        >

                                            {/* IMAGE */}

                                            <div className="product-image">

                                                {image ? (

                                                    <img
                                                        src={image}
                                                        alt={
                                                            product.name ||
                                                            "Product"
                                                        }
                                                        onError={(e) => {
                                                            e.currentTarget.style.display =
                                                                "none";
                                                        }}
                                                    />

                                                ) : (

                                                    <div className="product-placeholder">
                                                        A
                                                    </div>

                                                )}

                                                <span className="product-id">
                                                    #{product.id}
                                                </span>

                                            </div>

                                            {/* INFO */}

                                            <div className="product-info">

                                                <span className="product-category">
                                                    {product.category ||
                                                        "AROMIQ PERFUME"}
                                                </span>

                                                <h3>
                                                    {product.name ||
                                                        "Unnamed Product"}
                                                </h3>

                                                {product.description && (
                                                    <p className="product-description">
                                                        {
                                                            product.description
                                                        }
                                                    </p>
                                                )}

                                                <div className="product-bottom">

                                                    <strong>
                                                        {Number(
                                                            product.price ||
                                                            0
                                                        ).toFixed(2)}{" "}
                                                        EGP
                                                    </strong>

                                                </div>

                                            </div>

                                            {/* ACTIONS */}

                                            <div className="product-actions">

                                                <button
                                                    className="edit-button"
                                                    onClick={() =>
                                                        openEditProduct(
                                                            product
                                                        )
                                                    }
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    className="delete-button"
                                                    onClick={() =>
                                                        deleteProduct(
                                                            product.id
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </button>

                                            </div>

                                        </div>
                                    );
                                })}

                            </div>

                        )}

                    </section>
                )}

                {/* =================================================
                    ORDERS
                ================================================= */}

                {activeSection === "orders" && (

                    <section className="section-card">

                        <div className="section-header">

                            <div>
                                <h2>
                                    All Orders
                                </h2>

                                <p>
                                    Manage customer orders
                                </p>
                            </div>

                            <button
                                onClick={loadAllAdminData}
                            >
                                Refresh
                            </button>

                        </div>

                        {orders.length === 0 ? (

                            <div className="empty-state">
                                No orders found.
                            </div>

                        ) : (

                            <div className="orders-table">

                                <div className="table-header orders-header">

                                    <span>Order</span>
                                    <span>Customer</span>
                                    <span>Phone</span>
                                    <span>Total</span>
                                    <span>Status</span>

                                </div>

                                {orders.map((order) => (

                                    <div
                                        className="table-row orders-row"
                                        key={order.id}
                                    >

                                        <span>
                                            #{getOrderId(order.id)}
                                        </span>

                                        <span>
                                            <strong>
                                                {order.firstName ||
                                                    "-"}{" "}
                                                {order.lastName ||
                                                    ""}
                                            </strong>
                                        </span>

                                        <span>
                                            {order.phone || "-"}
                                        </span>

                                        <span>
                                            {Number(
                                                order.total || 0
                                            ).toFixed(2)}{" "}
                                            EGP
                                        </span>

                                        <span>

                                            <select
                                                className={`status-select ${getStatusClass(
                                                    order.status
                                                )}`}
                                                value={
                                                    order.status ||
                                                    "PENDING"
                                                }
                                                disabled={
                                                    updatingOrder ===
                                                    order.id
                                                }
                                                onChange={(e) =>
                                                    updateOrderStatus(
                                                        order.id,
                                                        e.target.value
                                                    )
                                                }
                                            >

                                                <option value="PENDING">
                                                    Pending
                                                </option>

                                                <option value="CONFIRMED">
                                                    Confirmed
                                                </option>

                                                <option value="PROCESSING">
                                                    Processing
                                                </option>

                                                <option value="SHIPPED">
                                                    Shipped
                                                </option>

                                                <option value="DELIVERED">
                                                    Delivered
                                                </option>

                                                <option value="CANCELLED">
                                                    Cancelled
                                                </option>

                                            </select>

                                        </span>

                                    </div>

                                ))}

                            </div>

                        )}

                    </section>
                )}

                {/* =================================================
                    CUSTOMERS
                ================================================= */}

                {activeSection === "customers" && (

                    <section className="section-card">

                        <div className="section-header">

                            <div>
                                <h2>
                                    Customers
                                </h2>

                                <p>
                                    Customer management
                                </p>
                            </div>

                            <button
                                onClick={loadAllAdminData}
                            >
                                Refresh
                            </button>

                        </div>

                        {customers.length === 0 ? (

                            <div className="empty-state">
                                No customers found.
                            </div>

                        ) : (

                            <div className="customer-table">

                                <div className="customer-table-header">

                                    <span>Name</span>
                                    <span>Email</span>
                                    <span>Phone</span>
                                    <span>Orders</span>
                                    <span>Role</span>

                                </div>

                                {customers.map(
                                    (customer) => (

                                        <div
                                            className="customer-table-row"
                                            key={customer.id}
                                        >

                                            <span>
                                                {customer.name ||
                                                    "-"}
                                            </span>

                                            <span>
                                                {customer.email ||
                                                    "-"}
                                            </span>

                                            <span>
                                                {customer.phone ||
                                                    "-"}
                                            </span>

                                            <span>
                                                {customer._count
                                                    ?.orders ??
                                                    customer.ordersCount ??
                                                    0}
                                            </span>

                                            <span>
                                                {customer.role ||
                                                    "CUSTOMER"}
                                            </span>

                                        </div>

                                    )
                                )}

                            </div>

                        )}

                    </section>
                )}

            </main>

            {/* =================================================
                PRODUCT MODAL
            ================================================= */}

            {(editingProduct || showAddProduct) && (

                <div
                    className="admin-modal-overlay"
                    onClick={closeProductForm}
                >

                    <div
                        className="admin-modal"
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >

                        <div className="modal-header">

                            <div>
                                <h2>
                                    {editingProduct
                                        ? "Edit Product"
                                        : "Add Product"}
                                </h2>

                                <p>
                                    {editingProduct
                                        ? "Update product information"
                                        : "Create a new AROMIQ product"}
                                </p>
                            </div>

                            <button
                                className="modal-close"
                                onClick={closeProductForm}
                            >
                                ×
                            </button>

                        </div>

                        <form
                            className="admin-form"
                            onSubmit={
                                editingProduct
                                    ? updateProduct
                                    : createProduct
                            }
                        >

                            <div className="form-grid">

                                <div className="form-group">

                                    <label>
                                        Product Name
                                    </label>

                                    <input
                                        name="name"
                                        value={
                                            productForm.name
                                        }
                                        onChange={
                                            handleProductChange
                                        }
                                        placeholder="e.g. Oud Royale"
                                        required
                                    />

                                </div>

                                <div className="form-group">

                                    <label>
                                        Price
                                    </label>

                                    <input
                                        name="price"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={
                                            productForm.price
                                        }
                                        onChange={
                                            handleProductChange
                                        }
                                        placeholder="0.00"
                                        required
                                    />

                                </div>

                                <div className="form-group">

                                    <label>
                                        Category
                                    </label>

                                    <input
                                        name="category"
                                        value={
                                            productForm.category
                                        }
                                        onChange={
                                            handleProductChange
                                        }
                                        placeholder="AROMIQ PERFUME"
                                    />

                                </div>

                                <div className="form-group">

                                    <label>
                                        Image URL
                                    </label>

                                    <input
                                        name="image"
                                        value={
                                            productForm.image
                                        }
                                        onChange={
                                            handleProductChange
                                        }
                                        placeholder="https://..."
                                        required
                                    />

                                </div>

                                <div className="form-group full">

                                    <label>
                                        Description
                                    </label>

                                    <textarea
                                        name="description"
                                        value={
                                            productForm.description
                                        }
                                        onChange={
                                            handleProductChange
                                        }
                                        placeholder="Write product description..."
                                        rows="5"
                                    />

                                </div>

                            </div>

                            <div className="form-actions">

                                <button
                                    type="button"
                                    className="secondary-button"
                                    onClick={
                                        closeProductForm
                                    }
                                    disabled={savingProduct}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="primary-button"
                                    disabled={savingProduct}
                                >
                                    {savingProduct
                                        ? "Saving..."
                                        : editingProduct
                                            ? "Save Changes"
                                            : "Create Product"}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>
            )}

        </div>
    );
}
