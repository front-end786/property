import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const disbursement = await prisma.disbursement.findUnique({
      where: { id: Number(params.id) },
    });
    return disbursement
      ? NextResponse.json(disbursement)
      : NextResponse.json({ error: 'Disbursement not found' }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve disbursement' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const {
      title,
      cost,
      free,
      joinQuotes,
      perIndividual,
      variable,
      pricedOnApplication
    } = await request.json();
    
    const updatedDisbursement = await prisma.disbursement.update({
      where: { id: Number(params.id) },
      data: {
        title,
        cost,
        free,
        joinQuotes,
        perIndividual,
        variable,
        pricedOnApplication
      },
    });
    return NextResponse.json(updatedDisbursement);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update disbursement' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.disbursement.delete({
      where: { id: Number(params.id) },
    });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete disbursement' }, { status: 500 });
  }
}