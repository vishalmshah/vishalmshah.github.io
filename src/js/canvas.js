var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Stands for context
var c = canvas.getContext('2d');

var maxRadius = 40;
var minRadius = 2;
var numCircles = 400;

var colorArray = [
  '#AEF3E7',
  '#8EE3EF',
  '#37718E',
  '#C33C54'
]

// window.addEventListener('mousemove', function(event) {
//   mouse.x = event.x;
//   mouse.y = event.y;
// })

center = {
  x: window.innerWidth/2,
  y: window.innerHeight/2
}

window.addEventListener('resize', function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  init();
})

var circleArray = [];

function init() {
  center = {
    x: window.innerWidth/2,
    y: window.innerHeight/2
  }

  circleArray = [];
  for(var i = 0; i < numCircles; i++) {
    var radius = Math.random() * 3 + 1;
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var dx = (Math.random() - 0.5);
    var y = Math.random() *(innerHeight - radius * 2) + radius;
    var dy = (Math.random() - 0.5);
    circleArray.push(new Circle(x, y, dx, dy, radius));
  }
}

init();

var x = Math.random() * innerWidth;
var dx = (Math.random() - 0.5) * 8;
var y = Math.random() * innerHeight;
var dy = (Math.random() - 0.5) * 8;
var radius = 30;

function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = radius;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)]

  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
    c.fillStyle = this.color;
    c.fill();
  }

  this.update = function() {
    if(this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if(this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;

    var xDist = center.x - this.x,
        yDist = center.y - this.y,
        totalDist = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));

    // inteactivity
    if(totalDist <= 150) {
      if(this.radius < maxRadius) {
        this.radius += 1;
      }
    } else if (this.radius > minRadius) {
      this.radius -= 1;
    }


    this.draw();
  }
}

for(var i = 0; i < numCircles; i++) {
  var radius = Math.random() * 3 + 1;
  var x = Math.random() * (innerWidth - radius * 2) + radius;
  var dx = (Math.random() - 0.5);
  var y = Math.random() *(innerHeight - radius * 2) + radius;
  var dy = (Math.random() - 0.5);
  circleArray.push(new Circle(x, y, dx, dy, radius));
}

console.log(circleArray);

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);

  for(var i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }

}

animate();
