import { render, screen, cleanup, act } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { GET_TASK_AND_PROGRESS } from '../../gqlQueries.js';
import Task from '../../Components/Task.js';

const TASK1 =
{
  "__typename": "Task",
  "id": "1234",
  "dueDate": "2021-05-30",
  "endAt": null,
  "startAt": null,
  "points": 20,
  "name": "Introduction to Covalent Bonding",
  "instructions": "Analyze the content and answer the questions",
  "missionId": "da0719ba103",
  "missionIndex": 0,
  "requirements": [
    {
      "__typename": "RubricRequirement",
      "id": "f681550ba90",
      "description": "Understand the structure of covalent bonds"
    }
  ],
  "pages": [
    {
      "__typename": "Page",
      "skippable": false,
      "blocks": [
        {
          "__typename": "ImageBlock",
          "title": "Covalent Bonding Image",
          "imageUrl": "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fchemwiki.ucdavis.edu%2F%40api%2Fdeki%2Ffiles%2F10150%2F%3Dcovalent_bonding.png%3Frevision%3D1&f=1&nofb=1"
        },
        {
          "__typename": "TextBlock",
          "title": "Covalent Bonding Text",
          "fontSize": 12,
          "contents": "A covalent bond is a chemical bond that involves the sharing of electron pairs between atoms. These electron pairs are known as shared pairs or bonding pairs, and the stable balance of attractive and repulsive forces between atoms, when they share electrons, is known as covalent bonding. For many molecules, the sharing of electrons allows each atom to attain the equivalent of a full outer shell, corresponding to a stable electronic configuration. In organic chemistry, covalent bonds are much more common than ionic bonds."
        },
        {
          "__typename": "QuizBlock",
          "title": "Covalent Bonding Quiz",
          "blockId": "qb1234",
          "questions": [
            {
              "__typename": "McQuestion",
              "id": "MC_QUESTION#2cb7e34fcb6",
              "description": "What is a covalent bond?",
              "points": 5,
              "options": [
                {
                  "__typename": "QuestionOption",
                  "description": "A bond where one atom steals electrons from another atom"
                },
                {
                  "__typename": "QuestionOption",
                  "description": "A bond where two atoms share electrons unequally"
                },
                {
                  "__typename": "QuestionOption",
                  "description": "A bond where two atoms share electrons equally or unequally"
                },
                {
                  "__typename": "QuestionOption",
                  "description": "The attraction between protons and electrons"
                }
              ]
            },
            {
              "__typename": "FrQuestion",
              "id": "FR_QUESTION#d1b687205e4",
              "description": "Give some examples of molecules that contain covalent bonds"
            }
          ]
        }
      ]
    },
  ]
};

const QUESTION_PROGRESS = 
{
  "__typename": "QuestionProgress",
  "answers": [
    {
      "__typename": "Answer",
      "questionId": "FR_QUESTION#d1b687205e4",
      "pointsAwarded": null,
      "answer": "Hydrogen, Ammonia, etc."
    },
    {
      "__typename": "Answer",
      "questionId": "MC_QUESTION#2cb7e34fcb6",
      "pointsAwarded": null,
      "answer": "2"
    },
    {
      "__typename": "Answer",
      "questionId": "MC_QUESTION#6bc78eb2165",
      "pointsAwarded": null,
      "answer": "1"
    },
    {
      "__typename": "Answer",
      "questionId": "MC_QUESTION#9347b1c758f",
      "pointsAwarded": null,
      "answer": "1"
    }
  ]
};

const TASK_PROGRESS =
{
  "taskId": "4f681550ba9",
  "username": "Google_111488735640723387822",
  "finishedRequirementIds": [
    "f681550ba90",
    "681550ba909"
  ]
};


const mocks = [
	{
		request: {
			query: GET_TASK_AND_PROGRESS,
      variables: {
				id: TASK1.id
			}
		},
		result: {
			data: {
				task: TASK1,
        retrieveQuestionProgress: {answers: []},
        retrieveTaskProgress: null
			}
		}
	}
];

const location = {
  state: {
    id: TASK1.id
  }
}

afterEach(() => {
	cleanup();
});

test("test for loading message", () => {
	const { getByText } = render(
		<MockedProvider mocks={mocks}>
			<Task location={location}/>
		</MockedProvider>
	);
	expect(getByText('Loading...')).toBeInTheDocument();
});

test("test task renders without error", async () => {
	const { getByText, getByTestId } = render(
		<MockedProvider mocks={mocks}>
			<Task location={location}/>
		</MockedProvider>
	);

	await act(() => new Promise(resolve => setTimeout(resolve, 10)));
});