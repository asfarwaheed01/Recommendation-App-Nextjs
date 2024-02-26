import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs';

import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

export async function POST(req) {
  try {
    await dbConnect();
    const user = await currentUser();

    if (!user) {
      return new NextResponse('User is not signed in', { status: 400 });
    }

    const storedUser = await User.findOne({ userId: user.id });

    if (storedUser) {
      await User.findOneAndUpdate({
        userId: user.id,
        firstName: user.firstName ?? '',
        lastname: user.lastName ?? '',
        imageUrl: user.imageUrl,
        primaryEmail: user.emailAddresses[0].emailAddress ?? '',
      });
      return new NextResponse('User updated successfully', { status: 200 });
    }

    await User.create({
      userId: user.id,
      firstName: user.firstName ?? '',
      lastname: user.lastName ?? '',
      imageUrl: user.imageUrl,
      primaryEmail: user.emailAddresses[0].emailAddress ?? '',
    });

    return new NextResponse('User registered successfully', { status: 200 });
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
