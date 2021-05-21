import { render, fireEvent, screen, cleanup, act } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import GoalList from '../Components/Goals/GoalList';
import { GET_ALL_GOALS, EDIT_OR_CREATE_GOAL } from '../gqlQueries';
import { InMemoryCache } from '@apollo/client';

const GOAL1 = {
	id: '001',
	title: "Master Fractions",
	dueDate: "2021-05-30",
	completed: true,
	completedDate: null,
	subGoals: [
		{
			title: "Master Adding Fractions",
			dueDate: "2021-05-30",
			completed: true,
			completedDate: null
		},
		{
			title: "Master Multiplying Fractions",
			dueDate: "2021-05-30",
			completed: true,
			completedDate: null
		}
	],
	category: "Math",
	favorited: false,
	owner: "test_owner",
	assignee: "test_assignee",
	pointValue: 0
};
const GOAL2 = {
	id: '002',
	title: "Write 3 Essays",
	dueDate: "2021-06-07",
	completed: false,
	completedDate: null,
	subGoals: [
		{
			title: "Write an expository essay",
			dueDate: "2021-06-07",
			completed: true,
			completedDate: null
		},
		{
			title: "Write a persuasive essay",
			dueDate: "2021-06-07",
			completed: false,
			completedDate: null
		},
		{
			title: "Write a fictional essay",
			dueDate: "2021-06-02",
			completed: false,
			completedDate: null
		}
	],
	category: "Writing",
	favorited: false,
	owner: "test_owner",
	assignee: "test_assignee",
	pointValue: 0
}

const mocks = [
	{
		request: {
			query: GET_ALL_GOALS,
		},
		result: {
			data: {
				getAllGoals: [
					{
						...GOAL1,
						__typename: 'Goal',
					},
					{
						...GOAL2,
						__typename: 'Goal',
					}
				],
			},
		},
	},
	{
		request: {
			query: EDIT_OR_CREATE_GOAL,
			variables: {
				goalInput: {
					...GOAL1,
					favorited: true
				}
			}
		},
		result: {
			data: {
				editOrCreateGoal: GOAL1.id
			}
		}
	},
	{
		request: {
			query: EDIT_OR_CREATE_GOAL,
			variables: {
				goalInput: {
					...GOAL2,
					favorited: true
				}
			}
		},
		result: {
			data: {
				editOrCreateGoal: GOAL2.id
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
			<GoalList />
		</MockedProvider>
	);
	expect(getByText('Loading')).toBeInTheDocument();
});

test("test that all mock goals appear", async () => {
	const { getByText, getByTestId } = render(
		<MockedProvider mocks={mocks}>
			<GoalList />
		</MockedProvider>
	);

	await act(() => new Promise(resolve => setTimeout(resolve, 0)));

	expect(getByTestId(GOAL1.id)).toBeInTheDocument();
	expect(getByTestId(GOAL2.id)).toBeInTheDocument();
});

test("test that all goals are unstarred initially", async () => {
	const { getByText, getByTestId, getAllByTestId } = render(
		<MockedProvider mocks={mocks}>
			<GoalList />
		</MockedProvider>
	);

	await act(() => new Promise(resolve => setTimeout(resolve, 0)));

	expect(getAllByTestId("unStarredGoal").length).toBe(2);
});

test("test star one goal", async () => {
	const { getByTestId, getAllByTestId } = render(
		<MockedProvider mocks={mocks} cache={new InMemoryCache()}>
			<GoalList />
		</MockedProvider>
	);

	await act(async () => {
		await new Promise(resolve => setTimeout(resolve, 0));
		fireEvent.click(getByTestId(GOAL1.id + '#starButton'));
		await new Promise(resolve => setTimeout(resolve, 0));
	});

	expect(getAllByTestId("starredGoal").length).toBe(1);
	expect(getAllByTestId("unStarredGoal").length).toBe(1);
});

test("test star two goals", async () => {
	const { getByTestId, getAllByTestId } = render(
		<MockedProvider mocks={mocks} cache={new InMemoryCache()}>
			<GoalList />
		</MockedProvider>
	);

	await act(async () => {
		await new Promise(resolve => setTimeout(resolve, 0));
		fireEvent.click(getByTestId(GOAL1.id + '#starButton'));
		fireEvent.click(getByTestId(GOAL2.id + '#starButton'));
		await new Promise(resolve => setTimeout(resolve, 0));
	});

	expect(getAllByTestId("starredGoal").length).toBe(2);
});

test("test open add goal form", async () => {
	const { getByText, getByTestId, getAllByTestId } = render(
		<MockedProvider mocks={mocks}>
			<GoalList />
		</MockedProvider>
	);

	await act(async () => {
		await new Promise(resolve => setTimeout(resolve, 0));
		fireEvent.click(getByTestId('addGoalButton'));
		await new Promise(resolve => setTimeout(resolve, 0));
	});

	expect(getByTestId("goalForm")).toBeInTheDocument();
});

test("test open edit form", async () => {
	const { getByText, getByTestId, getAllByTestId } = render(
		<MockedProvider mocks={mocks}>
			<GoalList />
		</MockedProvider>
	);

	await act(async () => {
		await new Promise(resolve => setTimeout(resolve, 0));
		fireEvent.click(getByTestId(GOAL1.id + '#editIconButton'));
		fireEvent.click(getByTestId(GOAL1.id + '#editMenuButton'));
		await new Promise(resolve => setTimeout(resolve, 0));
	});

	expect(getByTestId("goalForm")).toBeInTheDocument();
});

test("test edit goal", async () => {
	const { getByText, getByLabelText, getByTestId, debug } = render(
		<MockedProvider mocks={mocks}>
			<GoalList />
		</MockedProvider>
	);

	await act(async () => {
		await new Promise(resolve => setTimeout(resolve, 0));
		fireEvent.click(getByTestId(GOAL1.id + '#editIconButton'));
		fireEvent.click(getByTestId(GOAL1.id + '#editMenuButton'));
		fireEvent.change(getByLabelText("Title"), { target: { value: 'Test Title' } })	
		await new Promise(resolve => setTimeout(resolve, 0));
	});
	expect(getByLabelText("Title").value).toBe('Test Title');
});