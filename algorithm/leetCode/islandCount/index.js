function islandCount(grid) {
  let n = grid.length;
  let m = grid[0].length;
  let count = 0;

  const dfs = (left, right) => {
    if (left < 0 || left >= n || right < 0 || right >= m) return;

    if (grid[left][right] !== 1) return;

    grid[left][right] = 2;

    dfs(left - 1, right);
    dfs(left, right - 1);
    dfs(left, right + 1);
    dfs(left + 1, right);
  };

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (grid[i][j] === 1) {
        dfs(i, j);
        count++;
      }
    }
  }

  return count;
}

const land = [
  [1, 0, 0, 1],
  [0, 1, 1, 0],
  [0, 1, 1, 1],
  [1, 0, 1, 1],
];

console.log(islandCount(land)); // 输出 2
