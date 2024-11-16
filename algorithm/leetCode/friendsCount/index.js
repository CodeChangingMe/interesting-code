function friendsCount(friends) {
  const length = friends.length;
  let count = 0;
  let visited = new Set();

  const dfs = (i) => {
    for (let j = 0; j < length; j++) {
      if (!visited.has(j) && friends[i][j] === 1) {
        visited.add(j);
        dfs(j);
      }
    }
  };

  for (let i = 0; i < length; i++) {
    if (!visited.has(i)) {
      count++;
      visited.add(i);
      dfs(i);
    }
  }

  return count;
}

const friends = [
  [1, 0, 0, 1],
  [0, 1, 1, 0],
  [0, 1, 1, 1],
  [1, 0, 1, 1],
];

console.log(friendsCount(friends)); // 输出 2
