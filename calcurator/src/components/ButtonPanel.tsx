import { ButtonCode } from "../logic/calculate";

const ButtonPanel = (props: {
    buttonHandler: (code: ButtonCode) => void;
}) => {
    return (
        <div className='buttonPanel'>
            <div>
                <button onClick={() => props.buttonHandler("AC")}>AC</button>
                <button onClick={() => props.buttonHandler("+/-")}>+/-</button>
                <button onClick={() => props.buttonHandler("%")}>%</button>
                <button className="orangebutton" onClick={() => props.buttonHandler("/")}>/</button>
            </div>
            <div>
                <button onClick={() => props.buttonHandler("7")}>7</button>
                <button onClick={() => props.buttonHandler("8")}>8</button>
                <button onClick={() => props.buttonHandler("9")}>9</button>
                <button className="orangebutton" onClick={() => props.buttonHandler("*")}>*</button>
            <div>
            <div>
                <button onClick={() => props.buttonHandler("4")}>4</button>
                <button onClick={() => props.buttonHandler("5")}>5</button>
                <button onClick={() => props.buttonHandler("6")}>6</button>
                <button  className="orangebutton" onClick={() => props.buttonHandler("-")}>-</button>
            </div>
                <button onClick={() => props.buttonHandler("1")}>1</button>
                <button onClick={() => props.buttonHandler("2")}>2</button>
                <button onClick={() => props.buttonHandler("3")}>3</button>
                <button className="orangebutton" onClick={() => props.buttonHandler("+")}>+</button>
            </div>
                <button onClick={() => props.buttonHandler("0")}>0</button>
                <button onClick={() => props.buttonHandler("D")}>D</button>
                <button onClick={() => props.buttonHandler(".")}>.</button>
                <button className="orangebutton" onClick={() => props.buttonHandler("=")}>=</button>
            </div>
        </div>
    );
}

export default ButtonPanel;