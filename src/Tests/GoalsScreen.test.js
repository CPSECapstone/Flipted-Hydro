import { render, screen, cleanup } from '@testing-library/react';
import GoalsScreen from '../Components/GoalsScreen.js';

afterEach(() => {
    cleanup();
});

test("Test1 for the page title", () => {
    render(<GoalsScreen/>);
    const gs = screen.getByTestId("test1");
    expect(gs).toBeInTheDocument();
    expect(gs).toHaveTextContent("Goals");
});

test("Test2 for the new goal form", () => {
    render(<GoalsScreen/>);
    const gs = screen.getByTestId("test2");
    expect(gs).toBeInTheDocument();
    expect(gs).toHaveTextContent("Add Goal");
    expect(gs).toHaveTextContent("Name:");
    expect(gs).toHaveTextContent("Goal:");
    expect(gs).toHaveTextContent("Tag:");
    expect(gs).toHaveTextContent("Subgoal:");
});

test("Test3 for goal filtering section", () => {
    render(<GoalsScreen/>);
    const gs = screen.getByTestId("test3");
    expect(gs).toBeInTheDocument();
    expect(gs).toHaveTextContent("Filter by tag");
    expect(gs).toHaveTextContent("dropdown");
    expect(gs).toHaveTextContent("tag1");
    expect(gs).toHaveTextContent("tag2");
    expect(gs).toHaveTextContent("tag3");
});
