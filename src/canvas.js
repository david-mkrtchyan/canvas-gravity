import utils from './utils'

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];

var gravity = 1;
var friction = 0.9;

addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init();
});

addEventListener('click', () =>  init());

function Ball(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
}

Ball.prototype.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.stroke();
    c.closePath();
};

Ball.prototype.update = function() {
    if (this.y + this.radius + this.dy> canvas.height) {
        this.dy = -this.dy * friction;
        this.dx = this.dx * friction;
    } else {
        this.dy += gravity;
    }

    if (this.x + this.radius >= canvas.width || this.x - this.radius <= 0) {
        this.dx = -this.dx * friction;
    }

    this.x += this.dx;
    this.y += this.dy;
    this.draw()
};

// Implementation
var ballsArray = [];
function init() {
    ballsArray = [];
    for (let i = 0; i < 100; i++) {
        var radius = utils.randomIntFromRange(20, 30);
        var x = utils.randomIntFromRange(0, canvas.width - radius);
        var y = utils.randomIntFromRange(0, canvas.height - radius);
        var dx = utils.randomIntFromRange(-2, 2);
        var dy = utils.randomIntFromRange(-2, 2);
        // var color = utils.randomColor(colors);
        var color = utils.getRandomColor();
        ballsArray.push(new Ball(x, y, dx, dy, radius, color));
    }
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    ballsArray.forEach(ball => {
     ball.update();
    });
}

init();
animate();
