let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particles = [];
let selectedValue = 1000;
let mouseX = 0;
let mouseY = 0;
let MOUSE_ATTRACTION_DISTANCE = 10;
let mouseInside = false;
const windStrength = 4;
let isScattering = false;

function randomFloat(min,max) {
    return(Math.round(Math.random() * (max - min) + min));
}

class Particles {
    constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 2 + 1;

    const randomAngle = Math.random() * Math.PI * 2;
    const maxSpeed = 0.5;
    this.velocityX = Math.cos(randomAngle) * maxSpeed;
    this.velocityY = Math.sin(randomAngle) * maxSpeed;

    }

    update() {
    this.checkCollisionX();
    this.checkCollisionY();
    this.x += this.velocityX += randomFloat(-0.1,0.1);
    this.y += this.velocityY += randomFloat(-0.1,0.1);

    this.velocityX *= 0.9;
    this.velocityY *= 0.9;

    this.x += this.velocityX + windStrength * Math.cos(Math.random() * Math.PI * 2);
    this.y += this.velocityY + windStrength * Math.sin(Math.random() * Math.PI * 2);
    
    //this.gravity(1);
    }

    checkCollisionX() {
    if (this.x + this.radius > canvas.width) {
    this.x = canvas.width - this.radius;
    this.velocityX *= -10;
    } else if (this.x - this.radius < 0) {
    this.x = this.radius;
    this.velocityX *= -10;
    }
    }

    checkCollisionY() {
        if (this.y + this.radius > canvas.height) {
      this.y = canvas.height - this.radius;
      this.velocityY *= -10;
    } else if (this.y - this.radius < 0) {
      this.y = this.radius;
      this.velocityY *= -10;
    }
    }

   /*  gravity(g) {
     this.velocityY += g;
    } */

    wind (w) {
        this.velocityX += w;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius, 0,Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}

    function init() {
            for (let i = 0; i < selectedValue; i++) {
                particles.push(new Particles());
            }
        }

document.addEventListener('mousemove', function(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
    mouseInside = (mouseX >= 0 && mouseX <= canvas.width && mouseY >= 0 && mouseY <= canvas.height)
});

document.addEventListener("mouseout", function () {
    mouseInside = false;
})

    function animate() {
        
        requestAnimationFrame(animate);

        ctx.clearRect(0,0,canvas.width,canvas.height);
        particles.forEach(particles => {
            if(mouseInside) {
        const dx = mouseX - particles.x;
        const dy = mouseY - particles.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const attractionFactor = distance < MOUSE_ATTRACTION_DISTANCE ? -1 : 1;

        particles.velocityX = attractionFactor * dx / distance;
        particles.velocityY = attractionFactor * dy / distance;
        } else if (!isScattering) {
            isScattering = true;
            particles.velocityX += randomFloat(-5,5);
            particles.velocityY += randomFloat(-5,5);
        }
        particles.velocityX *= 1;
        particles.velocityY *= 1;
        particles.update();
        particles.draw();
        });

        if (mouseInside) {
        ctx.beginPath();
        ctx.fillStyle = "blue";
        ctx.fill();
        ctx.closePath();
        }
        if (!mouseInside) {
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();
        }
    }

init();
animate();