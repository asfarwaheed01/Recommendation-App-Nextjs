import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import dbConnect from '@/lib/dbConnect';
import { validateAdmin } from '@/lib/validateAdmin';
import Question from '@/models/Question';
import AnswerLevel from '@/models/AnswerLevel';
import PromptForm from '@/models/PromptForm';

export async function PATCH(request) {
  await dbConnect();

  const { userId } = auth();
  if (!validateAdmin(userId)) {
    return new NextResponse('Unauthorized Access', { status: 401 });
  }

  const { promptId, color } = await request.json();

  if (!color) {
    return new NextResponse('Invalid Color.', { status: 400 });
  }

  const prompt = await PromptForm.findOne({ promptId });

  if (!prompt) {
    return new NextResponse('Prompt Not Found.', { status: 404 });
  }

  prompt.color = color;
  await prompt.save();

  return NextResponse.json(prompt);
}
