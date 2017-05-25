var Stack = require('./Stack')
var Stack = require('./Stack')
 // 在被除数小于除数的情况下 商0余数为被除数
 //
 /**
  * divideBy2 - 十进制转换成二进制
  *
  * @param  {Number} decNumber 十进制
  * @return {String}           二进制字符串
  */

function divideBy2(decNumber){
  var remStack = new Stack ()
  var rem ;
  var binaryString = '';
  while ( decNumber >0 ){
    // javascript 有数字类型但是不区分整数和浮点数，通过floor强制使用整数
    rem = Math.floor( decNumber % 2 )
    remStack.push(rem)
    decNumber = Math.floor(decNumber / 2 )
  }

  while( ! remStack.isEmpty() ){
    binaryString += remStack.pop().toString()
  }

  return binaryString

}

console.log(divideBy2(4))
console.log(divideBy2(51))
