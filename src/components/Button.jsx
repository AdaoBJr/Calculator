import React, { Component } from 'react';
import './Button.css';

class Button extends Component {
  // clickButtons (event) {
  //   this.props.click && this.props.click(event.target.innerHTML);
  // }
  render() {
    const { operation, label, double, triple, click } = this.props;
    return(
      <button className={`
        button
        ${ operation ? 'operation' : '' }
        ${ double ? 'double' : '' }
        ${ triple ? 'triple' : '' }
      `}
      onClick={(event) => click && click(label)}
      // A linha de código acima também pode ser executada desses modos:
      // 1 - onClick={ this.clickButtons } 
      // 2 - onClick={(event) => click && click(event.target.innerHTML)}
      >
        { label }
      </button>
  );
  }
}

export default Button;
