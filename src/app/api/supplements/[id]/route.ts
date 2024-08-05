import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supplement = await prisma.supplement.findUnique({
      where: { id: Number(params.id) },
    });
    return supplement
      ? NextResponse.json(supplement)
      : NextResponse.json({ error: "Supplement not found" }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to retrieve supplement" }, { status: 500 });
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
      pricedOnApplication,
    } = await request.json();

    const updatedSupplement = await prisma.supplement.update({
      where: { id: Number(params.id) },
      data: {
        title,
        cost,
        free,
        joinQuotes,
        perIndividual,
        variable,
        pricedOnApplication,
      },
    });
    return NextResponse.json(updatedSupplement);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update supplement" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.supplement.delete({
      where: { id: Number(params.id) },
    });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete supplement" }, { status: 500 });
  }
}