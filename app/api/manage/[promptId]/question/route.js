import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import dbConnect from "@/lib/dbConnect";
import { validateAdmin } from "@/lib/validateAdmin";
import Question from "@/models/Question";
import AnswerLevel from "@/models/AnswerLevel";
import PromptForm from "@/models/PromptForm";

export async function DELETE(request) {
  try {
    await dbConnect();

    const { userId } = auth();
    if (!validateAdmin(userId)) {
      return new NextResponse("Unauthorized Access", { status: 401 });
    }

    const { arg } = await request.json();
    const { promptId, questionId } = arg;

    if (!questionId) {
      return new NextResponse("Invalid Question ID", { status: 400 });
    }

    const question = await Question.deleteOne({ _id: questionId });

    const prompt = await PromptForm.findOne({ promptId }).populate("questions");

    const questionCount = prompt?.questions?.length;

    for (let i = 0; i < questionCount; i++) {
      const currentQuestion = await Question.findOne({
        _id: prompt?.questions?.[i]._id,
      });
      currentQuestion.questionId = i + 1;
      await currentQuestion.save();
    }

    return new NextResponse("Question deleted.");
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    await dbConnect();

    const { userId } = auth();
    if (!validateAdmin(userId)) {
      return new NextResponse("Unauthorized Access", { status: 401 });
    }

    const { promptId, questionType, question, choices } = await request.json();

    const prompt = await PromptForm.findOne({ promptId }).populate("questions");
    const existingQuestionCount = prompt.questions.length;
    const newQuestion = await Question.create({
      questionId: existingQuestionCount + 1,
      category: questionType,
      question,
      choices,
    });

    prompt.questions = [...prompt.questions, newQuestion];
    await prompt.save();

    return new NextResponse("Question added successfully");
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PUT(request) {
  try {
    await dbConnect();

    const { userId } = auth();
    if (!validateAdmin(userId)) {
      return new NextResponse("Unauthorized Access", { status: 401 });
    }

    const { questionType, questionId, question, choices } =
      await request.json();

    const existingQuestion = await Question.findById(questionId);
    if (!existingQuestion) {
      return new NextResponse("Question not found", { status: 404 });
    }

    existingQuestion.category = questionType;
    existingQuestion.question = question;
    existingQuestion.choices = choices;
    const updatedQuestion = await existingQuestion.save();

    return new NextResponse("Question edited successfully");
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
