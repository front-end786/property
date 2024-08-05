import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const quoteType = await prisma.quoteType.findUnique({
      where: { id: Number(params.id) },
    });
    if (quoteType) {
      return NextResponse.json(quoteType);
    } else {
      return NextResponse.json({ error: "Quote type not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to retrieve quote type" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { type } = await request.json();
    const updatedQuoteType = await prisma.quoteType.update({
      where: { id: Number(params.id) },
      data: { type },
    });
    return NextResponse.json(updatedQuoteType);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update quote type" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.quoteType.delete({
      where: { id: Number(params.id) },
    });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete quote type" }, { status: 500 });
  }
}