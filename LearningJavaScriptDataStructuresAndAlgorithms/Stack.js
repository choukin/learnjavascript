 /**
  * Stack - 使用Array 模拟栈
  * 栈的特点：
  * 1.栈是一种遵循后进先出（LIFO）原则的有序集合
  * 2.新添加和待删除的元素都在栈的末尾，称作栈顶
  * 3.另一端叫做栈底
  * 4.在栈里新元素都靠近栈顶，旧元素都靠近栈底
  * @return {type}  description
  */
function stack (){
  var items = []
  /**
  * 添加一个新元素到到栈顶
  */
  this.push = function (element) {
    items.push(element)
  }

 /**
 * 移除栈顶元素并返回它的值
 */
  this.pop = function () {
    return items.pop()
  }
  /**
  * 返回栈顶元素
  */
  this.peek = function () {
    return items[items.length -1 ]
  }


  /**
   * anonymous function - 判断栈是否为空
   *
   * @return {Boolean}  栈空时返回 true 否则返回 false
   */
  this.isEmpty = function () {
    return items.length == 0
  }


  /**
   * anonymous function - 获取栈内元素的数量
   *
   * @return {type}  description
   */
  this.size = function () {
    return items.length
  }

  /**
   * anonymous function - 清空栈
   *
   * @return {type}  description
   */
  this.clear = function () {
    items = []
  }

  /**
   * anonymous function - 查看栈内元素
   *
   * @return {undefined}
   */
  this.print = function () {
    conosle.log(items.toString()
  }
}
