//html setup
var itemsHTMLCollection = document.getElementsByClassName('parallax-item');
var itemsArray = Array.from(itemsHTMLCollection);
 
//Input Setup
var input = {
  mouseX:{
    start: 0,
    end: window.innerWidth,
    current: 0,
  }
};
 
input.mouseX.range = input.mouseX.end - input.mouseX.start;
 
//Output Setup
var output = {
  x: {
    start: -150,
    end: 150,
    current: 0,
  },
  zIndex: {
    range: 10000
  },
  scale: {
    start: 1,
    end: 0.5,
  },
  blur: {
    startingDepth: .5,
    range: 10
  }
};
 
output.scale.range = output.scale.end - output.scale.start;
output.x.range = output.x.end - output.x.start;
 
var mouse = {
  x: window.innerWidth * .5,
}
 
var updateInputs = function() {
  //mouse x and y inputs
  input.mouseX.current = mouse.x;
  input.mouseX.fraction = (input.mouseX.current - input.mouseX.start) / input.mouseX.range;
}
 
var updateOutputs = function() {
  //output x and y
  output.x.current = output.x.end - (input.mouseX.fraction * output.x.range);
}
 
var updateEachParallaxItem = function() {
  //apply output to html
  itemsArray.forEach(function(item, k) {
    var depth = parseFloat(item.dataset.depth, 10);
    var itemOutput = {
      x: output.x.current - (output.x.current * depth),
      zIndex: output.zIndex.range - (output.zIndex.range*depth),
      scale: output.scale.start + (output.scale.range*depth),
      blur: (depth - output.blur.startingDepth) * output.blur.range
    };
    console.log(k, "depth", depth)
    item.style.filter = 'blur('+itemOutput.blur+'px)'
    item.style.zIndex = itemOutput.zIndex;
    item.style.transform = 'scale('+itemOutput.scale+') translate('+itemOutput.x+'px)';
  });  
}
 
var handleMouseMove = function(event){
  mouse.x = event.clientX;
  updateInputs();
  updateOutputs();
  updateEachParallaxItem();
}
 
var handleResize = function () {
  input.mouseX.end = window.innerWidth;
  input.mouseX.range = input.mouseX.end - input.mouseX.start;
}
 
 
window.addEventListener('mousemove', handleMouseMove);
window.addEventListener('resize', handleResize);
 
 updateInputs();
 updateOutputs();
 updateEachParallaxItem();