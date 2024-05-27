    const app = new PIXI.Application({
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: 0x000000,
        resizeTo: window
    });

    document.body.appendChild(app.view);

    const engine = Matter.Engine.create();
    const world = engine.world;
    world.gravity.y = 0;

    function createWalls() {
            const radius = 1;
        return [
            Matter.Bodies.rectangle(app.screen.width / 2, app.screen.height - radius, app.screen.width, radius * 2, { isStatic: true }),
            Matter.Bodies.rectangle(radius, app.screen.height / 2, radius * 2, app.screen.height, { isStatic: true }),
            Matter.Bodies.rectangle(app.screen.width - radius, app.screen.height / 2, radius * 2, app.screen.height, { isStatic: true }),
            Matter.Bodies.rectangle(app.screen.width / 2, radius, app.screen.width, radius * 2, { isStatic: true })
        ];
    }

    let walls = createWalls();
    Matter.World.add(world, walls);

    const cells = [];
    const numberOfCells = 100;

    const PREDATOR_COLOR = 0xFF0000;
    const PREY_COLOR = 0x0000FF;
    const FOOD_COLOR = 0x00FF00;

    let size = Math.round(Math.random() * 1);

    function addCell(x,y,color) {
        const graphics = new PIXI.Graphics();
        graphics.beginFill(color);
        graphics.drawCircle(0,0,size);
        graphics.endFill();
        graphics.x = x;
        graphics.y = y;
        app.stage.addChild(graphics);

    const body = Matter.Bodies.circle(x,y, size, { restitution: 0.001});
    Matter.World.add(world, body);

    cells.push({ graphics, body , color, size , age: 0, type: color});
    }

    for (let i = 0; i <numberOfCells; i++) {
        if (1 <= 10) color = PREDATOR_COLOR;
        if (i <= 20) color = PREY_COLOR;
        else color = FOOD_COLOR;
        addCell(Math.random() * app.screen.width, Math.random() * app.screen.height, color, 10);
    }


    function applyCellForces() {
        const attractionStrength = 0.01;
        const repulsionStrength = 0.05;
        const minDistance = 20;
        const maxForce = 0.001;

        for (let i = 0; i < cells.length; i++) {
            for (let j = i + 1; j < cells.length; j++) {
                const cellA = cells[i].body;
                const cellB = cells[j].body;

                const distance = Matter.Vector.magnitude(Matter.Vector.sub(cellB.position, cellA.position));
                if (distance < minDistance) continue;
                const delta = Matter.Vector.sub(cellB.position, cellA.position);
                const direction = Matter.Vector.normalise(delta);

                let forceMagnitude = 0;

                if (cellA.type === PREDATOR_COLOR && cellB.type === PREY_COLOR) {
                    forceMagnitude = attractionStrength / (distance * distance);
                } else if (cellA.type === FOOD_COLOR && cellB.type === PREY_COLOR) {
                    forceMagnitude = -repulsionStrength / (distance * distance);
                }

                if (cellA.type === PREY_COLOR && cellB.type === FOOD_COLOR) {
                    forceMagnitude = attractionStrength / (distance * distance);
                } else if (cellA.type === PREY_COLOR && cellB.type === PREDATOR_COLOR) {
                    forceMagnitude = -repulsionStrength / (distance * distance);
                }

                if (cellA.type === FOOD_COLOR || cellB.type === FOOD_COLOR) {
                    forceMagnitude = 0;
                }

                forceMagnitude = Math.min(forceMagnitude, maxForce);
                forceMagnitude = Math.max(forceMagnitude, -maxForce);

                const force = Matter.Vector.mult(direction, forceMagnitude);
                Matter.Body.applyForce(cellA, cellA.position, force);
                Matter.Body.applyForce(cellB, cellB.position, Matter.Vector.neg(force));
            }
        }
    }

    function reproduceCells() {
        const reproductionThreshold = 50;
        const maxCells = 500;
        const newCells = [];

        for (const cell of cells) {
            if (cell.age > reproductionThreshold && cells.length + newCells.length < maxCells) {
                const x = cell.body.position.x + (Math.random() * 20 - 10);
                const y = cell.body.position.y + (Math.random() * 20 - 10);
                newCells.push({ x,y, color: cell.color, size: cell.size});
                cell.age = 0;
            }
        }

        for (const newCell of newCells) {
            addCell(newCell.x, newCell.y, newCell.color, newCell.size);
        }
    }

    function updateCellAging() {
        const maxAge = 500;

        for (let i = cells.length - 1; i >= 0; i--) {
            cells[i].age += 1;
            if (cells[i].age > maxAge) {
                app.stage.removeChild(cells[i].graphics);
                Matter.World.remove(world, cells[i].body);
                cells.splice(i,1);
            }
        }
    }

    function handleCellInteractions() {
        for (let i = cells.length - 1; i >= 0; i--){
            const cellA = cells[i];
            for (let j = cells.length - 1; j >= 0; j--) {
                if ( i === j) continue;
                const cellB = cells[j];

                const distance = Matter.Vector.magnitude(Matter.Vector.sub(cellB.body.position, cellA.body.position));

                if (distance < 10) {
                    if (cellA.type === PREDATOR_COLOR && cellB.type === PREY_COLOR) {
                        app.stage.removeChild(cellB.graphics);
                        Matter.World.remove(world, cellB.body);
                        cells.splice(j,1);
                        cellA.age = 0;
                        continue;
                    }
                    if (cellA.type === PREY_COLOR && cellB.type === FOOD_COLOR) {
                        app.stage.removeChild(cellB.graphics);
                        Matter.World.remove(world, cellB.body);
                        cells.splice(j,1);
                        cellA.age = 0;
                        continue;
                    }
                }
            }
        }
    }

    app.ticker.add(() => {
        Matter.Engine.update(engine, app.ticker.deltaMS);

        applyCellForces();
        reproduceCells();
        updateCellAging();
        handleCellInteractions();

        for (const cell of cells) {
            cell.graphics.position.set(cell.body.position.x, cell.body.position.y);
            cell.graphics.rotation = cell.body.angle;
        }
    })

    window.addEventListener('resize', () => {
        app.renderer.resize(window.innerWidth, window.innerHeight);

        Matter.World.remove(world, walls);
        walls = createWalls();
        Matter.World.add(world, walls);
    });
