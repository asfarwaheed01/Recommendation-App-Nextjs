import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import dbConnect from '@/lib/dbConnect';
import { validateAdmin } from '@/lib/validateAdmin';
import Question from '@/models/Question';
import AnswerLevel from '@/models/AnswerLevel';
import PromptForm from '@/models/PromptForm';

export async function PUT(req) {
  try {
    await dbConnect();

    const { userId } = auth();
    if (!validateAdmin(userId)) {
      return new NextResponse('Unauthorized Access', { status: 401 });
    }

    const promptCount = await PromptForm.countDocuments({});

    const answerLevels = await AnswerLevel.find({});

    let answerLevel;
    if (answerLevels.length === 0) {
      answerLevel = new AnswerLevel({
        question: 'Recommendation level',
        choices: ['Broad', 'Medium', 'Specific'],
      });
      await answerLevel.save();
    } else {
      answerLevel = answerLevels[0];
    }

    const prompt = await PromptForm.create({
      promptId: promptCount + 1,
      label: 'Placeholder Question',
      color: 'blue',
      answerLevel: answerLevel.id,
      questions: [],
    });

    return NextResponse.json(prompt);
  } catch (error) {
    console.log(error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
