import { NextResponse } from 'next/server';

import dbConnect from '@/lib/dbConnect';
import Question from '@/models/Question';
import AnswerLevel from '@/models/AnswerLevel';
import PromptForm from '@/models/PromptForm';

export async function POST(request) {
  await dbConnect();

  const prompts = await PromptForm.find({});

  if (prompts.length === 0) {
    return new NextResponse('Prompt Not Found', { status: 404 });
  }

  return NextResponse.json(prompts);
}
