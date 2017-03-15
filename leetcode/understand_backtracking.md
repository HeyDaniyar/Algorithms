# 理解回溯

> 最近在刷leetcode的过程中，发现自己看到回溯，递归，穷举的题就各种发蒙，即使脑子里有思路也不能正确写出程序。所以，特地对回溯方面的题型进行了一个集中的练习和反思，希望这些反思能够让自己加深记忆，也帮助到和我一样对回溯初期不太理解的同学。

## 回溯的定义
回溯的英文定义是backtracking，初期估计很多人像我一样把回溯，递归，dfs,穷举这些概念辨别不清。在网上搜集概念时，看到有人总结的特别好：

>用爬山来比喻回溯，好比从山脚下找一条爬上山顶的路,起初有好几条道可走,当选择一条道走到某处时,又有几条岔道可供选择,只能选择其中一条道往前走,若能这样子顺利爬上山顶则罢了,否则走到一条绝路上时,只好返回到最近的一个路口,重新选择另一条没走过的道往前走。如果该路口的所有路都走不通,只得从该路口继续回返。照此规则走下去,要么找到一条到达山顶的路,要么最终试过所有可能的道,无法到达山顶。
回溯是一种穷举，但与brute force有一些区别，回溯带了两点脑子的，并不多，brute force一点也没带。
第一点脑子是回溯知道回头；相反如果是brute force,发现走不通立刻跳下山摔死，换第二条命从头换一条路走。
第二点脑子是回溯知道剪枝；如果有一条岔路上放了一坨屎，那这条路我们不走，就可以少走很多不必要走的路。

上述形象的定义将回溯解释的非常明了，如果再和其他概念进行比较的话，回溯的概念更显而易见：

- 回溯是一种找路方法，搜索的时候走不通就回头换路接着走，直到走通了或者发现此山根本不通

- DFS是一种开路策略，就是一条道先走到头，再往回走一步换一条路走到头，这也是回溯用到的策略。在树和图上回溯时人们叫它DFS。

- 递归是一种行为，回溯和递归如出一辙，都是一言不合就回到来时的路，所以一般回溯用递归实现。


## 回溯规律


一般在leetcode里碰到的有几种解，列出某种变换的所有可能值，是否有值的问题基本都可以用回溯去解决。理解回溯的最好方式是首先将函数运行逻辑用树的形式来表示。

首先我们需要从问题的根入手，再用特定的方法去分析他每一个枝叶，如果遇到的枝叶不是想要的结果，那我们再返回他的根然后去进行下一个枝叶的判断。我们可以用一个简单的例子去尝试：

<div style="text-align: center; margin-bottom: 40px">
<img src="https://www.cis.upenn.edu/~matuszek/cit594-2012/Pages/backtracking_files/treesearch.gif"/>
</div>

上面的这个例子中获取所有好的枝叶的解的逻辑如下：
- Starting at Root, your options are A and B. You choose A.
- At A, your options are C and D. You choose C.
- C is bad. Go back to A.
- At A, you have already tried C, and it failed. Try D.
- D is bad. Go back to A.
- At A, you have no options left to try. Go back to Root.
- At Root, you have already tried A. Try B.
- At B, your options are E and F. Try E.
- E is good. Congratulations!


如果现实中问题中我们很难将问题用树去抽象，我们可以用下面这个更直接的回溯算法来表示：

``` js
boolean solve(Node n) {
    if n is a leaf node {
        if the leaf is a goal node, return true
        else return false
    } else {
        for each child c of n {
            if solve(c) succeeds, return true
        }
        return false
    }
}
```

上面这个是对是否有满足条件的值的逻辑代码，如果换算成列举所有可能值的问题，那代码就要做一些改进，往往这种列举所有解的题目都是返回一个`arrayList`，所以我们可以定义一个`array`叫`temp`，来保存当前的临时解，定义另一个`arrayList`叫`result`在添加所有满足条件的值，
所以代码就变成了这样：(用了伪js代码)


``` js
function backtrack(temp, result, Node) {
    // 将满足条件的临时结果保存到result中
    if (tmp is the qualified) {
        result.push(tmp);
    } else {
        for each child c of Node {
          //对枝叶进行修剪
           if(c is not Qualifed child) continue;
             temp.push(c);
             backtrack(temp, result, Node)
             temp.pop();
        }
    }
}
```
上述js伪代码是我在做题中总觉出的最有规律性的一段代码，leetcode上大概有10几道同样类型的题，都可以用上述算法来解决。我们稍后会选取特定的例子进行分析。

## 回溯减枝
从我做题的规律中发现，回溯问题大体上都是思想相同，但是遍历的方式五花八样，对于每一个不同的结果，我们需要用不同的剪枝方式来满足题目的具体要求。总的来说，修建枝叶的方式有三种：

-  第一种是对回溯函数内的for循环做限定，我们可以从for循环的起点入手，根据题目的要求(例如可以重复或者不可以重复)，我们需要设定每次循环的起点，如果是可以重复，那一般起点每次都是Node的第一个元素，如果不能重复，那我们可以将上次进行到的位置当做函数参数传递下去，让函数从特定的位置开始遍历。（举例：[leetcode39](./39_combination-sum_leetcode.md), [leetcode40](./40_combination-sum-ii_leetcode.md))

- 第二种是对循环到的每一个元素，我们可以进行一次isQualifed的函数判断，如果判定再进行temp的入栈操作。(举例：[leetcode40](./40_combination-sum-ii_leetcode.md) )

- 第三种是对回溯函数的最早执行阶段，除了判断temp是否满足进入result的要求外，我们还可以反向判断是否这个temp不可能再满足result，如果不再满足条件，我们就可以终止当前循环，让回溯返回父节点重新开始。（举例：[leetcode140](./140_word-break-ii_leetcode.md) )


## 回溯八皇后

八皇后是属于比较综合的回溯问题，各种剪枝的条件比较繁琐。所以通过理解这个类型的回溯，可以说能对回溯的思想有更深的理解。
首先，让我们来看第一种八皇后的问题，即列出所有满足条件的值。
按照我们的
