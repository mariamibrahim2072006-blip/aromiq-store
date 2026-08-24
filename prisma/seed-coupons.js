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

async function main() {
    await prisma.coupon.upsert({
        where: {
            code: "AROMIQ10",
        },
        update: {},
        create: {
            code: "AROMIQ10",
            discount: 10,
            type: "PERCENTAGE",
            active: true,
            maxUses: 100,
        },
    });

    await prisma.coupon.upsert({
        where: {
            code: "AROMIQ20",
        },
        update: {},
        create: {
            code: "AROMIQ20",
            discount: 20,
            type: "PERCENTAGE",
            active: true,
            maxUses: 50,
        },
    });

    await prisma.coupon.upsert({
        where: {
            code: "WELCOME5",
        },
        update: {},
        create: {
            code: "WELCOME5",
            discount: 5,
            type: "FIXED",
            active: true,
            maxUses: 200,
        },
    });

    console.log("✅ Coupons created successfully");
}

main()
    .catch((error) => {
        console.error("❌ Coupon seed error:", error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });