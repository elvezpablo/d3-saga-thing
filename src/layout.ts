import { TreeNode, ITreeNode } from "./treeNode";

enum SPACING {
  SIBLING_PADDING = 3,
}

// http://cs.brown.edu/people/rtamassi/gdhandbook/chapters/trees.pdf
// https://www.digitalocean.com/community/tutorials/js-tree-traversal
// https://github.com/zchtodd/recurser/blob/master/static/recurser.js

/**
 * Sets the initial y position note this is a horizontoal tree 
 * so siblings are spread on the y axis.
 * 
 * @param node 
 */
export function calculateInitialValues(node: ITreeNode) {
  const { children, y, prevSibling, data } = node;
  const { SIBLING_PADDING } = SPACING;

  // post order traversal
  // https://www.digitalocean.com/community/tutorials/js-tree-traversal
  for (let i = 0; i < children.length; i++) {
    calculateInitialValues(children[i]);
  }

  node.y = prevSibling ? prevSibling.y + SIBLING_PADDING : 0;

  if (children.length == 1) {
    node.mod = y;
  } else if (children.length >= 2) {
    let minY = Infinity;
    let maxY = -minY;
    for (let i = 0; i < children.length; i++) {
      minY = Math.min(minY, children[i].y);
      maxY = Math.max(maxY, children[i].y);
    }

    node.mod = y - (maxY - minY) / 2;

  }
  // console.log(`${data.name} y: ${node.y} mod: ${node.mod}`)
}

export function calculateFinalValues(node, modSum) {
  node.finalY = node.y + modSum;
  for (let i = 0; i < node.children.length; i++) {
    calculateFinalValues(node.children[i], node.modifier + modSum);
  }
}
// https://llimllib.github.io/pymag-trees/
/**
 * Finds the most extreme position of the parent and it's children.
 * Is used to find the max and min Y positions. 
 * 
 * Should be generalized to work for X positions
 * 
 * @param root 
 * @param val 
 * @param func 
 */
export function getContour(node: ITreeNode, outerLimit: number, findLimit: (...values: number[]) => number) {
  // get the parent Y use it if it outside the children values
  let contour = findLimit(outerLimit, node.finalY);

  node.children.forEach(c => {
    // get the children Y
    contour = findLimit(contour, c.finalY)
  })
  return contour;
  // let nodes = [root];
  // while (nodes.length) {
  //   let node = nodes.shift();
  //   nodes = nodes.concat(node.children);

  //   val = func(val, node.finalY);
  // }
  // return val;
}

export function shiftDown(node: ITreeNode, shiftValue: number) {
  node.finalY += shiftValue;
  node.children.forEach(c => c.finalY += shiftValue);
  // let nodes = [root];
  // while (nodes.length) {
  //   let node = nodes.shift();
  //   nodes = nodes.concat(node.children);
  //   node.finalY += shiftValue;
  // }
}

export function fixNodeConflicts(root) {
  for (let i = 0; i < root.children.length; i++) {
    fixNodeConflicts(root.children[i]);
  }

  for (let i = 0; i < root.children.length - 1; i++) {
    // Get the bottom-most contour position of the current node
    let botContour = getContour(root.children[i], -Infinity, Math.max);

    // Get the topmost contour position of the node underneath the current one
    let topContour = getContour(root.children[i + 1], Infinity, Math.min);

    if (botContour >= topContour) {
      shiftDown(root.children[i + 1], botContour - topContour + 3);
    }
  }
}

export function buildTree(dataNode: any, level: number, parent?: ITreeNode, prevSibling?: ITreeNode) {
  let root = new TreeNode(level, 0, parent, prevSibling, dataNode);
  if (dataNode.children) {
    for (let i = 0; i < dataNode.children.length; i++) {
      root.children.push(
        buildTree(
          dataNode.children[i],
          level++,
          root,
          i >= 1 ? root.children[i - 1] : null,
        )
      );
    }
  }

  return root;
}

export function updateYVals(root) {
  let minYVal = Infinity;
  let nodes = [root];
  while (nodes.length) {
    let node = nodes.shift();
    nodes = nodes.concat(node.children);
    if (node.finalY < minYVal) {
      minYVal = node.finalY;
    }
  }

  nodes = [root];
  while (nodes.length) {
    let node = nodes.shift();
    nodes = nodes.concat(node.children);
    node.finalY += Math.abs(minYVal);
  }
}

export function getDimensions(root) {
  let minWidth = Infinity;
  let maxWidth = -minWidth;

  let minHeight = Infinity;
  let maxHeight = -minWidth;

  let nodes = [root];
  while (nodes.length) {
    let node = nodes.shift();
    nodes = nodes.concat(node.children);

    if (node.x < minWidth) {
      minWidth = node.x;
    }

    if (node.x > maxWidth) {
      maxWidth = node.x;
    }

    if (node.finalY < minHeight) {
      minHeight = node.finalY;
    }

    if (node.finalY > maxHeight) {
      maxHeight = node.finalY;
    }
  }
  return [maxWidth - minWidth, maxHeight - minHeight];
}
