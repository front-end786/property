// app/api/user/profile/route.ts
import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { getDataFromToken } from '@/helpers/getDataFromToken';

// Handler function to fetch all user profiles
export async function GET(request: NextRequest) {
  try {
    // Extract user ID from the token using the helper function
    const userId = getDataFromToken(request);

    // Fetch the user details from the database
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    // Check if the user is an admin
    if (!user || !user.isAdmin) {
      return NextResponse.json({ message: 'Access denied' }, { status: 403 });
    }

    // Fetch all user profiles from the database
    const users = await prisma.user.findMany();

    // Return the user data as JSON response
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching user profiles:', error);

    // Return a 500 response on error
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
