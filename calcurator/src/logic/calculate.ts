export type Operator = "+" | "-" | "*" | "/";
export type NumberCode = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
export type ButtonCode = NumberCode| Operator | "." | "%" | "+/-" | "D" | "AC" | "=";

export interface State {
    current: string;
    operand: number;
    operator: string | null;
    isNextClear: boolean;
}

const calculate = (button: ButtonCode, state: State): State => {
    // 数値
    if (isNumberButton(button)) {
        return handleNumberButton(button, state);
    }
    // オペレータ
    if (isOperatorButton(button)) {
        return handleOperatorButton(button, state);
    }
    // 小数点
    if (isDotButton(button)) {
        return handleDotButton(state);
    }
    // パーセンテージ
    if (isPercentageButton(button)) {
        return handlePercentageButton(state);
    }
    // 符号
    if (isToggleSignButton(button)) {
        return handleToggleSignButton(state);
    }
    // 削除
    if (isDeleteButton(button)) {
        return handleDeleteButton(state);
    }
    // AC
    if (isAllclearButton(button)) {
        return handleAllclearButton();
    }
    // イコール
    if (isEqualButton(button)) {
        return handleEqualButton(state);
    }
    return state;
}

export default calculate;

// --- 内部関数 ---
const isNumberButton = (button: string): button is NumberCode => {
    return (
        button === "0" ||
        button === "1" ||
        button === "2" ||
        button === "3" ||
        button === "4" ||
        button === "5" ||
        button === "6" ||
        button === "7" ||
        button === "8" ||
        button === "9" 
    );
}

const handleNumberButton = (button: NumberCode, state: State): State => {
    if (state.isNextClear) {
        return {
            current: button,
            operand: state.operand,
            operator: state.operator,
            isNextClear: false
        }
    }
    if (state.current === "0") {
        return {
            current: button,
            operand: state.operand,
            operator: state.operator,
            isNextClear: false
        };
    }
    return {
        current: state.current + button,
        operand: state.operand,
        operator: state.operator,
        isNextClear: false
    };
}

const isOperatorButton = (button: string): button is Operator => {
    return button === "+" || button === "-" || button === "*" || button === "/";
}

const handleOperatorButton = (button: Operator, state: State): State => {
    if (state.operator === null) {
        return {
            current: state.current,
            operand: parseFloat(state.current),
            operator: button,
            isNextClear: true
        }
    }
    const nextValue = operate(state)
    return {
        current: `${filterNum(nextValue)}`,
        operand: nextValue,
        operator: button,
        isNextClear: true
    }
}

const isDotButton = (button: string) => {
    return button === ".";
}

const handleDotButton = (state: State): State => {
    if (state.current.indexOf('.') !== -1) {
        return state;
    }
    return {
        current: state.current + ".",
        operand: state.operand,
        operator: state.operator,
        isNextClear: false
    }
}

const isPercentageButton = (button: string) => {
    return button === "%";
}

const handlePercentageButton = (state: State): State => {
    const current = parseFloat(state.current);
    const percent = current / 100;
    return {
        current: `${percent}`,
        operand: state.operand,
        operator: state.operator,
        isNextClear: false
    }
}

const isToggleSignButton = (button: string) => {
    return button === "+/-";
}

const handleToggleSignButton = (state: State): State => {
    const current = parseFloat(state.current);
    const toggledValue = -current;
    return {
        current: `${toggledValue}`,
        operand: state.operand,
        operator: state.operator,
        isNextClear: false
    }
}

const isDeleteButton = (button: string) => {
    return button === "D";
}

const handleDeleteButton = (state: State): State => {
    // 1文字の場合は表示を0に戻す
    if (state.current.length === 1) {
        return {
            current: "0",
            operand: state.operand,
            operator: state.operator,
            isNextClear: false
        }
    }
    return {
        current: state.current.substring(0, state.current.length - 1),
        operand: state.operand,
        operator: state.operator,
        isNextClear: false
    }
}

const isAllclearButton = (button: string) => {
    return button === "AC";
}

const handleAllclearButton = (): State => {
   return {
        current: "0",
        operand: 0,
        operator: null,
        isNextClear: false
    }
}

const isEqualButton = (button: string) => {
    return button === "=";
}

const handleEqualButton = (state: State): State => {
    if (state.operator === null) {
        return state;
    }
    const nextValue = operate(state);
   return {
        current: `${filterNum(nextValue)}`,
        operand: 0,
        operator: null,
        isNextClear: true
    }
}

const operate = (state: State): number => {
    const current = parseFloat(state.current);
    if (state.operator === "+") {
        return state.operand + current
    }
      if (state.operator === "-") {
        return state.operand - current
    }
    if (state.operator === "*") {
        return state.operand * current
    }
    if (state.operator === "/") {
        return state.operand / current
    }
    return current;
}

const filterNum = (num: number): number | string => {
    if  (isNaN(num) || !isFinite(num)) {
        return "数値ではありません";
    }
    return num
}