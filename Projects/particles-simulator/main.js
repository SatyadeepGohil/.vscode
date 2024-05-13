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

function random() {
    return(Math.round(Math.random() * selectedValue));
}

class Particles {
    constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 2 + 1;
    this.velocityX = Math.random() * 1 - 2;
    this.velocityY = Math.random() * 1 - 2;
    }

    update() {
        this.x += this.velocityX;
        this.y += this.velocityY;

        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.velocityX *= -1;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.velocityY *= -1;
        }
        this.gravity(0.1);
        this.wind();
    }

    gravity(g) {
     this.velocityY += g;
    }

    wind () {
        this.velocityX += 0.2;
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

    function animate() {
        
        requestAnimationFrame(animate);

        ctx.clearRect(0,0,canvas.width,canvas.height);

        particles.forEach(particles => {
        const dx = mouseX - particles.x;
        const dy = mouseY - particles.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

         if (mouseInside) {
            if (distance < MOUSE_ATTRACTION_DISTANCE) {
        particles.velocityX = -dx / distance;
        particles.velocityY = -dy / distance;
        }
        else {
        particles.velocityX = dx / distance;
        particles.velocityY = dy / distance;
        }
         }
        else{
        particles.velocityX = Math.random() * 1 - 2;
        particles.velocityY = Math.random() * 1 - 2;
        }
        particles.update();
        particles.draw();
        });

        ctx.beginPath();
        ctx.moveTo(particles.x,particles.y);
       ctx.arc(mouseX,mouseY,this.radius, 0,Math.PI * 2);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath();
    }

    function mouseMovement(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;

    mouseInside = mouseX >= 0 && mouseX <= canvas.width && mouseY >= 0 && mouseY <= canvas.height;
    }

    document.addEventListener("mousemove", mouseMovement);

     window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
       })

init();
animate();