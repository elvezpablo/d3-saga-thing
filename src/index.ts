import { character } from "./character";
import { buildTree } from "./layout";
import { ITreeNode } from "./treeNode"
import { select, svg, range, scaleSequential, max, interpolateBrBG } from "d3";
import simple from "./data/simple.json";
const RADIUS = 10;

const build = () => {
  const tree = buildTree(simple, 0, null, null);
  console.log(tree);

  draw(tree);
};

type d3Node = {
  x: number,
  y: number
}
const convertPostOrder = (tree: ITreeNode, linear: d3Node[]) => {
  if (tree.children) {
    tree.children.forEach(c => {
      convertPostOrder(c, linear);
    })
  }
  const { x, finalY } = tree;
  linear.push({ x, y: finalY })
};

const draw = (tree) => {
  const margin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 50,
  };

  const data: d3Node[] = [];
  convertPostOrder(tree, data);
  const color = scaleSequential(interpolateBrBG).domain([0, max(data, d => d.x)]);
  console.log(max(data, d => d.x));
  console.log(color(2));


  const svg = select("#sketch");

  const circles = svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle");

  circles
    .attr("cx", d => d.x * 100 + margin.left)
    .attr("cy", d => d.y + margin.top)
    .attr("r", RADIUS)
    .style("fill", d => color(d.x));
}

const drawBG = () => {
  const svg = select("#sketch");
  console.log(svg.style("width"));
  const bounds = {
    width: parseFloat(svg.style("width")),
    height: parseFloat(svg.style("height"))
  };
  // selecting in D3 
  // https://bost.ocks.org/mike/selection/
  const lines = svg
    .selectAll("line")
    .data(range(100, bounds.width, 100))
    .enter()
    .append("line");

  lines
    .attr("x1", d => d)
    .attr("y1", 0)
    .attr("x2", d => d)
    .attr("y2", bounds.height)
    .attr("stroke", "white")
    .attr("stroke-width", 1)

};


const setUp = () => {
  drawBG();
  // <button id="btn-build" > build < /button>
  // < button id = "btn-draw" > draw < /button>
  // < button id = "btn-initial" > initial < /button>
  // < button id = "btn-final" > final < /button>
  build();
  select("#btn-build").on("click", () => {

  })
}

setUp();
