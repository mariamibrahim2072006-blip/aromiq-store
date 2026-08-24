import bcrypt from "bcryptjs";
import dotenv from "dotenv";

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

dotenv.config();

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
    adapter,
});

async function createAdmin() {
    try {
        const email = "admin@aromiq.com";
        const password = "Admin123456";

        const hashedPassword = await bcrypt.hash(password, 10);

        const existingAdmin = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (existingAdmin) {
            const admin = await prisma.user.update({
                where: {
                    email,
                },
                data: {
                    role: "ADMIN",
                    password: hashedPassword,
                },
            });

            console.log("✅ Existing user converted to admin");
            console.log(admin.email);
            return;
        }

        const admin = await prisma.user.create({
            data: {
                name: "AROMIQ Admin",
                email,
                password: hashedPassword,
                role: "ADMIN",
            },
        });

        console.log("=================================");
        console.log("✅ ADMIN CREATED");
        console.log("Email:", admin.email);
        console.log("Password:", password);
        console.log("=================================");
    } catch (error) {
        console.error("❌ CREATE ADMIN ERROR:", error);
    } finally {
        await prisma.$disconnect();
    }
}

createAdmin();