// 总共有  n  个格子，青蛙可以选择跳 1 个格子、2 个格子或 3 个格子，但 下一步不能和当前选择的跳跃距离一样。求有多少种跳跃方案到达终点。

/*
定义  dp[i][j]  为到达第  i  个格子并且最后一步跳了  j  个格子的总方案数，其中  j  可以是 1、2 或 3。

dp[i][1] = dp[i-1][2] + dp[i-1][3]


dp[i][2] = dp[i-2][1] + dp[i-2][3]


dp[i][3] = dp[i-3][1] + dp[i-3][2]

*/

function jumpHouse(n) {
  const dp = Array.from(new Array(n + 1), () => [0, 0, 0, 0]);

  dp[1] = [0, 1, 0, 0];
  dp[2] = [0, 0, 1, 0];
  dp[3] = [0, 1, 1, 1];
  for (let i = 4; i <= n; i++) {
    if (i >= 1) {
      dp[i][1] = dp[i - 1][2] + dp[i - 1][3];
    }
    if (i >= 2) {
      dp[i][2] = dp[i - 2][1] + dp[i - 2][3];
    }
    if (i >= 3) {
      dp[i][3] = dp[i - 3][1] + dp[i - 3][2];
    }
  }

  return dp[n][1] + dp[n][2] + dp[n][3];
}

console.log(jumpHouse(4));
console.log(jumpHouse(5));
