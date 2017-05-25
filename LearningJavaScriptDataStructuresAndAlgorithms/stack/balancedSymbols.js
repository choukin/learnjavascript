var Stack = require('./Stack')

function parentthesesChecker(symbols) {
  let stack = new Stack()
  let balanced = true
  let  index = 0
  let symbol, top, opens = "([{", closers = '}])';

  while(index < symbols.length && balanced){
    symbol = symbols[index]
    if (opens.indexOf(symbol) >= 0 ){
      // 如果是开始 括号 就放入栈内
      stack.push(symbol)
      console.log(`open symbol - stacking ${symbol}`)
    }else{
      //如果是结束括号
      // 1.如果栈内为空 则不平衡
      // 2. 如果栈顶括号 和当前括号字符不匹配 则不平衡
      console.log(`close symbol ${symbol}`)
      if(stack.isEmpty()){
        balanced = false
        console.log(`Stack is empty, no more symbols to pop and compare`)
      } else {
        top = stack.pop()
        if(! opens.indexOf(top) === closers.indexOf(symbol)) {
          balanced = false
          console.log(`poping symbol ${top} - is not a match compared to ${symbol}`)
        } else {
          console.log(`poping symbol ${top} - is a match compared to ${symbol}`)
        }
      }
    }
    index++;
  }
  if(balanced && stack.isEmpty()){
    return true
  }
  return false
}

console.log(parentthesesChecker('([{}])')) //  true
console.log(parentthesesChecker('{[([{}])][()]}')) // true
console.log(parentthesesChecker('{[([])][()]}')) // fasle
