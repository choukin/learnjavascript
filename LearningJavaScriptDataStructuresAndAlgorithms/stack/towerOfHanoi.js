

/**
 * 开天辟地的神勃拉玛（和中国的盘古差不多的神吧）在一个庙里留下了三根金刚石的棒，
 * 第一根上面套着64个圆的金片，最大的一个在底下，其余一个比一个小，依次叠上去，
 * 庙里的众僧不倦地把它们一个个地从这根棒搬到另一根棒上，规定可利用中间的一根棒作为帮助，
 * 但每次只能搬一个，而且大的不能放在小的上面
 * 有三根相邻的柱子，标号为A,B,C，A柱子上从下到上按金字塔状叠放着n个不同大小的圆盘，
 * 要把所有盘子一个一个移动到柱子B上，
 * 并且每次移动同一根柱子上都不能出现大盘子在小盘子上方，
 * 请问至少需要多少次移动，设移动次数为H(n）
 *
 * 首先我们肯定是把上面n-1个盘子移动到柱子C上，然后把最大的一块放在B上，最后把C上的所有盘子移动到B上，由此我们得出表达式：
 * H⑴ = 1
 * H(n) = 2*H(n-1）+1 (n>1）
 * 那么我们很快就能得到H(n）的一般式：
 * H(n) = 2^n - 1 (n>0)
 */
//var Stack = require('./Stack')
/**
 * towerOfHanoi - 递归思路
 * 1.把源栈上面 n-1 个盘子移动到 辅助栈里
 * 2.把源栈里最大的盘子n 移动到 目标盘子里
 * 3.把辅助栈里 n-1 个盘子放到 目标盘子里
 *
 * @param  {type} n      盘子个数
 * @param  {type} from   源栈
 * @param  {type} to     目标栈
 * @param  {type} helper 辅助栈
 * @return {type}        description
 */
function towerOfHanoi (n,from,to,helper){


   if(n > 0){
     // 把from 上的 n-1 个盘子到 helper上
     towerOfHanoi(n-1,from, helper, to)
     // 把from 最大的盘子移动到 目标栈上
     to.push(from.pop())

     i++
     console.log(i+ ' ---------')
     console.log('from: ' + from.toString())
     console.log('to: ' + to.toString())
     console.log('helper: ' + helper.toString())
     console.log( ' ---------')
     console.log('Source: ' + source.toString())
     console.log('Dest: ' + dest.toString())
     console.log('Helper: ' + helper1.toString())
     // 把 helper 上 n-1 个盘子 移动到 目标栈上
     towerOfHanoi(n-1,helper,to,from)
   }



}

var source = new Stack("S")
source.push(4)
source.push(3)
source.push(2)
source.push(1)
var dest = new Stack("D")
var helper1 = new Stack("H")
var i = 0
towerOfHanoi(source.size(), source, dest, helper1)
source.print()
dest.print()
helper1.print()
console.log(i)
