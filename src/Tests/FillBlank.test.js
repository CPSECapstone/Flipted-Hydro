import { render, screen, cleanup } from '@testing-library/react';
import FillBlank from '../Components/FillBlank.js';

afterEach(() => {
    cleanup();
});

test("Submit Button Present", () => {
    render(<FillBlank/>);
    const linkElement = screen.getByRole('button', {name: /Submit/i});
    expect(linkElement).toBeInTheDocument();
});

test("Test1 for learning target in GradeScreen", () => {
    render(<FillBlank/>);
    const linkElement = screen.getByText(/Corners/i);
    expect(linkElement).toBeInTheDocument();
});
