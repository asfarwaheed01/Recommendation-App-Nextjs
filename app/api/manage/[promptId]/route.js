import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import dbConnect from '@/lib/dbConnect';
import { validateAdmin } from '@/lib/validateAdmin';
import Question from '@/models/Question';
import AnswerLevel from '@/models/AnswerLevel';
import PromptForm from '@/models/PromptForm';

export async function POST(request, { params }) {
  try {
    await dbConnect();

    const { promptId } = params;
    if (!promptId) {
      return new NextResponse('Invalid Prompt Id', { status: 400 });
    }

    const { userId } = auth();
    if (!validateAdmin(userId)) {
      return new NextResponse('Unauthorized Access', { status: 401 });
    }

    const promptForm = await PromptForm.findOne({ promptId }).populate(
      'answerLevel questions'
    );

    if (!promptForm) {
      return new NextResponse('Prompt Not Found', { status: 404 });
    }

    return NextResponse.json(promptForm);
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    await dbConnect();
    const { promptId } = await request.json();

    const promptToDelete = await PromptForm.findOne({ promptId });

    if (!promptToDelete) {
      return new NextResponse('Prompt Not Found', { status: 404 });
    }

    const questionCount = promptToDelete.questions.length;

    for (let i = 0; i < questionCount; i++) {
      await Question.deleteOne({ _id: promptToDelete.questions[i]._id });
    }

    const deletedPrompt = await PromptForm.deleteOne({ promptId });

    if (deletedPrompt.deletedCount > 0) {
      const prompts = await PromptForm.find({});
      let promptCount = prompts.length;

      for (let i = 0; i < promptCount; i++) {
        prompts[i].promptId = i + 1;
        await prompts[i].save();
      }
    } else {
      return NextResponse.json({ message: 'Failed to delete prompt form.' });
    }

    return NextResponse.json({ message: 'Prompt Form deleted.' });
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
