import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const quoteTypes = await prisma.quoteType.findMany();
    return NextResponse.json(quoteTypes);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve quote types' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { calculatorId, type } = await request.json();
    const newQuoteType = await prisma.quoteType.create({
      data: {
        calculatorId,
        type,
      },
    });
    return NextResponse.json(newQuoteType, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create quote type' }, { status: 500 });
  }
}