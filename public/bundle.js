
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
import 'd3';

const character = () => {
  console.log("Egiller");
};

const func = () => {
  console.log("awe yeah");
  character();
};

func();

console.log("dud");
