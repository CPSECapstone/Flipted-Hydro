//This file holds business logic relevant to the Task Review component

/* This function takes a task object, and returns
 * an array of all the questions in the task. This is
 * useful since the questions are nested deep inside task
 * blocks by default
 */
function getTaskQuestions(task){
  let questions = [];
  task.pages.forEach(page => [
    page.blocks.forEach(block => {
      if(block.__typename == 'QuizBlock'){
        questions = questions.concat(block.questions);
      }
    })
  ])
  return questions;
}

/* This function takes in a single question-answer object and
 * a list of questions for the task, and returns a new answer object
 * that has the value of the user's entered answer and the value of the
 * correct answer
 */
function getAnswerForQA(qa, questions){
  const question = questions.filter(question => question.id == qa.question.id)[0]

  if(!question || question.__typename == 'FrQuestion'){
    return qa.answer.answer;
  }

  const index = parseInt(qa.answer.answer);

  return {
    answer: question.options[index].description,
    correctAnswer:  question.options[qa.question.answers[0]].description
  };
}

/*
 * This function takes in a task object and question-answer list from
 * the backend, and adds the answer value of the user's answer to the
 * question-answer list. By default, the question-answer list only has
 * the index of the user's answer in the options list, not the answer itself.
 * This will also add a correctAnswer field to multiple choice question,
 * which holds the value of the correct answer.
 */
function addAnswerValuesToQAs(task, qas){
  const questions = getTaskQuestions(task);
  return qas.map(qa => {
    return {
      ...qa,
      answer: {
        ...(qa.answer),
        ...(getAnswerForQA(qa, questions))
      }
    }
  })
}

export const TaskReviewService = {
  addAnswerValuesToQAs,
  getTaskQuestions
};