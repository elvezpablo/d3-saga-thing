class TreeNode<ITreeNode> {
  x = 0;
  y = 0;
  finalY = 0;
  modifier = 0;
  parent?;
  prevSibling?;
  children = [];
  data;
  collapse = false;

  constructor(x, y, parent, prevSibling, data) {
    this.x = x;
    this.y = y;

    this.parent = parent;
    this.prevSibling = prevSibling;

    this.data = data;
  }
}

interface ITreeNode {
  x: number;
  y: number;
  finalY: number;
  mod: number;
  parent: ITreeNode;
  prevSibling: ITreeNode;
  children: ITreeNode[];
  dataNode: any | undefined;
  collapse: boolean;
}

export { ITreeNode, TreeNode };
