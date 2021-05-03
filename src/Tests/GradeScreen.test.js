import { render, screen, cleanup } from '@testing-library/react';
import { LearningTarget } from '../Components/GradeScreen';

afterEach(() => {
    cleanup();
});

test("Test1 for learning target in GradeScreen", () => {
    render(<LearningTarget
            name = "test1"
            completed = {1}
            prog = {1}
            untouched = {1}/>);
    const learningTarget = screen.getByTestId("test1");
    expect(learningTarget).toBeInTheDocument();
    expect(learningTarget).toHaveTextContent("test1");
});

test("Test2 for learning target in GradeScreen", () => {
    render(<LearningTarget
            name = "test2"
            completed = {0}
            prog = {2}
            untouched = {5}/>);
    const learningTarget = screen.getByTestId("test2");
    expect(learningTarget).toBeInTheDocument();
    expect(learningTarget).toHaveTextContent("test2");
});