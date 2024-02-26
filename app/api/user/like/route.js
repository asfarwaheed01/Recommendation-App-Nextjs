import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs';

import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import LikedResults from '@/models/LikedResults';

export async function PUT(req) {
  try {
    await dbConnect();
    const user = await currentUser();
    const { aiResponses, color } = await req.json();

    const userData = await User.findOne({
      userId: user.id,
    });

    if (!userData) {
      return new NextResponse('User not found', { status: 404 });
    }

    const likedResult = await LikedResults.create({
      results: aiResponses,
      color: color,
    });

    await userData.likedResults.push(likedResult);
    await userData.save();

    return new NextResponse('Responses liked', { status: 200 });
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const user = await currentUser();

    const userData = await User.findOne({
      userId: user.id,
    }).populate('likedResults');

    if (!userData) {
      return new NextResponse('User not found', { status: 404 });
    }

    if (!userData.likedResults) {
      userData.likedResults = [];
      await userData.save();
    }

    return NextResponse.json(userData.likedResults);
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await dbConnect();
    const { arg } = await req.json();

    const user = await currentUser();

    const userData = await User.findOne({
      userId: user.id,
    });

    if (!userData) {
      return new NextResponse('User not found', { status: 404 });
    }

    await LikedResults.deleteOne({
      _id: arg.responseId,
    });

    const updatedLikedResponses = userData.likedResults.filter(
      (response) => response._id != arg.responseId
    );

    userData.likedResults = [...updatedLikedResponses];
    await userData.save();

    return NextResponse.json({ message: 'Liked Responses deleted.' });
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
