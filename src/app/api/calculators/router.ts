import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const calculators = await prisma.calculator.findMany();
    res.status(200).json(calculators);
  } else if (req.method === "POST") {
    const { name } = req.body;
    const newCalculator = await prisma.calculator.create({
      data: {
        name,
      },
    });
    res.status(201).json(newCalculator);
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
