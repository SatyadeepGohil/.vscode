let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particles = [];
let selectedValue = 3000;
let mouseX = 0;
let mouseY = 0;
let mouseInside = false;
let engine;
let world;


window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    Matter.World.clear(world);
    particles = [];
    init();
});
/* function reset() {
    particles.forEach((particle, index) => {
        Matter.World.remove(world, particle);
    });
    particles = [];
    particlePositions = [];
} */

function init() {
    engine = Matter.Engine.create();
    world = engine.world;
    for (let i = 0; i < selectedValue; i++) {
    const red = Math.floor(Math.random() * 255);
    const blue = Math.floor(Math.random() * 255);
    const green = Math.floor(Math.random() * 255);
    const color = `rgb(${red},${green},${blue})`;
        const particle = Matter.Bodies.circle(
            Math.random() * canvas.width,
            Math.random() * canvas.height,
            Math.random() * 2 + 1,
            { restitution: 0.8,
                friction: 0.1,
                frictionAir: 0.0001,
                density: 0.7,
                color: color
             }
        );
        particles.push(particle);
        Matter.World.add(world, particle);
    }
    Matter.Engine.run(engine);
    Matter.World.add(world, [
        Matter.Bodies.rectangle(canvas.width/2 ,canvas.height,canvas.width,50,{isStatic: true}),
        Matter.Bodies.rectangle(canvas.width/2,0,canvas.width,50,{isStatic: true}),
        Matter.Bodies.rectangle(0,canvas.height/2, 50,canvas.height, {isStatic: true}),
        Matter.Bodies.rectangle(canvas.width, canvas.height / 2, 50, canvas.height, {isStatic: true})
    ]);
}

document.addEventListener('mousemove', function(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
    mouseInside = (mouseX >= 0 && mouseX <= canvas.width && mouseY >= 0 && mouseY <= canvas.height)
});

document.addEventListener("mouseout", function () {
    mouseInside = false;
});

function calculateWindForce(mouseX,mouseY) {
    const windDirection = {
        x: mouseX - canvas.width / 2,
        y: mouseY - canvas.height / 2
    };

    const magnitude = Math.sqrt(windDirection.x ** 2 + windDirection.y ** 2);
    const normalizedWindDirection = {
        x: windDirection.x / magnitude,
        y: windDirection.y / magnitude
    };

    const windMagnitude = 0.01;

    const windForce = {
        x: normalizedWindDirection.x * windMagnitude,
        y: normalizedWindDirection.y * windMagnitude
    }
    return windForce;
}

function drawWindDirection(mouseX,mouseY) {
    const windDirection = {
        x: mouseX - canvas.width / 2,
        y: mouseY - canvas.height / 2
    };

    const angle = Math.atan2(windDirection.y,windDirection.x);
    const hue = (angle + Math.PI) / (2 * Math.PI);

    ctx.beginPath();
    ctx.strokeStyle = `hsl(${hue * 360}, 100%, 50%)`;
    ctx.lineWidth = 2;
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.lineTo(mouseX,mouseY);
    ctx.stroke();
    ctx.closePath();
}

function animate() {
    requestAnimationFrame(animate);

    particles.forEach(particle => {
        if (mouseInside) {
            const windForce = calculateWindForce(mouseX, mouseY);
            Matter.Body.applyForce(particle, particle.position, windForce);
        }
    });
    draw(particles);
}


function draw(particles) {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    particles.forEach(particle => {
    ctx.beginPath();
    ctx.arc(particle.position.x, particle.position.y, particle.circleRadius, 0, Math.PI * 2);
    ctx.fillStyle = particle.color;
    ctx.fill();
    ctx.closePath();
    });

    if(mouseInside) {
        drawWindDirection(mouseX,mouseY);
    }
}

animate();
init();