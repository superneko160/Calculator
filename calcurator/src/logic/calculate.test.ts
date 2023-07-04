import '@testing-library/react';
import calculate, { ButtonCode, State } from './calculate';

const makeInitState = (): State => {
    return {
        current: "0",
        operand: 0,
        operator: null,
        isNextClear: false
    }
}

const execCalc = (buttons: ButtonCode[], state: State): State => {
    buttons.forEach((button) => {
        state = calculate(button, state)
    });
    return state;
}

// === test case ===

test("add", () => {
    const finalState = execCalc(["1", "+", "2", "="], makeInitState())
    expect(finalState.current).toBe("3");
    expect(finalState.operand).toBe(0);
    expect(finalState.operator).toBe(null);
    expect(finalState.isNextClear).toBe(true);
});

test("sub", () => {
    const finalState = execCalc(["3", "-", "2", "="], makeInitState())
    expect(finalState.current).toBe("1");
    expect(finalState.operand).toBe(0);
    expect(finalState.operator).toBe(null);
    expect(finalState.isNextClear).toBe(true);
});

test("mult", () => {
    const finalState = execCalc(["2", "*", "2", "="], makeInitState())
    expect(finalState.current).toBe("4");
    expect(finalState.operand).toBe(0);
    expect(finalState.operator).toBe(null);
    expect(finalState.isNextClear).toBe(true);
});

test("div", () => {
    const finalState = execCalc(["6", "/", "2", "="], makeInitState())
    expect(finalState.current).toBe("3");
    expect(finalState.operand).toBe(0);
    expect(finalState.operator).toBe(null);
    expect(finalState.isNextClear).toBe(true);
});

test("% button", () => {
    const finalState = execCalc(["6", "%"], makeInitState())
    expect(finalState.current).toBe("0.06");
    expect(finalState.operand).toBe(0);
    expect(finalState.operator).toBe(null);
    expect(finalState.isNextClear).toBe(false);
});

test("D button", () => {
    const finalState = execCalc(["7", "2", "D"], makeInitState())
    expect(finalState.current).toBe("7");
    expect(finalState.operand).toBe(0);
    expect(finalState.operator).toBe(null);
    expect(finalState.isNextClear).toBe(false);
});

test("AC button", () => {
    const finalState = execCalc(["7", "0", "+", "2", "=", "AC"], makeInitState())
    expect(finalState.current).toBe("0");
    expect(finalState.operand).toBe(0);
    expect(finalState.operator).toBe(null);
    expect(finalState.isNextClear).toBe(false);
});

test("decimal calculation", () => {
  const finalState = execCalc(["0",".", "1", "+", "1", "="], makeInitState());
  expect(finalState.current).toBe("1.1");
  expect(finalState.operand).toBe(0);
  expect(finalState.operator).toBe(null);
  expect(finalState.isNextClear).toBe(true);
});

test("negative number calculation", () => {
  const finalState = execCalc(["5", "+/-", "*", "2", "="], makeInitState());
  expect(finalState.current).toBe("-10");
  expect(finalState.operand).toBe(0);
  expect(finalState.operator).toBe(null);
  expect(finalState.isNextClear).toBe(true);
});

test("multiple operators", () => {
  const finalState = execCalc(["3", "+", "4", "-", "2", "="], makeInitState());
  expect(finalState.current).toBe("5");
  expect(finalState.operand).toBe(0);
  expect(finalState.operator).toBe(null);
  expect(finalState.isNextClear).toBe(true);
});

test("error handling - division by zero", () => {
  const finalState = execCalc(["6", "/", "0", "="], makeInitState());
  expect(finalState.current).toBe("数値ではありません");
  expect(finalState.operand).toBe(0);
  expect(finalState.operator).toBe(null);
  expect(finalState.isNextClear).toBe(true);
});
