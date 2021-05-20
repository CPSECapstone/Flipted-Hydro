import { render, screen, cleanup } from '@testing-library/react';
import {numToCSS, calculateWidth, getStyle, propsOrDefault } from '../Components/ProgressBar';
import ProgressBar from '../Components/ProgressBar';

afterEach(() => {
	cleanup();
});

test("numToCSS tests", () => {
    expect(numToCSS(2)).toEqual('2px');
    expect(numToCSS(10)).toEqual('10px');
    expect(numToCSS(250)).toEqual('250px');
    expect(numToCSS(479)).toEqual('479px');
    expect(numToCSS(19)).toEqual('19px');
    expect(numToCSS(0)).toEqual('0px');
});

test("calculateWidth tests", () => {
    expect(calculateWidth(1, 10, 100)).toEqual(10);
    expect(calculateWidth(1, 4, 100)).toEqual(25);
    expect(calculateWidth(1, 9, 200)).toBeCloseTo(22.22);
    expect(calculateWidth(49, 957, 12345)).toBeCloseTo(632.08);
    expect(calculateWidth(4, 10, 1000)).toEqual(400);
});

test("getStyle test#1", () => {
    const style1 = {
        'color' : 'red',
        'backgroundColor' : 'red',
        'height' : '10px',
        'width' : '50px',
        'border' : '1px solid navy',
        'border-top-left-radius' : '10px',
        'border-bottom-left-radius' : '10px'
    }
    expect(getStyle('red', 10, 100, 1, 2, true)).toEqual(style1);
});

test("getStyle test#2", () => {
    const style2 = {
        'color' : 'green',
        'backgroundColor' : 'green',
        'height' : '14px',
        'width' : '25px',
        'border' : '1px solid navy',
        'border-top-right-radius' : '10px',
        'border-bottom-right-radius' : '10px'
    }
    expect(getStyle('green', 14, 100, 1, 4, false)).toEqual(style2);
});

test("getStyle test#3", () => {
    const style3 = {
        'color' : 'blue',
        'backgroundColor' : 'blue',
        'height' : '90px',
        'width' : '10px',
        'border' : '1px solid navy',
        'border-top-left-radius' : '10px',
        'border-bottom-left-radius' : '10px'
    }
    expect(getStyle('blue', 90, 100, 1, 10, true)).toEqual(style3);
});

test("propsOrDefault test#1", () => {
    const props1 = {
        width: 10,
        height: 10,
        doneColor: 'red',
        leftColor: 'black',
        total: 10,
        done: 4,
    }
    const result1 = {
        width: 10,
        height: 10,
        doneColor: 'red',
        leftColor: 'black',
        totalNum: 10,
        doneNum: 4,
        leftNum: 6,
    }
    expect(propsOrDefault(props1)).toEqual(result1);
});

test("propsOrDefault test#1", () => {
    const props1 = {
        width: 10,
        height: 10,
        doneColor: 'red',
        leftColor: 'black',
        total: 10,
        done: 4,
    }
    const result1 = {
        width: 10,
        height: 10,
        doneColor: 'red',
        leftColor: 'black',
        totalNum: 10,
        doneNum: 4,
        leftNum: 6,
    }
    expect(propsOrDefault(props1)).toEqual(result1);
});

test("propsOrDefault test#2", () => {
    const props2 = {
    }
    const result2 = {
        width: 700,
        height: 10,
        doneColor: 'blue',
        leftColor: 'gray',
        totalNum: 10,
        doneNum: 0,
        leftNum: 10,
    }
    expect(propsOrDefault(props2)).toEqual(result2);
});

test("propsOrDefault test#3", () => {
    const props3 = {
        width: 10,
        height: 10,
        total: 10,
        done: 4,
    }
    const result3 = {
        width: 10,
        height: 10,
        doneColor: 'blue',
        leftColor: 'gray',
        totalNum: 10,
        doneNum: 4,
        leftNum: 6,
    }
    expect(propsOrDefault(props3)).toEqual(result3);
});

test("propsOrDefault test#4", () => {
    const props4 = {
        doneColor: 'red',
        leftColor: 'black',
        total: 10,
        done: 4,
    }
    const result4 = {
        width: 700,
        height: 10,
        doneColor: 'red',
        leftColor: 'black',
        totalNum: 10,
        doneNum: 4,
        leftNum: 6,
    }
    expect(propsOrDefault(props4)).toEqual(result4);
});

test("propsOrDefault test#5", () => {
    const props5 = {
        width: 10,
        height: 10,
        doneColor: 'red',
        leftColor: 'black',
    }
    const result5 = {
        width: 10,
        height: 10,
        doneColor: 'red',
        leftColor: 'black',
        totalNum: 10,
        doneNum: 0,
        leftNum: 10,
    }
    expect(propsOrDefault(props5)).toEqual(result5);
});

test("Progressbar test#1", () => {
    render(<ProgressBar 
        width={10}
        height={10}
        doneColor={'red'}
        leftColor={'black'}
        total={10}
        done={4}
    />);
    const progressBar1 = screen.getByTestId("progress-bar-red-black-10-10");
    expect(progressBar1).toBeInTheDocument();
});

test("Progressbar test#2", () => {
    render(<ProgressBar />);
    const progressBar2 = screen.getByTestId("progress-bar-blue-gray-700-10");
    expect(progressBar2).toBeInTheDocument();
});