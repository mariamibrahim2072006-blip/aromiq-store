import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import dotenv from "dotenv";

dotenv.config();

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
    adapter,
});

const products = [
    {
        id: 1,
        name: "Velvet Noir",
        price: 89,
        image:
            "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=900&q=90",
        category: "SIGNATURE",
        description:
            "A sophisticated fragrance with deep, elegant and unforgettable notes.",
    },
    {
        id: 2,
        name: "Oud Suprême",
        price: 99,
        image:
            "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=90",
        category: "BESTSELLER",
        description:
            "A luxurious oud fragrance created for confidence and character.",
    },
    {
        id: 3,
        name: "Belle Éclat",
        price: 89,
        image:
            "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=900&q=90",
        category: "NEW",
        description:
            "A radiant and elegant fragrance with a soft modern character.",
    },
    {
        id: 4,
        name: "Lumière",
        price: 84,
        image:
            "https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=900&q=90",
        category: "SIGNATURE",
        description:
            "A bright and refined fragrance inspired by timeless elegance.",
    },
    {
        id: 5,
        name: "Eternal Blanc",
        price: 79,
        image:
            "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=900&q=90",
        category: "NEW",
        description:
            "A clean and delicate composition made for effortless sophistication.",
    },
    {
        id: 6,
        name: "Rose Élégance",
        price: 94,
        image:
            "https://images.unsplash.com/photo-1563170351-be82bc888aa4?auto=format&fit=crop&w=900&q=90",
        category: "FEMININE",
        description:
            "A graceful floral fragrance with an elegant and romantic personality.",
    },
    {
        id: 7,
        name: "Velvet Oud",
        price: 105,
        image:
            "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=90",
        category: "LUXURY",
        description:
            "A rich and luxurious oud composition with a powerful presence.",
    },
    {
        id: 8,
        name: "Santal Nocturne",
        price: 96,
        image:
            "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=900&q=90",
        category: "UNISEX",
        description:
            "A warm woody fragrance designed for both day and night.",
    },
    {
        id: 9,
        name: "Éclat Rosé",
        price: 91,
        image:
            "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=900&q=90",
        category: "NEW",
        description:
            "A fresh and expressive rose fragrance with a modern signature.",
    },
    {
        id: 10,
        name: "Maison Rouge",
        price: 109,
        image:
            "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=90",
        category: "EXCLUSIVE",
        description:
            "An exclusive statement fragrance crafted for unforgettable moments.",
    },
];

async function main() {
    console.log("🌸 Seeding Aromiq products...");

    for (const product of products) {
        await prisma.product.upsert({
            where: {
                id: product.id,
            },
            update: {
                name: product.name,
                price: product.price,
                image: product.image,
                category: product.category,
                description: product.description,
            },
            create: product,
        });
    }

    console.log(`✅ ${products.length} products are ready.`);
}

main()
    .catch((error) => {
        console.error("❌ SEED ERROR:", error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });