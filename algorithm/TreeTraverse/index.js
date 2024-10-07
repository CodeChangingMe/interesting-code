function dfs(node) {
  if (!node) {
    return;
  }

  console.log(node.value);

  dfs(node.left);
  dfs(node.right);
}

function bfs(root) {
  const queue = [];
  queue.push(root);
  while (queue.length > 0) {
    const curNode = queue.shift();
    console.log(curNode);
    if (node.left) {
      queue.push(node.left);
    }
    if (node.right) {
      queue.push(node.right);
    }
  }
}
