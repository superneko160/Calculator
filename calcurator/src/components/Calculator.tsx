import { useState } from "react";
import calculate, { ButtonCode, State } from "../logic/calculate";
import ButtonPanel from "./ButtonPanel";
import Display from "./Display";
import "./Calculator.scss";

const Calculator = () => {
    const [state, setState] = useState<State>({
        current: "0",
        operand: 0,
        operator: null,
        isNextClear: false
    });

    // 計算機ボタン押下時
    const buttonHandler = (code: ButtonCode) => {
        const nextState = calculate(code, state);
        setState(nextState);
    };

    return (
        <div>
            <Display value={state.current}/>
            <ButtonPanel buttonHandler={buttonHandler}/>
        </div>
    );
}

export default Calculator;