/* @ts-nocheck */
import express, { Request, Response, NextFunction } from "express";
import cors, { CorsOptions } from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import Stripe from "stripe";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

dotenv.config();
/* =========================================================
   CONFIG
========================================================= */

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.error("❌ JWT_SECRET is missing from .env");
  process.exit(1);
}

if (!process.env.DATABASE_URL) {
  console.error("❌ DATABASE_URL is missing from .env");
  process.exit(1);
}

if (!process.env.STRIPE_SECRET_KEY) {
  console.error("❌ STRIPE_SECRET_KEY is missing from .env");
  process.exit(1);
}

/* =========================================================
   STRIPE
========================================================= */

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/* =========================================================
   PRISMA
========================================================= */

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

/* =========================================================
   EXPRESS
========================================================= */

const app = express();

/* =========================================================
   CORS
========================================================= */

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://aromiq-store-production.up.railway.app",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    console.error("❌ CORS blocked origin:", origin);

    return callback(
      new Error(`CORS blocked: ${origin}`)
    );
  },

  credentials: true,

  methods: [
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
    "OPTIONS",
  ],

  allowedHeaders: [
    "Content-Type",
    "Authorization",
  ],
};

app.use(cors(corsOptions));

app.use(express.json());

/* =========================================================
   EMAIL
========================================================= */

let transporter = null;

if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  console.log("📧 Email service configured");
} else {
  console.log("⚠️ Email service not configured");
}
/* =========================================================
   HELPERS
========================================================= */

function calculateCouponDiscount(coupon, subtotal) {
  let discount = 0;

  if (coupon.type === "PERCENTAGE") {
    discount = subtotal * (coupon.discount / 100);
  } else {
    discount = coupon.discount;
  }

  return Math.min(Math.max(discount, 0), subtotal);
}

async function validateCoupon(code, subtotal) {
  const normalizedCode = String(code || "")
    .trim()
    .toUpperCase();

  if (!normalizedCode) {
    return {
      valid: false,
      message: "Please enter a coupon code.",
    };
  }

  if (!Number.isFinite(subtotal) || subtotal <= 0) {
    return {
      valid: false,
      message: "Invalid subtotal.",
    };
  }

  const coupon = await prisma.coupon.findUnique({
    where: {
      code: normalizedCode,
    },
  });

  if (!coupon) {
    return {
      valid: false,
      message: "Invalid coupon code.",
    };
  }

  if (!coupon.active) {
    return {
      valid: false,
      message: "This coupon is no longer active.",
    };
  }

  if (coupon.expiresAt && coupon.expiresAt < new Date()) {
    return {
      valid: false,
      message: "This coupon has expired.",
    };
  }

  if (
    coupon.maxUses !== null &&
    coupon.usedCount >= coupon.maxUses
  ) {
    return {
      valid: false,
      message: "This coupon has reached its usage limit.",
    };
  }

  if (
    coupon.minAmount !== null &&
    subtotal < coupon.minAmount
  ) {
    return {
      valid: false,
      message: `Minimum order amount is ${coupon.minAmount.toFixed(
        2
      )} EGP.`,
    };
  }

  const discount = calculateCouponDiscount(
    coupon,
    subtotal
  );

  return {
    valid: true,
    coupon,
    discount: Number(discount.toFixed(2)),
  };
}

/* =========================================================
   AUTH MIDDLEWARE
========================================================= */

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (
    !authHeader ||
    !authHeader.startsWith("Bearer ")
  ) {
    return res.status(401).json({
      success: false,
      message: "Authentication required.",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      JWT_SECRET
    );

    req.user = decoded;

    next();
  } catch {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
}

/* =========================================================
   ADMIN MIDDLEWARE
========================================================= */

function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== "ADMIN") {
    return res.status(403).json({
      success: false,
      message: "Admin access required.",
    });
  }

  next();
}

/* =========================================================
   HEALTH
========================================================= */

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Aromiq API is running ✨",
  });
});

app.get("/api/health", async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.json({
      success: true,
      database: "connected",
    });
  } catch (error) {
    console.error("HEALTH ERROR:", error);

    res.status(500).json({
      success: false,
      database: "disconnected",
    });
  }
});

/* =========================================================
   AUTH - REGISTER
========================================================= */

app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message:
          "Name, email and password are required.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 6 characters.",
      });
    }

    const normalizedEmail =
      email.trim().toLowerCase();

    const existingUser =
      await prisma.user.findUnique({
        where: {
          email: normalizedEmail,
        },
      });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message:
          "An account with this email already exists.",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user =
      await prisma.user.create({
        data: {
          name: name.trim(),
          email: normalizedEmail,
          password: hashedPassword,
          role: "CUSTOMER",
        },

        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          role: true,
          createdAt: true,
        },
      });

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(201).json({
      success: true,
      message: "Account created successfully.",
      token,
      user,
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    res.status(500).json({
      success: false,
      message:
        "Something went wrong while creating your account.",
    });
  }
});

/* =========================================================
   AUTH - LOGIN
========================================================= */

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message:
          "Email and password are required.",
      });
    }

    const normalizedEmail =
      email.trim().toLowerCase();

    const user =
      await prisma.user.findUnique({
        where: {
          email: normalizedEmail,
        },
      });

    if (!user) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid email or password.",
      });
    }

    const passwordMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid email or password.",
      });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      success: true,
      message: "Login successful.",
      token,

      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    res.status(500).json({
      success: false,
      message:
        "Something went wrong while logging in.",
    });
  }
});

/* =========================================================
   CURRENT USER
========================================================= */

app.get(
  "/api/auth/me",
  authenticateToken,
  async (req, res) => {
    try {
      const user =
        await prisma.user.findUnique({
          where: {
            id: req.user.userId,
          },

          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            role: true,
            createdAt: true,
          },
        });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found.",
        });
      }

      res.json({
        success: true,
        user,
      });
    } catch (error) {
      console.error("ME ERROR:", error);

      res.status(500).json({
        success: false,
        message: "Something went wrong.",
      });
    }
  }
);

/* =========================================================
   LOGOUT
========================================================= */

app.post(
  "/api/auth/logout",
  authenticateToken,
  (req, res) => {
    res.json({
      success: true,
      message: "Logged out successfully.",
    });
  }
);

/* =========================================================
   PRODUCTS - PUBLIC
========================================================= */

app.get("/api/products", async (req, res) => {
  try {
    const products =
      await prisma.product.findMany({
        orderBy: {
          id: "asc",
        },
      });

    res.json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("PRODUCTS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load products.",
    });
  }
});

app.get(
  "/api/products/:id",
  async (req, res) => {
    try {
      const id = Number(req.params.id);

      if (!Number.isInteger(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid product ID.",
        });
      }

      const product =
        await prisma.product.findUnique({
          where: {
            id,
          },
        });

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found.",
        });
      }

      res.json({
        success: true,
        product,
      });
    } catch (error) {
      console.error("PRODUCT ERROR:", error);

      res.status(500).json({
        success: false,
        message: "Failed to load product.",
      });
    }
  }
);

/* =========================================================
   CART
========================================================= */

app.get(
  "/api/cart",
  authenticateToken,
  async (req, res) => {
    try {
      let cart =
        await prisma.cart.findUnique({
          where: {
            userId: req.user.userId,
          },

          include: {
            items: {
              include: {
                product: true,
              },

              orderBy: {
                id: "asc",
              },
            },
          },
        });

      if (!cart) {
        cart =
          await prisma.cart.create({
            data: {
              userId:
                req.user.userId,
            },

            include: {
              items: {
                include: {
                  product: true,
                },
              },
            },
          });
      }

      res.json({
        success: true,
        cart,
      });
    } catch (error) {
      console.error(
        "GET CART ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to load cart.",
      });
    }
  }
);

app.post(
  "/api/cart",
  authenticateToken,
  async (req, res) => {
    try {
      const productId =
        Number(req.body.productId);

      const quantity =
        Number(
          req.body.quantity || 1
        );

      if (!Number.isInteger(productId)) {
        return res.status(400).json({
          success: false,
          message:
            "Valid product ID is required.",
        });
      }

      if (
        !Number.isInteger(quantity) ||
        quantity < 1
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Quantity must be at least 1.",
        });
      }

      const product =
        await prisma.product.findUnique({
          where: {
            id: productId,
          },
        });

      if (!product) {
        return res.status(404).json({
          success: false,
          message:
            "Product not found.",
        });
      }

      let cart =
        await prisma.cart.findUnique({
          where: {
            userId:
              req.user.userId,
          },
        });

      if (!cart) {
        cart =
          await prisma.cart.create({
            data: {
              userId:
                req.user.userId,
            },
          });
      }

      const existingItem =
        await prisma.cartItem.findUnique({
          where: {
            cartId_productId: {
              cartId: cart.id,
              productId,
            },
          },
        });

      if (existingItem) {
        await prisma.cartItem.update({
          where: {
            id: existingItem.id,
          },

          data: {
            quantity:
              existingItem.quantity +
              quantity,
          },
        });
      } else {
        await prisma.cartItem.create({
          data: {
            cartId: cart.id,
            productId,
            quantity,
          },
        });
      }

      const updatedCart =
        await prisma.cart.findUnique({
          where: {
            id: cart.id,
          },

          include: {
            items: {
              include: {
                product: true,
              },
            },
          },
        });

      res.json({
        success: true,
        message:
          "Product added to cart.",
        cart: updatedCart,
      });
    } catch (error) {
      console.error(
        "ADD CART ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to add product to cart.",
      });
    }
  }
);

app.patch(
  "/api/cart/:itemId",
  authenticateToken,
  async (req, res) => {
    try {
      const quantity =
        Number(req.body.quantity);

      if (
        !Number.isInteger(quantity) ||
        quantity < 1
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Quantity must be at least 1.",
        });
      }

      const item =
        await prisma.cartItem.findUnique({
          where: {
            id: req.params.itemId,
          },

          include: {
            cart: true,
          },
        });

      if (
        !item ||
        item.cart.userId !==
        req.user.userId
      ) {
        return res.status(404).json({
          success: false,
          message:
            "Cart item not found.",
        });
      }

      const updatedItem =
        await prisma.cartItem.update({
          where: {
            id: item.id,
          },

          data: {
            quantity,
          },

          include: {
            product: true,
          },
        });

      res.json({
        success: true,
        item: updatedItem,
      });
    } catch (error) {
      console.error(
        "UPDATE CART ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to update cart.",
      });
    }
  }
);

app.delete(
  "/api/cart/:itemId",
  authenticateToken,
  async (req, res) => {
    try {
      const item =
        await prisma.cartItem.findUnique({
          where: {
            id: req.params.itemId,
          },

          include: {
            cart: true,
          },
        });

      if (
        !item ||
        item.cart.userId !==
        req.user.userId
      ) {
        return res.status(404).json({
          success: false,
          message:
            "Cart item not found.",
        });
      }

      await prisma.cartItem.delete({
        where: {
          id: item.id,
        },
      });

      res.json({
        success: true,
        message:
          "Product removed from cart.",
      });
    } catch (error) {
      console.error(
        "REMOVE CART ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to remove product.",
      });
    }
  }
);

app.get(
  "/api/cart/count",
  authenticateToken,
  async (req, res) => {
    try {
      const cart =
        await prisma.cart.findUnique({
          where: {
            userId:
              req.user.userId,
          },

          include: {
            items: true,
          },
        });

      const count =
        cart?.items.reduce(
          (total, item) =>
            total + item.quantity,
          0
        ) || 0;

      res.json({
        success: true,
        count,
      });
    } catch (error) {
      console.error(
        "CART COUNT ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to get cart count.",
      });
    }
  }
);

/* =========================================================
   COUPON APPLY - CUSTOMER
========================================================= */

app.post(
  "/api/coupons/apply",
  authenticateToken,
  async (req, res) => {
    try {
      const subtotal =
        Number(req.body.subtotal);

      const result =
        await validateCoupon(
          req.body.code,
          subtotal
        );

      if (!result.valid) {
        return res.status(400).json({
          success: false,
          message:
            result.message,
        });
      }

      res.json({
        success: true,

        coupon: {
          code:
            result.coupon.code,

          type:
            result.coupon.type,

          discount:
            result.coupon.discount,
        },

        discount:
          result.discount,

        message:
          "Coupon applied successfully.",
      });
    } catch (error) {
      console.error(
        "COUPON ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to apply coupon.",
      });
    }
  }
);

/* =========================================================
   ORDERS - CUSTOMER
========================================================= */

app.post(
  "/api/orders",
  authenticateToken,
  async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        email,
        phone,
        governorate,
        city,
        address,
        apartment,
        notes,
        couponCode,
        paymentMethod =
        "CASH_ON_DELIVERY",
      } = req.body;

      if (
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !governorate ||
        !city ||
        !address
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Please complete all required customer and shipping information.",
        });
      }

      if (
        paymentMethod !==
        "CASH_ON_DELIVERY"
      ) {
        return res.status(400).json({
          success: false,
          message:
            "For online payment, use the Stripe checkout endpoint.",
        });
      }

      const cart =
        await prisma.cart.findUnique({
          where: {
            userId:
              req.user.userId,
          },

          include: {
            items: {
              include: {
                product: true,
              },
            },
          },
        });

      if (
        !cart ||
        cart.items.length === 0
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Your cart is empty.",
        });
      }

      const subtotal =
        cart.items.reduce(
          (sum, item) =>
            sum +
            Number(
              item.product.price
            ) *
            item.quantity,
          0
        );

      const shipping = 15;

      let discount = 0;
      let validCouponCode = null;
      let coupon = null;

      if (couponCode) {
        const result =
          await validateCoupon(
            couponCode,
            subtotal
          );

        if (!result.valid) {
          return res.status(400).json({
            success: false,
            message:
              result.message,
          });
        }

        coupon =
          result.coupon;

        discount =
          result.discount;

        validCouponCode =
          coupon.code;
      }

      const total =
        Math.max(
          0,
          subtotal +
          shipping -
          discount
        );

      const order =
        await prisma.$transaction(
          async (tx) => {
            const newOrder =
              await tx.order.create({
                data: {
                  userId:
                    req.user.userId,

                  firstName:
                    firstName.trim(),

                  lastName:
                    lastName.trim(),

                  email:
                    email
                      .trim()
                      .toLowerCase(),

                  phone:
                    phone.trim(),

                  governorate:
                    governorate.trim(),

                  city:
                    city.trim(),

                  address:
                    address.trim(),

                  apartment:
                    apartment?.trim() ||
                    null,

                  notes:
                    notes?.trim() ||
                    null,

                  subtotal,
                  shipping,
                  discount,

                  total,

                  couponCode:
                    validCouponCode,

                  paymentMethod:
                    "CASH_ON_DELIVERY",

                  paymentStatus:
                    "PENDING",

                  status:
                    "PENDING",

                  items: {
                    create:
                      cart.items.map(
                        (item) => ({
                          productId:
                            item
                              .product
                              .id,

                          name:
                            item
                              .product
                              .name,

                          price:
                            item
                              .product
                              .price,

                          quantity:
                            item.quantity,

                          image:
                            item
                              .product
                              .image,
                        })
                      ),
                  },
                },

                include: {
                  items: true,
                },
              });

            if (coupon) {
              await tx.coupon.update({
                where: {
                  id:
                    coupon.id,
                },

                data: {
                  usedCount: {
                    increment: 1,
                  },
                },
              });
            }

            await tx.cartItem.deleteMany({
              where: {
                cartId:
                  cart.id,
              },
            });

            return newOrder;
          }
        );

      await prisma.user.update({
        where: {
          id:
            req.user.userId,
        },

        data: {
          phone:
            phone.trim(),
        },
      });

      if (transporter) {
        try {
          await transporter.sendMail({
            from:
              `"AROMIQ" <${process.env.EMAIL_USER}>`,

            to: order.email,

            subject:
              `AROMIQ Order Confirmation #${order.id}`,

            html: `
              <div style="font-family:Arial,sans-serif;max-width:650px;margin:auto;line-height:1.7">

                <h1 style="color:#260304;">
                  Thank you, ${order.firstName} ✨
                </h1>

                <p>
                  Your AROMIQ order has been received successfully.
                </p>

                <p>
                  <strong>Order ID:</strong>
                  ${order.id}
                </p>

                <p>
                  <strong>Total:</strong>
                  ${order.total.toFixed(2)} EGP
                </p>

                <p>
                  <strong>Payment:</strong>
                  Cash on Delivery
                </p>

              </div>
            `,
          });
        } catch (emailError) {
          console.error(
            "EMAIL ERROR:",
            emailError
          );
        }
      }

      res.status(201).json({
        success: true,
        message:
          "Order created successfully.",
        order,
      });
    } catch (error) {
      console.error(
        "CREATE ORDER ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          error.message ||
          "Failed to create order.",
      });
    }
  }
);

/* =========================================================
   STRIPE CHECKOUT
========================================================= */

app.post(
  "/api/orders/create-stripe-session",
  authenticateToken,
  async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        email,
        phone,
        governorate,
        city,
        address,
        apartment,
        notes,
        couponCode,
      } = req.body;

      if (
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !governorate ||
        !city ||
        !address
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Please complete all required customer and shipping information.",
        });
      }

      const cart =
        await prisma.cart.findUnique({
          where: {
            userId:
              req.user.userId,
          },

          include: {
            items: {
              include: {
                product: true,
              },
            },
          },
        });

      if (
        !cart ||
        cart.items.length === 0
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Your cart is empty.",
        });
      }

      const subtotal =
        cart.items.reduce(
          (sum, item) =>
            sum +
            Number(
              item.product.price
            ) *
            item.quantity,
          0
        );

      const shipping = 15;

      let discount = 0;
      let validCouponCode = null;

      if (couponCode) {
        const result =
          await validateCoupon(
            couponCode,
            subtotal
          );

        if (!result.valid) {
          return res.status(400).json({
            success: false,
            message:
              result.message,
          });
        }

        discount =
          result.discount;

        validCouponCode =
          result.coupon.code;
      }

      const total =
        Math.max(
          0,
          subtotal +
          shipping -
          discount
        );

      const order =
        await prisma.order.create({
          data: {
            userId:
              req.user.userId,

            firstName:
              firstName.trim(),

            lastName:
              lastName.trim(),

            email:
              email
                .trim()
                .toLowerCase(),

            phone:
              phone.trim(),

            governorate:
              governorate.trim(),

            city:
              city.trim(),

            address:
              address.trim(),

            apartment:
              apartment?.trim() ||
              null,

            notes:
              notes?.trim() ||
              null,

            subtotal,
            shipping,
            discount,
            total,

            couponCode:
              validCouponCode,

            paymentMethod:
              "STRIPE",

            paymentStatus:
              "PENDING",

            status:
              "PENDING",

            items: {
              create:
                cart.items.map(
                  (item) => ({
                    productId:
                      item.product.id,

                    name:
                      item.product
                        .name,

                    price:
                      item.product
                        .price,

                    quantity:
                      item.quantity,

                    image:
                      item.product
                        .image,
                  })
                ),
            },
          },
        });

      const lineItems =
        cart.items.map(
          (item) => ({
            price_data: {
              currency:
                "egp",
              product_data: {
                name:
                  item.product.name,
                description:
                  item.product.description ||
                  "",
              },

              unit_amount:
                Math.round(
                  Number(
                    item.product
                      .price
                  ) * 100
                ),
            },

            quantity:
              item.quantity,
          })
        );

      if (shipping > 0) {
        lineItems.push({
          price_data: {
            currency: "egp",

            product_data: {
              name: "Shipping",
              description: "Shipping",
            },

            unit_amount:
              Math.round(
                shipping * 100
              ),
          },

          quantity: 1,
        });
      }

      const discounts = [];

      if (discount > 0) {
        const stripeCoupon =
          await stripe.coupons.create({
            amount_off:
              Math.round(
                discount * 100
              ),

            currency:
              "egp",

            duration:
              "once",

            name:
              validCouponCode
                ? `AROMIQ Coupon ${validCouponCode}`
                : "AROMIQ Discount",
          });

        discounts.push({
          coupon:
            stripeCoupon.id,
        });
      }

      const frontendUrl =
        process.env.FRONTEND_URL ||
        "http://localhost:5173";

      const session =
        await stripe.checkout.sessions.create(
          {
            mode: "payment",

            payment_method_types: [
              "card",
            ],

            customer_email:
              email
                .trim()
                .toLowerCase(),

            line_items:
              lineItems,

            discounts:
              discounts.length
                ? discounts
                : undefined,

            metadata: {
              orderId:
                order.id,

              userId:
                req.user.userId,
            },

            success_url:
              `${frontendUrl}/order-success/${order.id}?session_id={CHECKOUT_SESSION_ID}`,

            cancel_url:
              `${frontendUrl}/checkout`,
          }
        );

      await prisma.order.update({
        where: {
          id:
            order.id,
        },

        data: {
          stripeSessionId:
            session.id,
        },
      });

      res.json({
        success: true,

        sessionId:
          session.id,

        url:
          session.url,

        orderId:
          order.id,
      });
    } catch (error) {
      console.error(
        "STRIPE CHECKOUT ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          error.message ||
          "Failed to create Stripe checkout.",
      });
    }
  }
);

/* =========================================================
   VERIFY STRIPE PAYMENT
========================================================= */

app.get(
  "/api/orders/:id/verify-payment",
  authenticateToken,
  async (req, res) => {
    try {
      const { id } =
        req.params;

      const session_id =
        req.query.session_id as string;

      if (!session_id) {
        return res.status(400).json({
          success: false,
          message:
            "Stripe session ID is required.",
        });
      }

      const order =
        await prisma.order.findFirst({
          where: {
            id,

            userId:
              req.user.userId,
          },

          include: {
            items: true,
          },
        });

      if (!order) {
        return res.status(404).json({
          success: false,
          message:
            "Order not found.",
        });
      }

      if (
        order.paymentStatus ===
        "PAID"
      ) {
        return res.json({
          success: true,
          paid: true,
          order,
        });
      }

      const session =
        await stripe.checkout.sessions.retrieve(
          session_id
        );

      if (
        session.metadata?.orderId !==
        order.id
      ) {
        return res.status(403).json({
          success: false,
          message:
            "Invalid payment session.",
        });
      }

      if (
        session.payment_status !==
        "paid"
      ) {
        return res.json({
          success: false,
          paid: false,
          message:
            "Payment has not been completed.",
          order,
        });
      }

      const updatedOrder =
        await prisma.$transaction(
          async (tx) => {
            const currentOrder =
              await tx.order.findUnique({
                where: {
                  id:
                    order.id,
                },
              });

            if (!currentOrder) {
              throw new Error(
                "Order not found."
              );
            }

            if (
              currentOrder.paymentStatus ===
              "PAID"
            ) {
              return currentOrder;
            }

            const updated =
              await tx.order.update({
                where: {
                  id:
                    order.id,
                },

                data: {
                  paymentStatus:
                    "PAID",

                  status:
                    "CONFIRMED",
                },

                include: {
                  items: true,
                },
              });

            const cart =
              await tx.cart.findUnique({
                where: {
                  userId:
                    req.user.userId,
                },
              });

            if (cart) {
              await tx.cartItem.deleteMany({
                where: {
                  cartId:
                    cart.id,
                },
              });
            }

            if (
              currentOrder.couponCode
            ) {
              await tx.coupon.update({
                where: {
                  code:
                    currentOrder.couponCode,
                },

                data: {
                  usedCount: {
                    increment: 1,
                  },
                },
              });
            }

            return updated;
          }
        );

      res.json({
        success: true,
        paid: true,
        order:
          updatedOrder,
      });
    } catch (error) {
      console.error(
        "VERIFY PAYMENT ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to verify payment.",
      });
    }
  }
);

/* =========================================================
   MY ORDERS
========================================================= */

app.get(
  "/api/orders",
  authenticateToken,
  async (req, res) => {
    try {
      const orders =
        await prisma.order.findMany({
          where: {
            userId:
              req.user.userId,
          },

          include: {
            items: {
              orderBy: {
                id: "asc",
              },
            },
          },

          orderBy: {
            createdAt:
              "desc",
          },
        });

      res.json({
        success: true,
        orders,
      });
    } catch (error) {
      console.error(
        "GET ORDERS ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to load orders.",
      });
    }
  }
);

/* =========================================================
   SINGLE ORDER
========================================================= */

app.get(
  "/api/orders/:id",
  authenticateToken,
  async (req, res) => {
    try {
      const order =
        await prisma.order.findFirst({
          where: {
            id:
              req.params.id,

            userId:
              req.user.userId,
          },

          include: {
            items: true,
          },
        });

      if (!order) {
        return res.status(404).json({
          success: false,
          message:
            "Order not found.",
        });
      }

      res.json({
        success: true,
        order,
      });
    } catch (error) {
      console.error(
        "GET ORDER ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to load order.",
      });
    }
  }
);

/* =========================================================
   ADMIN - DASHBOARD
========================================================= */

app.get(
  "/api/admin/dashboard",
  authenticateToken,
  requireAdmin,
  async (req, res) => {
    try {
      const [
        totalUsers,
        totalProducts,
        totalOrders,
        revenueResult,
        pendingOrders,
        confirmedOrders,
        processingOrders,
        shippedOrders,
        deliveredOrders,
        cancelledOrders,
        recentOrders,
      ] = await Promise.all([
        prisma.user.count({
          where: {
            role: "CUSTOMER",
          },
        }),

        prisma.product.count(),

        prisma.order.count(),

        prisma.order.aggregate({
          _sum: {
            total: true,
          },

          where: {
            paymentStatus: "PAID",
          },
        }),

        prisma.order.count({
          where: {
            status: "PENDING",
          },
        }),

        prisma.order.count({
          where: {
            status: "CONFIRMED",
          },
        }),

        prisma.order.count({
          where: {
            status: "PROCESSING",
          },
        }),

        prisma.order.count({
          where: {
            status: "SHIPPED",
          },
        }),

        prisma.order.count({
          where: {
            status: "DELIVERED",
          },
        }),

        prisma.order.count({
          where: {
            status: "CANCELLED",
          },
        }),

        prisma.order.findMany({
          take: 8,

          orderBy: {
            createdAt:
              "desc",
          },

          include: {
            items: true,
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        }),
      ]);

      res.json({
        success: true,

        stats: {
          totalUsers,
          totalProducts,
          totalOrders,

          totalRevenue:
            revenueResult._sum.total ||
            0,

          pendingOrders,
          confirmedOrders,
          processingOrders,
          shippedOrders,
          deliveredOrders,
          cancelledOrders,
        },

        recentOrders,
      });
    } catch (error) {
      console.error(
        "ADMIN DASHBOARD ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to load admin dashboard.",
      });
    }
  }
);

/* =========================================================
   ADMIN - PRODUCTS
========================================================= */

app.get(
  "/api/admin/products",
  authenticateToken,
  requireAdmin,
  async (req, res) => {
    try {
      const products =
        await prisma.product.findMany({
          orderBy: {
            id: "desc",
          },
        });

      res.json({
        success: true,
        products,
      });
    } catch (error) {
      console.error(
        "ADMIN PRODUCTS ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to load products.",
      });
    }
  }
);

app.post(
  "/api/admin/products",
  authenticateToken,
  requireAdmin,
  async (req, res) => {
    try {
      const {
        name,
        price,
        image,
        category,
        description,
      } = req.body;

      if (
        !name ||
        price === undefined ||
        !image
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Name, price and image are required.",
        });
      }

      const product =
        await prisma.product.create({
          data: {
            name:
              name.trim(),

            price:
              Number(price),

            image:
              image.trim(),

            category:
              category?.trim() ||
              "AROMIQ PERFUME",

            description:
              description?.trim() ||
              null,
          },
        });

      res.status(201).json({
        success: true,
        message:
          "Product created successfully.",
        product,
      });
    } catch (error) {
      console.error(
        "CREATE PRODUCT ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to create product.",
      });
    }
  }
);

app.patch(
  "/api/admin/products/:id",
  authenticateToken,
  requireAdmin,
  async (req, res) => {
    try {
      const id =
        Number(req.params.id);

      if (!Number.isInteger(id)) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid product ID.",
        });
      }

      const {
        name,
        price,
        image,
        category,
        description,
      } = req.body;

      const product =
        await prisma.product.update({
          where: {
            id,
          },

          data: {
            ...(name !== undefined && {
              name:
                name.trim(),
            }),

            ...(price !== undefined && {
              price:
                Number(price),
            }),

            ...(image !== undefined && {
              image:
                image.trim(),
            }),

            ...(category !== undefined && {
              category:
                category.trim(),
            }),

            ...(description !== undefined && {
              description:
                description?.trim() ||
                null,
            }),
          },
        });

      res.json({
        success: true,
        message:
          "Product updated successfully.",
        product,
      });
    } catch (error) {
      console.error(
        "UPDATE PRODUCT ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to update product.",
      });
    }
  }
);

app.delete(
  "/api/admin/products/:id",
  authenticateToken,
  requireAdmin,
  async (req, res) => {
    try {
      const id =
        Number(req.params.id);

      if (!Number.isInteger(id)) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid product ID.",
        });
      }

      const product =
        await prisma.product.findUnique({
          where: {
            id,
          },
        });

      if (!product) {
        return res.status(404).json({
          success: false,
          message:
            "Product not found.",
        });
      }

      const cartItems =
        await prisma.cartItem.count({
          where: {
            productId: id,
          },
        });

      if (cartItems > 0) {
        await prisma.cartItem.deleteMany({
          where: {
            productId: id,
          },
        });
      }

      const orderItems =
        await prisma.orderItem.count({
          where: {
            productId: id,
          },
        });

      if (orderItems > 0) {
        return res.status(400).json({
          success: false,
          message:
            "This product exists in previous orders and cannot be deleted.",
        });
      }

      await prisma.product.delete({
        where: {
          id,
        },
      });

      res.json({
        success: true,
        message:
          "Product deleted successfully.",
      });
    } catch (error) {
      console.error(
        "DELETE PRODUCT ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to delete product.",
      });
    }
  }
);

/* =========================================================
   ADMIN - ORDERS
========================================================= */

app.get(
  "/api/admin/orders",
  authenticateToken,
  requireAdmin,
  async (req, res) => {
    try {
      const orders =
        await prisma.order.findMany({
          orderBy: {
            createdAt:
              "desc",
          },

          include: {
            items: true,

            user: {
              select: {
                id: true,
                name: true,
                email: true,
                phone: true,
              },
            },
          },
        });

      res.json({
        success: true,
        orders,
      });
    } catch (error) {
      console.error(
        "ADMIN ORDERS ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to load orders.",
      });
    }
  }
);

app.patch(
  "/api/admin/orders/:id/status",
  authenticateToken,
  requireAdmin,
  async (req, res) => {
    try {
      const {
        status,
      } = req.body;

      const allowedStatuses = [
        "PENDING",
        "CONFIRMED",
        "PROCESSING",
        "SHIPPED",
        "DELIVERED",
        "CANCELLED",
      ];

      if (
        !allowedStatuses.includes(
          status
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid order status.",
        });
      }

      const order =
        await prisma.order.update({
          where: {
            id:
              req.params.id,
          },

          data: {
            status,
          },

          include: {
            items: true,
          },
        });

      res.json({
        success: true,
        message:
          "Order status updated successfully.",
        order,
      });
    } catch (error) {
      console.error(
        "UPDATE ORDER STATUS ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to update order status.",
      });
    }
  }
);

/* =========================================================
   ADMIN - CUSTOMERS
========================================================= */

app.get(
  "/api/admin/customers",
  authenticateToken,
  requireAdmin,
  async (req, res) => {
    try {
      const customers =
        await prisma.user.findMany({
          where: {
            role: "CUSTOMER",
          },

          orderBy: {
            createdAt:
              "desc",
          },

          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            createdAt: true,

            _count: {
              select: {
                orders: true,
              },
            },
          },
        });

      res.json({
        success: true,
        customers,
      });
    } catch (error) {
      console.error(
        "ADMIN CUSTOMERS ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to load customers.",
      });
    }
  }
);

/* =========================================================
   ADMIN - COUPONS
========================================================= */

app.get(
  "/api/admin/coupons",
  authenticateToken,
  requireAdmin,
  async (req, res) => {
    try {
      const coupons =
        await prisma.coupon.findMany({
          orderBy: {
            createdAt:
              "desc",
          },
        });

      res.json({
        success: true,
        coupons,
      });
    } catch (error) {
      console.error(
        "ADMIN COUPONS ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to load coupons.",
      });
    }
  }
);

app.post(
  "/api/admin/coupons",
  authenticateToken,
  requireAdmin,
  async (req, res) => {
    try {
      const {
        code,
        discount,
        type = "PERCENTAGE",
        minAmount,
        maxUses,
        expiresAt,
        active = true,
      } = req.body;

      if (
        !code ||
        discount === undefined
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Code and discount are required.",
        });
      }

      if (
        !["PERCENTAGE", "FIXED"].includes(
          type
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid coupon type.",
        });
      }

      const normalizedCode =
        code
          .trim()
          .toUpperCase();

      const existingCoupon =
        await prisma.coupon.findUnique({
          where: {
            code:
              normalizedCode,
          },
        });

      if (existingCoupon) {
        return res.status(409).json({
          success: false,
          message:
            "Coupon code already exists.",
        });
      }

      const coupon =
        await prisma.coupon.create({
          data: {
            code:
              normalizedCode,

            discount:
              Number(discount),

            type,

            minAmount:
              minAmount !==
                undefined &&
                minAmount !== null &&
                minAmount !== ""
                ? Number(minAmount)
                : null,

            maxUses:
              maxUses !==
                undefined &&
                maxUses !== null &&
                maxUses !== ""
                ? Number(maxUses)
                : null,

            expiresAt:
              expiresAt
                ? new Date(
                  expiresAt
                )
                : null,

            active:
              Boolean(active),
          },
        });

      res.status(201).json({
        success: true,
        message:
          "Coupon created successfully.",
        coupon,
      });
    } catch (error) {
      console.error(
        "CREATE COUPON ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to create coupon.",
      });
    }
  }
);

app.patch(
  "/api/admin/coupons/:id",
  authenticateToken,
  requireAdmin,
  async (req, res) => {
    try {
      const {
        active,
      } = req.body;

      if (
        active === undefined
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Active value is required.",
        });
      }

      const coupon =
        await prisma.coupon.update({
          where: {
            id:
              req.params.id,
          },

          data: {
            active:
              Boolean(active),
          },
        });

      res.json({
        success: true,
        message:
          "Coupon updated successfully.",
        coupon,
      });
    } catch (error) {
      console.error(
        "UPDATE COUPON ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to update coupon.",
      });
    }
  }
);

app.delete(
  "/api/admin/coupons/:id",
  authenticateToken,
  requireAdmin,
  async (req, res) => {
    try {
      await prisma.coupon.delete({
        where: {
          id:
            req.params.id,
        },
      });

      res.json({
        success: true,
        message:
          "Coupon deleted successfully.",
      });
    } catch (error) {
      console.error(
        "DELETE COUPON ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to delete coupon.",
      });
    }
  }
);

/* =========================================================
   ERROR HANDLER
========================================================= */

app.use(
  (error, req, res, next) => {
    console.error(
      "SERVER ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        error.message ||
        "Internal server error.",
    });
  }
);

/* =========================================================
   START SERVER
========================================================= */

async function startServer() {
  try {
    await prisma.$connect();

    console.log(
      "✅ PostgreSQL connected successfully"
    );

    app.listen(
      PORT,
      () => {
        console.log(
          `✨ Aromiq API running on http://localhost:${PORT}`
        );
      }
    );
  } catch (error) {
    console.error(
      "❌ Failed to start server:",
      error
    );

    await prisma.$disconnect();

    process.exit(1);
  }
}

startServer();

/* =========================================================
   SHUTDOWN
========================================================= */

process.on(
  "SIGINT",
  async () => {
    await prisma.$disconnect();
    process.exit(0);
  }
);

process.on(
  "SIGTERM",
  async () => {
    await prisma.$disconnect();
    process.exit(0);
  }
);

