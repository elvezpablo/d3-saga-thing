import { TreeNode, ITreeNode } from "./treeNode";

enum SPACING {
  LEFT_PADDING = 3,
}

// https://www.digitalocean.com/community/tutorials/js-tree-traversal
// https://github.com/zchtodd/recurser/blob/master/static/recurser.js

function initialY(node: ITreeNode) {
  const { children, y, prevSibling } = node;
  const { LEFT_PADDING } = SPACING;

  for (let i = 0; i < children.length; i++) {
    initialY(children[i]);
  }

  node.y = prevSibling ? prevSibling.y + LEFT_PADDING : 0;

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
}

function calculateFinalValues(node, modSum) {
  node.finalY = node.y + modSum;
  for (let i = 0; i < node.children.length; i++) {
    calculateFinalValues(node.children[i], node.modifier + modSum);
  }
}

function getContour(root, val, func) {
  let nodes = [root];
  while (nodes.length) {
    let node = nodes.shift();
    nodes = nodes.concat(node.children);
    val = func(val, node.finalY);
  }
  return val;
}

function shiftDown(root, shiftValue) {
  let nodes = [root];
  while (nodes.length) {
    let node = nodes.shift();
    nodes = nodes.concat(node.children);
    node.finalY += shiftValue;
  }
}

function fixNodeConflicts(root) {
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

function buildTree(dataNode, parent, prevSibling, level) {
  let root = new Node(level, 0, parent, prevSibling, dataNode);
  for (let i = 0; i < dataNode.children.length; i++) {
    root.children.push(
      buildTree(
        dataNode.children[i],
        root,
        i >= 1 ? root.children[i - 1] : null,
        level + 1
      )
    );
  }
  return root;
}

function updateYVals(root) {
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

function getDimensions(root) {
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
