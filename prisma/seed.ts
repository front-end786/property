// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const salt = bcrypt.genSaltSync(10);
  const adminPassword = bcrypt.hashSync("admin", salt);
  const userPassword = bcrypt.hashSync("user", salt);

  await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@mail.com",
      username: "admin",
      password: adminPassword,
      isAdmin: true,
    },
  });

  await prisma.user.create({
    data: {
      email: "user@mail.com",
      name: "Client User",
      username: "user",
      password: userPassword,
      isAdmin: false,
    },
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
