function validTree(node, min = -Infinity, max = Infinity) {
  if (!node) return true;

  if (node.value >= max || node.value <= min) {
    return false;
  }

  return (
    validTree(node.left, min, node.value) &&
    validTree(node.right, node.value, max)
  );
}

// 假设节点结构
class TreeNode {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

// 构建树
let root = new TreeNode(10);
root.left = new TreeNode(5);
root.right = new TreeNode(15);
root.left.left = new TreeNode(2);
root.left.right = new TreeNode(7);
root.right.left = new TreeNode(12);
root.right.right = new TreeNode(20);

console.log(validTree(root)); // 输出 true，如果树是有序二叉树
