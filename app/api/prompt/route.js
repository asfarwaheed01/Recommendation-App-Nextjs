import { NextResponse } from 'next/server';

import dbConnect from '@/lib/dbConnect';
import Question from '@/models/Question';
import AnswerLevel from '@/models/AnswerLevel';
import PromptForm from '@/models/PromptForm';

export async function POST(request) {
  await dbConnect();

  const searchParams = request.nextUrl.searchParams;
  const promptId = searchParams.get('promptId');

  if (!promptId) {
    return new NextResponse('Invalid Prompt Id', { status: 400 });
  }

  const promptForm = await PromptForm.findOne({ promptId }).populate(
    'answerLevel questions'
  );

  if (!promptForm) {
    return new NextResponse('Prompt Not Found', { status: 404 });
  }

  return NextResponse.json(promptForm);
}
