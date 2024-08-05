import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const value = await prisma.value.findUnique({
      where: { id: Number(params.id) },
    });
    return value
      ? NextResponse.json(value)
      : NextResponse.json({ error: 'Value not found' }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve value' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const {
      propertyValueStart,
      propertyValueEnd,
      legalFees,
      percentageOfValue,
      plusFixedFee,
      pricedOnApplication
    } = await request.json();
    
    const updatedValue = await prisma.value.update({
      where: { id: Number(params.id) },
      data: {
        propertyValueStart,
        propertyValueEnd,
        legalFees,
        percentageOfValue,
        plusFixedFee,
        pricedOnApplication
      },
    });
    return NextResponse.json(updatedValue);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update value' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.value.delete({
      where: { id: Number(params.id) },
    });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete value' }, { status: 500 });
  }
}