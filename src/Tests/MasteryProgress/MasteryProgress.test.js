import { render, screen, cleanup, act } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { GET_ALL_TARGET_PROGRESS } from '../../gqlQueries.js';
import MasteryProgress from '../../Components/MasteryProgress/MasteryProgress.js';

const TARGET_PROGRESS_1 =
{
  "__typename": "TargetProgress",
  "target": {
    "__typename": "Target",
    "targetId": "27871da36e7",
    "targetName": "TE",
    "description": "Thermal Energy",
    "subject": "Science",
    "gradeLevel": 6,
    "icon": "",
    "standards": "",
    "course": "Integrated Science"
  },
  "objectives": [
    {
      "__typename": "ObjectiveProgress",
      "objectiveId": "1a7e84a8198",
      "objectiveName": "TE6",
      "tasks": [           
        {
          "__typename": "TaskObjectiveProgress",
          "mastery": "NOT_GRADED",
          "task": {
            "__typename": "Task",
            "id": "divByZero",
            "name": "Zero Point Task"
          }
        }
      ]
    }
  ],
  "student": "Google_111488735640723387822"
};  


const mocks = [
	{
		request: {
			query: GET_ALL_TARGET_PROGRESS,
      variables: {
				id: "Integrated Science"
			}
		},
		result: {
			data: {
				getAllTargetProgress: [
          TARGET_PROGRESS_1
        ]
			}
		}
	}
];

afterEach(() => {
	cleanup();
});

test("test for loading message", () => {
	const { getByText } = render(
		<MockedProvider mocks={mocks}>
			<MasteryProgress />
		</MockedProvider>
	);
	expect(getByText('Loading...')).toBeInTheDocument();
});

test("test that all mock targets appear", async () => {
	const { getByText, getByTestId } = render(
		<MockedProvider mocks={mocks}>
			<MasteryProgress />
		</MockedProvider>
	);

	await act(() => new Promise(resolve => setTimeout(resolve, 10)));

	expect(getByTestId(TARGET_PROGRESS_1.target.targetId)).toBeInTheDocument();
});