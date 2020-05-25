import { ITreeNode, TreeNode } from "../src/treeNode";
import {
  buildTree,
  calculateInitialValues,
  calculateFinalValues,
  updateYVals,
  fixNodeConflicts,
  getContour,
  shiftDown
} from "../src/layout"

import simple from "./data/simple.json";

// need to traverse in post order
test("buildTree", () => {
  let root = buildTree(simple, 0, null, null);
  // console.log(root.children[0]);  
  expect(root.children.length).toBe(3);
  expect(root.children[0].data.name).toBe("parentA")
  expect(root.children[0].children[0].data.name).toBe("childA1")
  expect(root.children[2].children[0].data.name).toBe("childC1")
});

test("calculateInitialValues", () => {
  let root = buildTree(simple, 0, null, null);
  calculateInitialValues(root);
  expect(root.y).toBe(0);
  expect(root).toMatchSnapshot();
});

test("calculateFinalValues", () => {
  let root = buildTree(simple, 0, null, null);
  calculateFinalValues(root, 0);
  expect(root).toMatchSnapshot();
});

test("getContour", () => {
  const root = new TreeNode(0, 0, null, null, { name: "root" });
  root.finalY = 20;
  const prevSib = new TreeNode(0, 0, root, null, { name: "prev" });
  prevSib.finalY = 10;
  root.children.push(prevSib);
  const nextSib = new TreeNode(0, 0, root, prevSib, { name: "next" });
  nextSib.finalY = 20;
  root.children.push(nextSib);
  const lastSib = new TreeNode(0, 0, root, nextSib, { name: "last" })
  lastSib.finalY = 30;
  root.children.push(lastSib);

  // Get the bottom-most contour position of the current node
  const bottom = getContour(root, Number.MIN_VALUE, Math.max);
  expect(bottom).toBe(30);
  const top = getContour(root, Number.MAX_VALUE, Math.min);
  expect(top).toBe(10);
  root.finalY = 5;
  const newTop = getContour(root, Number.MAX_VALUE, Math.min);

  expect(newTop).toBe(5);
})

test("fixNodeConflicts", () => {
  let root = buildTree(simple, 0, null, null);
  calculateInitialValues(root);
  calculateFinalValues(root, 0);
  updateYVals(root);
  fixNodeConflicts(root);
  expect(root).toMatchSnapshot();
});

test("shiftDown", () => {
  const root = new TreeNode(0, 0, null, null, { name: "root" });
  root.finalY = 20;
  const prevSib = new TreeNode(0, 0, root, null, { name: "prev" });
  prevSib.finalY = 10;
  root.children.push(prevSib);
  const nextSib = new TreeNode(0, 0, root, prevSib, { name: "next" });
  nextSib.finalY = 20;
  root.children.push(nextSib);
  const lastSib = new TreeNode(0, 0, root, nextSib, { name: "last" })
  lastSib.finalY = 30;
  root.children.push(lastSib);

  shiftDown(root, 10);

  expect(root.finalY).toBe(30);
  expect(prevSib.finalY).toBe(20);
  expect(nextSib.finalY).toBe(30);

})