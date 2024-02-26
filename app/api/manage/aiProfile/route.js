import { NextResponse } from 'next/server';

import dbConnect from '@/lib/dbConnect';
import AIProfile from '@/models/AIProfile';

export async function POST(req) {
  try {
    await dbConnect();
    let aiProfile = await AIProfile.find({});
    return NextResponse.json(aiProfile);
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    const { profile } = await req.json();

    const aiProfile = await AIProfile.findOneAndUpdate(
      {},
      {
        value: profile,
      },
      {
        new: true,
        upsert: true,
      }
    );

    return new NextResponse('AI Profile updated successfully.');
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
