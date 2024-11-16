/**
 * 
给你一个只包含 '(' 和 ')' 的字符串，找出最长有效（格式正确且连续）括号
子串
的长度。

 

示例 1：

输入：s = "(()"
输出：2
解释：最长有效括号子串是 "()"
示例 2：

输入：s = ")()())"
输出：4
解释：最长有效括号子串是 "()()"
示例 3：

输入：s = ""
输出：0
 

提示：

0 <= s.length <= 3 * 104
s[i] 为 '(' 或 ')'
 */

function findMaxLengthSubString(str) {
  let maxLength = 0; // 最大长度
  let curLength = 0; // 当前子串匹配的长度
  let leftStack = [];

  for (let i = 0; i < str.length; i++) {
    const cur = str[i];
    if (cur === "(") {
      leftStack.push(cur);
      if (curLength > 0) {
        maxLength = maxLength > curLength ? maxLength : curLength;
        curLength = 0;
      }
    } else {
      if (leftStack.length > 0) {
        leftStack.pop();
        curLength += 2;
      } else {
        continue;
      }
    }
  }

  return maxLength > curLength ? maxLength : curLength;
}

findMaxLengthSubString("(()()");
