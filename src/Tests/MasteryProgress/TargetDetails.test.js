import { render, screen, cleanup, act } from '@testing-library/react';
import TargetDetails from '../../Components/MasteryProgress/TargetDetails.js';


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

const closeCallback = () => {};

test("test render without error", () => {
	const { getByText } = render(
		<TargetDetails closeCallback={closeCallback} targetProgress={TARGET_PROGRESS_1}/>
	);
	expect(getByText('Target Item')).toBeInTheDocument();
});