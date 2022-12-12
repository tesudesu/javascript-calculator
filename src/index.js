import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function calculate(array) {
  
  // The below four functions operate on an array like [..., '6', 'X', '4.3', ...].
  // With the index of the operator, perform the relevant operation on the preceeding number and the subsequent number.
  // Then replace the 3 places with the result, e.g. above array becomes [..., 25.8, ...].

  function multiply(arr, ind) {
    let prevValue = Number(arr[ind - 1]);
    let nextValue = Number(arr[ind + 1]);
    let newValue = Math.round((prevValue * nextValue) * 1e8) / 1e8;
    let replicaArr = arr.slice();
    replicaArr.splice(ind - 1, 3, newValue);
    return replicaArr;
  };
  
  function divide(arr, ind) {
    let prevValue = Number(arr[ind - 1]);
    let nextValue = Number(arr[ind + 1]);
    let newValue = Math.round((prevValue / nextValue) * 1e8) / 1e8;
    let replicaArr = arr.slice();
    replicaArr.splice(ind - 1, 3, newValue);
    return replicaArr;
  };
  
  function add(arr, ind) {
    let prevValue = Number(arr[ind - 1]);
    let nextValue = Number(arr[ind + 1]);
    let newValue = Math.round((prevValue + nextValue) * 1e8) / 1e8;
    let replicaArr = arr.slice();
    replicaArr.splice(ind - 1, 3, newValue);
    return replicaArr;
  };
  
  function subtract(arr, ind) {
    let prevValue = Number(arr[ind - 1]);
    let nextValue = Number(arr[ind + 1]);
    let newValue = Math.round((prevValue - nextValue) * 1e8) / 1e8;
    let replicaArr = arr.slice();
    replicaArr.splice(ind - 1, 3, newValue);
    return replicaArr;
  };

  // Multiplication and division go first.
  // In an array like ['22', '-', '6', 'X', '-9', '+ '7.8'], find the index of the first 'X' or '/', and perform the relevant operation using the defined function above.
  // Do this until all 'X's and '/'s are gone.

  let indexMD = array.findIndex(elem => elem == 'X' || elem == '/');
  let newArrMD = array;
  while (indexMD !== -1) {
    if (array[indexMD] == 'X') {
      newArrMD = multiply(array, indexMD);
    } else if (array[indexMD] == '/') {
      newArrMD = divide(array, indexMD);
    }
    indexMD = newArrMD.findIndex(elem => elem == 'X' || elem == '/');
    array = newArrMD;   
  }

  // When all 'X's and '/'s are gone, repeat for '+'s and '-'s.

  let indexAS = newArrMD.findIndex(elem => elem == '+' || elem == '-');
  let newArrAS = newArrMD;
  while (indexAS !== -1) {
    if (newArrMD[indexAS] == '+') {
      newArrAS = add(newArrMD, indexAS);
    } else if (newArrMD[indexAS] == '-') {
      newArrAS = subtract(newArrMD, indexAS);
    }
    indexAS = newArrAS.findIndex(elem => elem == '+' || elem == '-');
    newArrMD = newArrAS;   
  }

  return newArrAS[0];
}

let progress = [];

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainDisplay: '0',
      subDisplay: '', 
    }
    this.handleSeven = this.handleSeven.bind(this);
    this.handleEight = this.handleEight.bind(this);
    this.handleNine = this.handleNine.bind(this);
    this.handleFour = this.handleFour.bind(this);
    this.handleFive = this.handleFive.bind(this);
    this.handleSix = this.handleSix.bind(this);
    this.handleOne = this.handleOne.bind(this);
    this.handleTwo = this.handleTwo.bind(this);
    this.handleThree = this.handleThree.bind(this);
    this.handleZero = this.handleZero.bind(this);
    this.handleDivide = this.handleDivide.bind(this);
    this.handleMultiply = this.handleMultiply.bind(this);
    this.handleSubtract = this.handleSubtract.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleEquals = this.handleEquals.bind(this);
  }

  handleSeven() {
    let lastSub = this.state.subDisplay[this.state.subDisplay.length - 1];
    let secondLastSub = this.state.subDisplay[this.state.subDisplay.length - 2];
    // if just did calculation
    if (this.state.subDisplay.indexOf('=') >= 0) {
      progress = [];
      this.setState({
        mainDisplay: '7',
        subDisplay: '7',
      });
    // if '0' was pressed right before
    } else if (this.state.mainDisplay == '0' && lastSub == '0') {
      this.setState({
        mainDisplay: '7',
        subDisplay: this.state.subDisplay.slice(0, -1) + '7',
      });
    // if '-' followed by '0' were pressed right before
    } else if (this.state.mainDisplay == '-0' && lastSub == '0') {
      this.setState({
        mainDisplay: '-7',
        subDisplay: this.state.subDisplay.slice(0, -1) + '7',
      });
    // one operator situation (not +-, --, X-, or /- situation) or starting situation
    } else if (((lastSub == '+' || lastSub == '-' || lastSub == 'X' || lastSub == '/') 
                && (secondLastSub !== '+' && secondLastSub !== '-' && secondLastSub !== 'X' && secondLastSub !== '/'))
                || this.state.mainDisplay =='0') {
      this.setState({
        mainDisplay: '7',
        subDisplay: this.state.subDisplay + '7',
      });
    // if above situations don't apply, simply add '7' to both displays
    } else {
      this.setState({
        mainDisplay: this.state.mainDisplay + '7',
        subDisplay: this.state.subDisplay + '7',
      });
    }
  };

  handleEight() {
    let lastSub = this.state.subDisplay[this.state.subDisplay.length - 1];
    let secondLastSub = this.state.subDisplay[this.state.subDisplay.length - 2];
    if (this.state.subDisplay.indexOf('=') >= 0) {
      progress = [];
      this.setState({
        mainDisplay: '8',
        subDisplay: '8',
      });
    } else if (this.state.mainDisplay == '0' && lastSub == '0') {
      this.setState({
        mainDisplay: '8',
        subDisplay: this.state.subDisplay.slice(0, -1) + '8',
      });
    } else if (this.state.mainDisplay == '-0' && lastSub == '0') {
      this.setState({
        mainDisplay: '-8',
        subDisplay: this.state.subDisplay.slice(0, -1) + '8',
      });
    } else if (((lastSub == '+' || lastSub == '-' || lastSub == 'X' || lastSub == '/') 
                && (secondLastSub !== '+' && secondLastSub !== '-' && secondLastSub !== 'X' && secondLastSub !== '/'))
                || this.state.mainDisplay =='0') {
      this.setState({
        mainDisplay: '8',
        subDisplay: this.state.subDisplay + '8',
      });
    } else {
      this.setState({
        mainDisplay: this.state.mainDisplay + '8',
        subDisplay: this.state.subDisplay + '8',
      });
    }
  };

  handleNine() {
    let lastSub = this.state.subDisplay[this.state.subDisplay.length - 1];
    let secondLastSub = this.state.subDisplay[this.state.subDisplay.length - 2];
    if (this.state.subDisplay.indexOf('=') >= 0) {
      progress = [];
      this.setState({
        mainDisplay: '9',
        subDisplay: '9',
      });
    } else if (this.state.mainDisplay == '0' && lastSub == '0') {
      this.setState({
        mainDisplay: '9',
        subDisplay: this.state.subDisplay.slice(0, -1) + '9',
      });
    } else if (this.state.mainDisplay == '-0' && lastSub == '0') {
      this.setState({
        mainDisplay: '-9',
        subDisplay: this.state.subDisplay.slice(0, -1) + '9',
      });
    } else if (((lastSub == '+' || lastSub == '-' || lastSub == 'X' || lastSub == '/') 
                && (secondLastSub !== '+' && secondLastSub !== '-' && secondLastSub !== 'X' && secondLastSub !== '/'))
                || this.state.mainDisplay =='0') {
      this.setState({
        mainDisplay: '9',
        subDisplay: this.state.subDisplay + '9',
      });
    } else {
      this.setState({
        mainDisplay: this.state.mainDisplay + '9',
        subDisplay: this.state.subDisplay + '9',
      });
    }
  };

  handleFour() {
    let lastSub = this.state.subDisplay[this.state.subDisplay.length - 1];
    let secondLastSub = this.state.subDisplay[this.state.subDisplay.length - 2];
    if (this.state.subDisplay.indexOf('=') >= 0) {
      progress = [];
      this.setState({
        mainDisplay: '4',
        subDisplay: '4',
      });
    } else if (this.state.mainDisplay == '0' && lastSub == '0') {
      this.setState({
        mainDisplay: '4',
        subDisplay: this.state.subDisplay.slice(0, -1) + '4',
      });
    } else if (this.state.mainDisplay == '-0' && lastSub == '0') {
      this.setState({
        mainDisplay: '-4',
        subDisplay: this.state.subDisplay.slice(0, -1) + '4',
      });
    } else if (((lastSub == '+' || lastSub == '-' || lastSub == 'X' || lastSub == '/') 
                && (secondLastSub !== '+' && secondLastSub !== '-' && secondLastSub !== 'X' && secondLastSub !== '/'))
                || this.state.mainDisplay =='0') {
      this.setState({
        mainDisplay: '4',
        subDisplay: this.state.subDisplay + '4',
      });
    } else {
      this.setState({
        mainDisplay: this.state.mainDisplay + '4',
        subDisplay: this.state.subDisplay + '4',
      });
    }
  };

  handleFive() {
    let lastSub = this.state.subDisplay[this.state.subDisplay.length - 1];
    let secondLastSub = this.state.subDisplay[this.state.subDisplay.length - 2];
    if (this.state.subDisplay.indexOf('=') >= 0) {
      progress = [];
      this.setState({
        mainDisplay: '5',
        subDisplay: '5',
      });
    } else if (this.state.mainDisplay == '0' && lastSub == '0') {
      this.setState({
        mainDisplay: '5',
        subDisplay: this.state.subDisplay.slice(0, -1) + '5',
      });
    } else if (this.state.mainDisplay == '-0' && lastSub == '0') {
      this.setState({
        mainDisplay: '-5',
        subDisplay: this.state.subDisplay.slice(0, -1) + '5',
      });
    } else if (((lastSub == '+' || lastSub == '-' || lastSub == 'X' || lastSub == '/') 
                && (secondLastSub !== '+' && secondLastSub !== '-' && secondLastSub !== 'X' && secondLastSub !== '/'))
                || this.state.mainDisplay =='0') {
      this.setState({
        mainDisplay: '5',
        subDisplay: this.state.subDisplay + '5',
      });
    } else {
      this.setState({
        mainDisplay: this.state.mainDisplay + '5',
        subDisplay: this.state.subDisplay + '5',
      });
    }
  };

  handleSix() {
    let lastSub = this.state.subDisplay[this.state.subDisplay.length - 1];
    let secondLastSub = this.state.subDisplay[this.state.subDisplay.length - 2];
    if (this.state.subDisplay.indexOf('=') >= 0) {
      progress = [];
      this.setState({
        mainDisplay: '6',
        subDisplay: '6',
      });
    } else if (this.state.mainDisplay == '0' && lastSub == '0') {
      this.setState({
        mainDisplay: '6',
        subDisplay: this.state.subDisplay.slice(0, -1) + '6',
      });
    } else if (this.state.mainDisplay == '-0' && lastSub == '0') {
      this.setState({
        mainDisplay: '-6',
        subDisplay: this.state.subDisplay.slice(0, -1) + '6',
      });
    } else if (((lastSub == '+' || lastSub == '-' || lastSub == 'X' || lastSub == '/') 
                && (secondLastSub !== '+' && secondLastSub !== '-' && secondLastSub !== 'X' && secondLastSub !== '/'))
                || this.state.mainDisplay =='0') {
      this.setState({
        mainDisplay: '6',
        subDisplay: this.state.subDisplay + '6',
      });
    } else {
      this.setState({
        mainDisplay: this.state.mainDisplay + '6',
        subDisplay: this.state.subDisplay + '6',
      });
    }
  };

  handleOne() {
    let lastSub = this.state.subDisplay[this.state.subDisplay.length - 1];
    let secondLastSub = this.state.subDisplay[this.state.subDisplay.length - 2];
    if (this.state.subDisplay.indexOf('=') >= 0) {
      progress = [];
      this.setState({
        mainDisplay: '1',
        subDisplay: '1',
      });
    } else if (this.state.mainDisplay == '0' && lastSub == '0') {
      this.setState({
        mainDisplay: '1',
        subDisplay: this.state.subDisplay.slice(0, -1) + '1',
      });
    } else if (this.state.mainDisplay == '-0' && lastSub == '0') {
      this.setState({
        mainDisplay: '-1',
        subDisplay: this.state.subDisplay.slice(0, -1) + '1',
      });
    } else if (((lastSub == '+' || lastSub == '-' || lastSub == 'X' || lastSub == '/') 
                && (secondLastSub !== '+' && secondLastSub !== '-' && secondLastSub !== 'X' && secondLastSub !== '/'))
                || this.state.mainDisplay =='0') {
      this.setState({
        mainDisplay: '1',
        subDisplay: this.state.subDisplay + '1',
      });
    } else {
      this.setState({
        mainDisplay: this.state.mainDisplay + '1',
        subDisplay: this.state.subDisplay + '1',
      });
    }
  };

  handleTwo() {
    let lastSub = this.state.subDisplay[this.state.subDisplay.length - 1];
    let secondLastSub = this.state.subDisplay[this.state.subDisplay.length - 2];
    if (this.state.subDisplay.indexOf('=') >= 0) {
      progress = [];
      this.setState({
        mainDisplay: '2',
        subDisplay: '2',
      });
    } else if (this.state.mainDisplay == '0' && lastSub == '0') {
      this.setState({
        mainDisplay: '2',
        subDisplay: this.state.subDisplay.slice(0, -1) + '2',
      });
    } else if (this.state.mainDisplay == '-0' && lastSub == '0') {
      this.setState({
        mainDisplay: '-2',
        subDisplay: this.state.subDisplay.slice(0, -1) + '2',
      });
    } else if (((lastSub == '+' || lastSub == '-' || lastSub == 'X' || lastSub == '/') 
                && (secondLastSub !== '+' && secondLastSub !== '-' && secondLastSub !== 'X' && secondLastSub !== '/'))
                || this.state.mainDisplay =='0') {
      this.setState({
        mainDisplay: '2',
        subDisplay: this.state.subDisplay + '2',
      });
    } else {
      this.setState({
        mainDisplay: this.state.mainDisplay + '2',
        subDisplay: this.state.subDisplay + '2',
      });
    }
  };

  handleThree() {
    let lastSub = this.state.subDisplay[this.state.subDisplay.length - 1];
    let secondLastSub = this.state.subDisplay[this.state.subDisplay.length - 2];
    if (this.state.subDisplay.indexOf('=') >= 0) {
      progress = [];
      this.setState({
        mainDisplay: '3',
        subDisplay: '3',
      });
    } else if (this.state.mainDisplay == '0' && lastSub == '0') {
      this.setState({
        mainDisplay: '3',
        subDisplay: this.state.subDisplay.slice(0, -1) + '3',
      });
    } else if (this.state.mainDisplay == '-0' && lastSub == '0') {
      this.setState({
        mainDisplay: '-3',
        subDisplay: this.state.subDisplay.slice(0, -1) + '3',
      });
    } else if (((lastSub == '+' || lastSub == '-' || lastSub == 'X' || lastSub == '/') 
                && (secondLastSub !== '+' && secondLastSub !== '-' && secondLastSub !== 'X' && secondLastSub !== '/'))
                || this.state.mainDisplay =='0') {
      this.setState({
        mainDisplay: '3',
        subDisplay: this.state.subDisplay + '3',
      });
    } else {
      this.setState({
        mainDisplay: this.state.mainDisplay + '3',
        subDisplay: this.state.subDisplay + '3',
      });
    }
  };

  handleZero() {
    let lastSub = this.state.subDisplay[this.state.subDisplay.length - 1];
    let secondLastSub = this.state.subDisplay[this.state.subDisplay.length - 2];
    // if last pressed was '0', don't allow another '0'
    if (this.state.mainDisplay == '0' && lastSub == '0') {
      return;
    } else if (this.state.subDisplay.indexOf('=') >= 0) {
      progress = [];
      this.setState({
        mainDisplay: '0',
        subDisplay: '0',
      });
    } else if (((lastSub == '+' || lastSub == '-' || lastSub == 'X' || lastSub == '/') 
                && (secondLastSub !== '+' && secondLastSub !== '-' && secondLastSub !== 'X' && secondLastSub !== '/'))
                || this.state.mainDisplay == '0') {
      this.setState({
        mainDisplay: '0',
        subDisplay: this.state.subDisplay + '0',
      });
    } else {
      this.setState({
        mainDisplay: this.state.mainDisplay + '0',
        subDisplay: this.state.subDisplay + '0',
      });
    }
  };

  handleDivide() {
    let lastSub = this.state.subDisplay[this.state.subDisplay.length - 1];
    let secondLastSub = this.state.subDisplay[this.state.subDisplay.length - 2];
    // if last pressed was '/', don't allow another '/'
    if (this.state.mainDisplay == '/') {
      return;
    // if just did calculation 
    } else if (this.state.subDisplay.indexOf('=') >= 0) {
      let ans = progress[0];
      progress.push('/');
      this.setState({
        mainDisplay: '/',
        subDisplay: ans + '/',
      });
    // +-, --, X-, or /- situation
    } else if ((secondLastSub == '+' || secondLastSub == '-' || secondLastSub == "X" || secondLastSub == '/') && lastSub == '-') {
      this.setState({
        mainDisplay: '/',
        subDisplay: this.state.subDisplay.slice(0, -2) + '/',
      });
      progress.pop();
      progress.push('/');
    // replace operator
    } else if (lastSub == '-' || lastSub == 'X' || lastSub == '+') {
      this.setState({
        mainDisplay: '/',
        subDisplay: this.state.subDisplay.slice(0, -1) + '/',
      });
      progress.pop();
      progress.push('/');
    // if above cases don't apply, push to progress array current value in mainDisplay followed by the / operator
    } else {
      progress.push(this.state.mainDisplay);
      progress.push('/');
      this.setState({
        mainDisplay: '/',
        subDisplay: this.state.subDisplay + '/',
      });
    }
  };

  handleMultiply() {
    let lastSub = this.state.subDisplay[this.state.subDisplay.length - 1];
    let secondLastSub = this.state.subDisplay[this.state.subDisplay.length - 2];
    if (this.state.mainDisplay == 'X') {
      return;
    } else if (this.state.subDisplay.indexOf('=') >= 0) {
      let ans = progress[0];
      progress.push('X');
      this.setState({
        mainDisplay: 'X',
        subDisplay: ans + 'X',
      });
    } else if ((secondLastSub == '+' || secondLastSub == '-' || secondLastSub == "X" || secondLastSub == '/') && lastSub == '-') {
      this.setState({
        mainDisplay: 'X',
        subDisplay: this.state.subDisplay.slice(0, -2) + 'X',
      });
      progress.pop();
      progress.push('X');
    } else if (lastSub == '-' || lastSub == '+' || lastSub == '/') {
      this.setState({
        mainDisplay: 'X',
        subDisplay: this.state.subDisplay.slice(0, -1) + 'X',
      });
      progress.pop();
      progress.push('X');
    } else {
      progress.push(this.state.mainDisplay);
      progress.push('X');
      this.setState({
        mainDisplay: 'X',
        subDisplay: this.state.subDisplay + 'X',
      });
    }
  };

  handleSubtract() {
    let lastSub = this.state.subDisplay[this.state.subDisplay.length - 1];
    let secondLastSub = this.state.subDisplay[this.state.subDisplay.length - 2];
    // if +-, --, X-, or /- already entered, don't allow another '-'
    if ((secondLastSub == '+' || secondLastSub == '-' || secondLastSub == 'X' || secondLastSub =='/') && lastSub == '-') {
      return;
    } else if (this.state.subDisplay.indexOf('=') >= 0) {
      let ans = progress[0];
      progress.push('-');
      this.setState({
        mainDisplay: '-',
        subDisplay: ans + '-',
      });
    // +-, --, X-, or /- situation
    } else if (lastSub == '+' || lastSub == '-' || lastSub == 'X' || lastSub =='/') {
      this.setState({
        mainDisplay: '-',
        subDisplay: this.state.subDisplay + '-',
      });
    } else {
      progress.push(this.state.mainDisplay);
      progress.push('-');
      this.setState({
        mainDisplay: '-',
        subDisplay: this.state.subDisplay + '-',
      });
    }
  };

  handleAdd() {
    let lastSub = this.state.subDisplay[this.state.subDisplay.length - 1];
    let secondLastSub = this.state.subDisplay[this.state.subDisplay.length - 2];
    if (this.state.mainDisplay == '+') {
      return;
    } else if (this.state.subDisplay.indexOf('=') >= 0) {
      let ans = progress[0];
      progress.push('+');
      this.setState({
        mainDisplay: '+',
        subDisplay: ans + '+',
      });
    } else if ((secondLastSub == '+' || secondLastSub == '-' || secondLastSub == "X" || secondLastSub == '/') && lastSub == '-') {
      this.setState({
        mainDisplay: '+',
        subDisplay: this.state.subDisplay.slice(0, -2) + '+',
      });
      progress.pop();
      progress.push('+');
    } else if (lastSub == '-' || lastSub == 'X' || lastSub == '/') {
      this.setState({
        mainDisplay: '+',
        subDisplay: this.state.subDisplay.slice(0, -1) + '+',
      });
      progress.pop();
      progress.push('+');
    } else {
      progress.push(this.state.mainDisplay);
      progress.push('+');
      this.setState({
        mainDisplay: '+',
        subDisplay: this.state.subDisplay + '+',
      });
    }
  };

  handleDecimal() {
    let lastSub = this.state.subDisplay[this.state.subDisplay.length - 1];
    if (this.state.subDisplay.indexOf('=') >= 0 || this.state.subDisplay == '') {
      progress = [];
      this.setState({
        mainDisplay: '0.',
        subDisplay: '0.',
      });
    } else if (this.state.mainDisplay.indexOf('.') >= 0) {
      return;
    } else if (lastSub == '+' || lastSub == '-' || lastSub == 'X' || lastSub == '/') {
      this.setState({
        mainDisplay: '0.',
        subDisplay: this.state.subDisplay + '0.',
      });
    } else {
      this.setState({
        mainDisplay: this.state.mainDisplay + '.',
        subDisplay: this.state.subDisplay + '.',
      });
    }
  };

  handleClear() {
    progress = [];
    this.setState({
      mainDisplay: '0',
      subDisplay: '',
    });
  };

  handleEquals() {
    if (this.state.subDisplay.indexOf('=') >= 0) {
      return;
    }
    progress.push(this.state.mainDisplay);
    let result = calculate(progress);
    progress = [];
    progress.push(result);
    this.setState({
      mainDisplay: result,
      subDisplay: this.state.subDisplay + '=' + result,
    });
  };
  
  render() {
    return (
      <div id='calculator-container'>
        <div id='sub-display'>{this.state.subDisplay}</div>
        <div id='main-display'>{this.state.mainDisplay}</div>
        <div id='clear' onClick={this.handleClear}>AC</div>
        <div id='divide' onClick={this.handleDivide}>/</div>
        <div id='seven' onClick={this.handleSeven}>7</div>
        <div id='eight' onClick={this.handleEight}>8</div>
        <div id='nine' onClick={this.handleNine}>9</div>
        <div id='multiply' onClick={this.handleMultiply}>X</div>
        <div id='four' onClick={this.handleFour}>4</div>
        <div id='five' onClick={this.handleFive}>5</div>
        <div id='six' onClick={this.handleSix}>6</div>
        <div id='subtract' onClick={this.handleSubtract}>-</div>
        <div id='one' onClick={this.handleOne}>1</div>
        <div id='two' onClick={this.handleTwo}>2</div>
        <div id='three' onClick={this.handleThree}>3</div>
        <div id='add' onClick={this.handleAdd}>+</div>
        <div id='zero' onClick={this.handleZero}>0</div>
        <div id='decimal' onClick={this.handleDecimal}>.</div>
        <div id='equals' onClick={this.handleEquals}>=</div>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Calculator />);