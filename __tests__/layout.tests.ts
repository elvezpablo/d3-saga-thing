import { ITreeNode, TreeNode } from "../src/treeNode";
import {buildTree} from "../src/layout"
// https://www.digitalocean.com/community/tutorials/js-tree-traversal
import simple from "./data/simple.json";

// need to traverse in post order
test("buildTree", () => {
  let root = buildTree(simple, null, null, 0);
  console.log(root);
  expect(true).toBe(true);
});
