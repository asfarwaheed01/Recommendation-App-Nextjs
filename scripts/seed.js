import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Question from '../models/Question.js';
import AnswerLevel from '../models/AnswerLevel.js';
import PromptForm from '../models/PromptForm.js';

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then((conn) => {
    console.log(`MongoDB connected : ${conn.connection.host}`);
  })
  .catch((error) => {
    console.error(`ERROR: ${error.message}`);
  });

async function importData() {
  try {
    const answerLevel = new AnswerLevel({
      question: 'Recommendation level',
      choices: ['Broad', 'Medium', 'Specific'],
    });
    await answerLevel.save();

    const question1 = new Question({
      questionId: 1,
      category: 'Choice',
      question: 'What type of cuisine are you into right now?',
      choices: [
        'A. Italian',
        'B. Asian',
        'C. Mexican',
        'D. Indian',
        'E. American',
      ],
    });
    await question1.save();

    const question2 = new Question({
      questionId: 2,
      category: 'Choice',
      question: 'Do you have any dietary preferences?',
      choices: [
        'A. Vegetarian',
        'B. Vegan',
        'C. Gluten-free',
        'D. Keto',
        'E. No red meat',
      ],
    });
    await question2.save();

    const question3 = new Question({
      questionId: 3,
      category: 'Choice',
      question: 'How much time do you have to cook dinner?',
      choices: [
        'A. Less than half hour',
        'B. Half to one hour',
        'C. More than an hour',
      ],
    });
    await question3.save();

    const question4 = new Question({
      questionId: 4,
      category: 'Input',
      question: 'Which ingredients would you like to use?',
    });
    await question4.save();

    const question5 = new Question({
      questionId: 5,
      category: 'Choice',
      question: "What's your cooking skill level?",
      choices: ['A. Beginner', 'B. Intermediate', 'C. Advanced'],
    });
    await question5.save();

    const question6 = new Question({
      questionId: 6,
      category: 'Choice',
      question: 'How many meals are you planning to cook?',
      choices: ['A. Just for myself', 'B. 2-3 people', 'C. 4 or more'],
    });
    await question6.save();

    const question7 = new Question({
      questionId: 7,
      category: 'Choice',
      question: 'Do you want a dish that is...',
      choices: [
        'A. Light and healthy',
        'B. Comforting/hearty',
        'C. Quick and easy',
        'D. Fancy/impressive',
        'E. Heart lifted',
      ],
    });
    await question7.save();

    const question8 = new Question({
      questionId: 8,
      category: 'Input',
      question: 'Additional Preferences:',
    });
    await question8.save();

    const promptForm = new PromptForm({
      promptId: '1',
      label: 'What to cook?',
      color: 'red',
      answerLevel: answerLevel.id,
      questions: [
        question1.id,
        question2.id,
        question3.id,
        question4.id,
        question5.id,
        question6.id,
        question7.id,
        question8.id,
      ],
    });
    await promptForm.save();

    console.log('Data added successfully.');
    process.exit(0);
  } catch (error) {
    console.log('Data addition failed.');
    process.exit(1);
  }
}

async function destroyData() {
  try {
    await PromptForm.deleteMany({});
    await Question.deleteMany({});
    console.log('Data deleted successfully.');
    process.exit(0);
  } catch (error) {
    console.log('Data deletion failed.');
    process.exit(1);
  }
}

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
