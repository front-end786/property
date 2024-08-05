import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const values = await prisma.value.findMany();
    return NextResponse.json(values);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve values' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const {
      quoteTypeId,
      propertyValueStart,
      propertyValueEnd,
      legalFees,
      percentageOfValue,
      plusFixedFee,
      pricedOnApplication
    } = await request.json();
    
    const newValue = await prisma.value.create({
      data: {
        quoteTypeId,
        propertyValueStart,
        propertyValueEnd,
        legalFees,
        percentageOfValue,
        plusFixedFee,
        pricedOnApplication
      },
    });
    return NextResponse.json(newValue, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create value' }, { status: 500 });
  }
}