import React, { Component } from 'react';
import './Calculator.css';
import Button from '../components/Button';
import Display from '../components/Display';

const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  indexValues: 0
}

class Calculator extends Component {

  constructor(props) {
    super(props);
    this.state = initialState;
    // this.state = {...initialState};
  }
  
// ------------------------FUNÇÕES------------------------------------

  clearMemory() {
    this.setState(initialState);
    // this.setState({...initialState});
  }

  setOperation = (operation) => {
    if (this.state.indexValues === 0) {
      this.setState({
        indexValues: 1,
        operation,
        clearDisplay: true,
      });
    } else {
      const equals = operation === '=';
      const currentOperation = this.state.operation;

      const values = [...this.state.values];
      // A linha de código acima também pode ser executada desse modo:
      // const values = this.state.values;

      // Nestas próximas linhas de código implementarei as operações matemáticas
      let result = 0;
      switch (currentOperation) {
        case '+':
          result = values[0] + values[1];
          values[0] = result;
          values[1] = 0;
          break;
        case "-":
          result = values[0] - values[1];
          values[0] = result;
          values[1] = 0;
          break;
        case "*":
          result = values[0] * values[1];
          values[0] = result;
          values[1] = 0;
          break;
          case "/":
            result = values[0] / values[1];
            values[0] = result;
            values[1] = 0;
            break
          default:
      }

      this.setState({
        displayValue: values[0],
        operation: equals ? null : operation,
        indexValues: equals ? 0 : 1,
        clearDisplay: !equals,
        values
      })
    }
  }

  addDigit = (n) => {
    if (n === '.' && this.state.displayValue.includes('.')) {
      return
    }
    const clearDisplay = this.state.displayValue === '0'
      || this.state.clearDisplay;
    const currentValue = clearDisplay ? '' : this.state.displayValue;
    const displayValue = currentValue + n 
    this.setState({
      clearDisplay: false,
      displayValue,
    })
    if (n !== '.') {
      const i = this.state.indexValues;
      const newValue = parseFloat(displayValue)
      const values = [...this.state.values];
      // A linha de código acima também pode ser executada desse modo:
      // const values = this.state.values;
      values[i] = newValue;
      this.setState({ values });
      console.log(values)
    }
  }

// --------------------------------------------------------------------
  render() {
    // também podemos transformar as funções normais acima em arrow:
    const clearMemory = () => this.clearMemory();

    const { displayValue } = this.state;
    return(
      <div className="calculator">
        <Display value={displayValue} />
        <Button label="AC" click={ clearMemory } triple />
        <Button label="/"  click={ this.setOperation } operation />
        <Button label="7" click={ this.addDigit } />
        <Button label="8" click={ this.addDigit } />
        <Button label="9" click={ this.addDigit } />
        <Button label="*" click={ this.setOperation } operation />
        <Button label="4" click={ this.addDigit } />
        <Button label="5" click={ this.addDigit } />
        <Button label="6" click={ this.addDigit } />
        <Button label="-" click={ this.setOperation } operation />
        <Button label="1" click={ this.addDigit } />
        <Button label="2" click={ this.addDigit } />
        <Button label="3" click={ this.addDigit } />
        <Button label="+" click={ this.setOperation } operation />
        <Button label="0" click={ this.addDigit } double />
        <Button label="." click={ this.addDigit } />
        <Button label="=" click={ this.setOperation } operation />

      </div>
    );
  }
}

export default Calculator;