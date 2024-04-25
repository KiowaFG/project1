class Enemy {
    constructor(health, color) {
        this.health = health
        this.color = color

    }
}

const enemyTypes = [
    new Enemy(10, "black"),
    new Enemy(6, "red"),
    new Enemy(4, "blue"),
    new Enemy(2, "green")
];


/* class enemy2 extends enemy{
    constructor{5}
}
 */

function spawnEnemy() {
    const enemyTypes = [
        { blackEnemy },
        { redEnemy },
        { blueEnemy },
        { greenEnemy }
    ];

    const enemyType = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];

    let x, y;
    do {
        x = Math.floor(Math.random() * gridSize) + 1;
        y = Math.floor(Math.random() * gridSize) + 1;
    } while (snake.some(segment => segment.x === x && segment.y === y));

    const newEnemy = { ...enemyType, x, y };
    enemies.push(newEnemy);
}
