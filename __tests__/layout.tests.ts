import { ITreeNode, TreeNode } from "../src/treeNode";
// https://www.digitalocean.com/community/tutorials/js-tree-traversal
const simple = [
  {
    name: "grandparent",
    children: [
      {
        name: "parentA",
        children: [
          { name: "childA1" },
          { name: "childA2" },
          { name: "childA3" },
        ],
      },

      { name: "parentB" },
      {
        name: "parentC",
        children: [{ name: "childC1" }, { name: "childC2" }],
      },
    ],
  },
];
// need to traverse in post order
test("initialY", () => {});
