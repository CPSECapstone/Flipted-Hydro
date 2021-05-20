import { render, fireEvent, screen, cleanup, act } from '@testing-library/react';
import TaskReviewStats from '../Components/TaskReview/TaskReviewStats';

const mockProps = {
   "data": {
     "submitTask": {
       "graded": false,
       "pointsAwarded": 10,
       "pointsPossible": 15,
       "questionAndAnswers": [
         {
           "question": {
             "id": "FR_QUESTION#d1b687205e4",
             "description": "Give some examples of molecules that contain covalent bonds",
             "points": 10,
             "feedback": null
           },
           "answer": {
             "questionId": "FR_QUESTION#d1b687205e4",
             "pointsAwarded": 0,
             "answer": "Hydrogen, Ammonia, etc."
           }
         },
         {
           "question": {
             "id": "MC_QUESTION#2cb7e34fcb6",
             "description": "What is a covalent bond?",
             "points": 5,
             "feedback": null
           },
           "answer": {
             "questionId": "MC_QUESTION#2cb7e34fcb6",
             "pointsAwarded": 0,
             "answer": "0"
           }
         },
         {
           "question": {
             "id": "MC_QUESTION#6bc78eb2165",
             "description": "Atoms bond together in order to...",
             "points": 5,
             "feedback": null
           },
           "answer": {
             "questionId": "MC_QUESTION#6bc78eb2165",
             "pointsAwarded": 5,
             "answer": "1"
           }
         },
         {
           "question": {
             "id": "MC_QUESTION#9347b1c758f",
             "description": "The electrons involved in bonding are ...",
             "points": 5,
             "feedback": null
           },
           "answer": {
             "questionId": "MC_QUESTION#9347b1c758f",
             "pointsAwarded": 5,
             "answer": "2"
           }
         }
       ],
       "teacherComment": null
     }
   }
 };


 afterEach(() => {
	cleanup();
});

test("test Questions Title", () => {
	render(<TaskReviewStats submission = {mockProps.data.submitTask} />);
   const QuestionsTitle = screen.getByText(/Questions Correct:/i);
   expect(QuestionsTitle).toBeInTheDocument();
});

test("test getScore", () => {
	render(<TaskReviewStats submission = {mockProps.data.submitTask} />);
   const Score = screen.getByText(/2/i);
   expect(Score).toBeInTheDocument();
});

test("test scoreTotal", () => {
	render(<TaskReviewStats submission = {mockProps.data.submitTask} />);
   const Total = screen.getByText(/4/i);
   expect(Total).toBeInTheDocument();
});

test("test Points Title", () => {
	render(<TaskReviewStats submission = {mockProps.data.submitTask} />);
   const Title = screen.getByText(/Points Gained:/i);
   expect(Title).toBeInTheDocument();
});

test("test Points Awarded", () => {
	render(<TaskReviewStats submission = {mockProps.data.submitTask} />);
   const Points = screen.getByText(/5/i);
   expect(Points).toBeInTheDocument();
});

test("test Points Total", () => {
	render(<TaskReviewStats submission = {mockProps.data.submitTask} />);
   const Total = screen.getByText(/10/i);
   expect(Total).toBeInTheDocument();
});