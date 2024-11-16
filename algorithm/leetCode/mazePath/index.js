function shortPath(start, end, maze) {
  const row = maze.length;
  const col = maze[0].length;

  const visited = Array.from(new Array(row), () => new Array(col).fill(0));

  let allPath = [];
  let res = [];
  const dfs = (curPosition) => {
    const [x, y] = curPosition;
    res.push(curPosition);

    if (x === end[0] && y === end[1]) {
      allPath.push([...res]);
      return;
    }

    if (x < 0 || x >= row || y < 0 || y >= col || visited[x][y]) {
      res.pop(curPosition);
      return;
    }

    visited[x][y] = 1;

    if (maze[x][y]) {
      res.pop(curPosition);
      return;
    }

    dfs([x + 1, y]);
    dfs([x, y + 1]);
    dfs([x - 1, y]);
    dfs([x, y - 1]);
  };

  dfs(start);
  console.log(allPath);
}

function createMaze(row, col, walls) {
  const maze = Array.from(new Array(row), () => new Array(col).fill(0));
  walls.forEach(([x, y]) => {
    maze[x][y] = 1;
  });
  return maze;
}

const walls = [
  [0, 1],
  [1, 1],
  [2, 1],
  [3, 1],
  [1, 3],
  [2, 3],
  [3, 3],
  // [3, 4],
  // [4, 3],
];
const maze = createMaze(5, 5, walls);
const start = [0, 0];
const end = [4, 4];
console.log("maze", maze);
shortPath(start, end, maze);
