export const maxDuration = 60;

import { NextResponse } from 'next/server';
import OpenAI from 'openai';

import dbConnect from '@/lib/dbConnect';
import Question from '@/models/Question';
import AIProfile from '@/models/AIProfile';
import PromptForm from '@/models/PromptForm';

export async function POST(req) {
  try {
    await dbConnect();
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const { promptId, answers, aiResponses } = await req.json();

    if (!promptId || !answers) {
      return new NextResponse('Bad Request', { status: 400 });
    }

    const promptForm = await PromptForm.findOne({ promptId }).populate(
      'questions'
    );

    if (!promptForm) {
      return new NextResponse('Bad Request', { status: 400 });
    }

    let prompt = '';

    const totalQuestions = promptForm.questions.length;
    for (let i = 0; i < totalQuestions; i++) {
      if (answers[i].value) {
        prompt += `Question: ${promptForm.questions[i].question} Answer: ${answers[i].value},\n`;
      }
    }

    const aiProfile = await AIProfile.find({});

    prompt =
      `${aiProfile?.[0].value}
    Question: ${promptForm.label} 
    Answer based on the following questions and the user's answers for them:    
    ` + prompt;

    let messages = [{ role: 'user', content: prompt }];

    for (let i = 0; i < aiResponses.length; i++) {
      messages = [
        ...messages,
        { role: 'assistant', content: aiResponses[i] },
        { role: 'user', content: 'Show another answer.' },
      ];
    }

    const chatCompletion = await openai.chat.completions.create({
      messages,
      model: 'gpt-3.5-turbo',
    });

    return NextResponse.json(chatCompletion.choices[0].message);
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
