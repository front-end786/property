import { NextApiRequest, NextApiResponse } from 'next';
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  
  if (req.method === 'GET') {
    const calculator = await prisma.calculator.findUnique({
      where: { id: Number(id) },
    });
    res.status(200).json(calculator);
  } else if (req.method === 'PUT') {
    const { name } = req.body;
    const updatedCalculator = await prisma.calculator.update({
      where: { id: Number(id) },
      data: { name },
    });
    res.status(200).json(updatedCalculator);
  } else if (req.method === 'DELETE') {
    await prisma.calculator.delete({
      where: { id: Number(id) },
    });
    res.status(204).end();
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
