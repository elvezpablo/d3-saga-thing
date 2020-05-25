
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
const character = () => {
  console.log("Egiller");
};

var name = "grandparent";
var children = [
	{
		name: "parentA",
		children: [
			{
				name: "childA1"
			},
			{
				name: "childA2"
			},
			{
				name: "childA3"
			}
		]
	},
	{
		name: "parentB",
		children: [
		]
	},
	{
		name: "parentC",
		children: [
			{
				name: "childC1"
			},
			{
				name: "childC2"
			}
		]
	}
];
var simple = {
	name: name,
	children: children
};

// import { html } from "d3";

const func = () => {
  console.log("awe yeassddh!");
  character();
  console.log(simple);
};

func();

console.log("dud");
