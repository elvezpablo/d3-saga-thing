import { select } from "d3";

const RADIUS = 10;

const character = () => {
  console.log("Egiller");
};

const draw = () => {
  const data = [
    { "x_axis": 30, "y_axis": 30, "radius": 20, "color": "green" },
    { "x_axis": 70, "y_axis": 70, "radius": 20, "color": "purple" },
    { "x_axis": 110, "y_axis": 100, "radius": 20, "color": "red" }
  ]
  const svg = select("#sketch");
  const circles = svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle");

  circles
    .attr("cx", function (d) { return d.x_axis; })
    .attr("cy", function (d) { return d.y_axis; })
    .attr("r", RADIUS)
    .style("fill", function (d) { return d.color; });
}

draw();

export { character };
