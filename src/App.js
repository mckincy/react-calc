import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    numberStack: [0],
    operStack: [],
    screen:0
  }
  componentDidMount(){
    this.init()
  }
  opMap = { // 定义计算规则
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
    'factorial': function f(n, t = 1) {
      return n < 2 ? t : f(n-1, n*t) //尾递归与箭头函数无法共用
    },
    'clear': () => 0,
  }
  pushNumberStack = (val) => {
    if (this.state.operStack.length) { //如果有计算操作符，则数字压栈，然后计算
      let numberStack = [this.state.numberStack[this.state.numberStack.length - 1], val]
      this.setState({
        numberStack: numberStack,
        screen: numberStack[numberStack.length - 1]
      })
      this.compute()
    } else{
      let numberStack = [this.state.numberStack[0] * 10 + val]
      this.setState({
        numberStack: numberStack,
        screen: numberStack[0]
      })
    }
  }
  pushOperStack = (val) => {
    let operStack = [val]
    this.setState({
      operStack: operStack
    })
    switch(val)
    {
      case 'clear':
        this.compute() //立即计算
        break;
      case 'factorial':
        this.compute() //立即计算
        break;
      default:
        this.setState({
          operStack: operStack
        })
        break;
    }
  }
  compute = () => {
    let op = this.opMap[this.state.operStack.pop()] //按缓存计算符生成计算函数
    let result = op.call(this, ...this.state.numberStack) //生成计算结果
    // let result = op(...this.state.numberStack) 
    this.setState({
      numberStack:[result], //原始js是置零清空栈
      screen: result
    })
  }
  init = () => {
    document.querySelectorAll('input').forEach((e) => { // 循环绑定事件
      e.addEventListener('click', function (e) {
        console.log(this, e.target.value)
        //正则匹配数字
        const reg = /^([\d]+(\.)?[\d]*)?$/
        reg.test(e.target.value) ? this.pushNumberStack(parseFloat(e.target.value)) : this.pushOperStack(
          e.target.value)
      }.bind(this)) //为回调函数绑定this,指向App component
    })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">A calc powered by react</h1>
        </header>
        <p className="result" style={{'background': '#f3f3f3','padding': '5px'}}>
          {this.state.screen}
        </p>
        <div className="number">
          <input type="button" value="0" />
          <input type="button" value="1" />
          <input type="button" value="2" />
          <input type="button" value="3" />
          <input type="button" value="4" />
          <input type="button" value="5" />
          <input type="button" value="6" />
          <input type="button" value="7" />
          <input type="button" value="8" />
          <input type="button" value="9" />
        </div>
        <div className="compute">
          <input type="button" value="+" />
          <input type="button" value="-" />
          <input type="button" value="*" />
          <input type="button" value="/" />
          <input type="button" value="factorial" />
        </div>
        <div className="control">
          <input type="button" value="clear" />
        </div>
      </div>
    );
  }
}

export default App;
