var Stack = require('./Stack')

/**
 * baseConverter - 把十进制树转换成任意进制
 *
 * @param  {Number} decNumber 要转的目标十进制数
 * @param  {Number} base      要转换的进制单位
 * @return {String}           目标进制表示的字符串
 */
function baseConverter(decNumber, base) {
  var remStack = new Stack()
  var rem
  var baseString = ""
  var digits = '0123456789ABCDEF'

  while (decNumber > 0 ){
    rem = Math.floor(decNumber % base )
    remStack.push(rem)
    decNumber = Math.floor( decNumber / base )
  }

  while(!remStack.isEmpty()){
    baseString += digits[remStack.pop()]
  }

  return baseString;
}

console.log(baseConverter(17,10))
console.log(baseConverter(17,2))
console.log(baseConverter(17,8))
console.log(baseConverter(17,16))
console.log(baseConverter(15,16))
console.log(baseConverter(24,16))
