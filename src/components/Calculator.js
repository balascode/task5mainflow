import React, { useState } from 'react';
import { evaluate } from 'mathjs';
import Button from './Button';
import './Calculator.css';

function Calculator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleButtonClick = (value) => {
    if (result === 'Error' && value !== 'C') {
      return;
    }

    if (value === '=') {
      try {
        const calculatedResult = evaluate(input);
        setResult(calculatedResult.toString());
        setInput('');
      } catch (error) {
        setResult('Error');
      }
    } else if (value === 'C') {
      setInput('');
      setResult('');
    } else if (value === '←') {
      if (input) {
        setInput(input.slice(0, -1));
      } else if (result) {
        setResult(result.slice(0, -1));
      }
    } else if (['+', '-', '*', '/'].includes(value)) {
      if (result && !isNaN(result) && !['+', '-', '*', '/'].includes(input.slice(-1))) {
        setInput(result + value);
        setResult('');
      } else {
        setInput(input + value);
      }
    } else if (value === '.') {
      if (result && !isNaN(result) && !input.includes('.')) {
        setInput(result + value);
        setResult('');
      } else if (!input.includes('.')) {
        setInput(input + value);
      }
    } else {
      if (result) {
        setInput(value);
        setResult('');
      } else {
        setInput(input + value);
      }
    }
  };

  return (
    <div className="calculator">
      <div className="display">
        <div className="input">{input || (result && result !== 'Error' ? result : '0')}</div>
        <div className="result">{result && result === 'Error' ? result : ''}</div>
      </div>
      <div className="buttons">
        {['C', '←', '.', '/', '7', '8', '9', '*', '4', '5', '6', '-', '1', '2', '3', '+', '0', '(', ')',  '='].map((buttonValue) => (
          <Button key={buttonValue} value={buttonValue} onClick={handleButtonClick} />
        ))}
      </div>
    </div>
  );
}

export default Calculator;
