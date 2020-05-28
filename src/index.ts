import { character } from "./character";
import { buildTree, calculateInitialValues } from "./layout";
import { ITreeNode } from "./treeNode"
import { select, svg, range, scaleSequential, max, interpolateBrBG } from "d3";
import simple from "./data/simple.json";
const RADIUS = 10;



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
  const { x, y } = tree;

  linear.push({ x, y })
};

const draw = (tree, first) => {
  const margin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 50,
  };

  const data: d3Node[] = [];
  convertPostOrder(tree, data);
  const color = scaleSequential(interpolateBrBG).domain([0, max(data, d => d.x)]);

  const svg = select("#sketch");
  let circles;
  if (first) {
    circles = svg.selectAll("circle").data(data).enter().append("circle")
  } else {
    circles = svg.selectAll("circle").data(data);
  }

  console.log(data);

  circles
    .transition()
    .duration(first ? 0 : 500)
    .attr("cx", d => d.x * 100 + margin.left)
    .attr("cy", d => d.y * 10 + margin.top)
    .attr("r", RADIUS)
    .style("fill", d => color(d.x));

  circles.exit().remove();

}

const drawBG = () => {
  const svg = select("#sketch");
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

  lines.exit().remove();
};

const build = (first) => {
  const tree = buildTree(simple, 0, null, null);
  draw(tree, first);
};

const initial = () => {
  const tree = buildTree(simple, 0, null, null);
  calculateInitialValues(tree);
  draw(tree, false);
}

const final = () => {
  draw([], false);
}

const setUp = () => {
  drawBG();
  build(true);

  select("#btn-build").on("click", () => {
    build(false);
  });
  select("#btn-initial").on("click", () => {
    initial();
  });
  select("#btn-final").on("click", () => {
    final()
  });
}

setUp();
