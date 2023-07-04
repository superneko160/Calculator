import './App.scss';
import Calculator from './components/Calculator';

const App = () => {
    return (
        <div>
            <div className='header'>
                <h1>Web Calcurator</h1>
            </div>
            <div className='container'>
                <Calculator />
            </div>
        </div>
    );
}

export default App;
