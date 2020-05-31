interface ITreeNode {
  x: number;
  y: number;
  finalY: number;
  mod: number;
  parent?: ITreeNode;
  prevSibling?: ITreeNode;
  children?: ITreeNode[];
  data?: any | undefined;
  collapse: boolean;
}

class TreeNode implements ITreeNode {
  x = 0;
  y = 0;
  finalY = 0;
  modifier = 0;
  parent?: ITreeNode;
  prevSibling?: ITreeNode;
  mod = 0;
  children?: ITreeNode[] = [];
  data?: Object;
  collapse = false;

  constructor(x: number, y: number, parent?: ITreeNode, prevSibling?: ITreeNode, data?: any) {
    this.x = x;
    this.y = y;

    this.parent = parent;
    this.prevSibling = prevSibling;

    this.data = data.name;
  }
}



export { ITreeNode, TreeNode };
