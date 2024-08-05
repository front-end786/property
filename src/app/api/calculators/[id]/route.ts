import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const calculatorId = Number(params.id);
  const calculator = await prisma.calculator.findUnique({
    where: { id: calculatorId },
  });
  return NextResponse.json(calculator);
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const calculatorId = Number(params.id);
  const { name } = await request.json();
  const updatedCalculator = await prisma.calculator.update({
    where: { id: calculatorId },
    data: { name },
  });
  return NextResponse.json(updatedCalculator);
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const calculatorId = Number(params.id);
  await prisma.calculator.delete({
    where: { id: calculatorId },
  });
  return new NextResponse(null, { status: 204 });
}