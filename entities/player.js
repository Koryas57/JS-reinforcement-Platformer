export class Player {
    // Giving a Vec2 as params is a better option
    constructor(
        posX,
        posY,
        speed,
        jumpForce,
        nbLives,
        currentLevelScene,
        isInTerminalScene
    ) {
        // With "this" we can create an attribute method that could be used out of the Player scope
        this.isInTerminalScene = isInTerminalScene
        this.currentLevelScene = currentLevelScene
        // Setting the initial spawning position
        this.initialX = posX
        this.initialY = posY
        this.makePlayer()
        this.speed = speed
        this.jumpForce = jumpForce
        this.lives = nbLives
        // pos attribute containe a vec2 which allow us to use the y individually, usefull for various jump state
        this.previousHeight = this.gameObj.pos.y
    }

    // Store the game object as a propriety of the Player class, accessible with this.gameObj
    makePlayer() {
        this.gameObj = add([
            sprite("player", { anim: "idle" }),
            area({ shape: new Rect(vec2(0, 3), 8, 8) }),
            anchor("center"),
            pos(this.initialX, this.initialY),
            scale(4),
            body(),
            // Reference for .get function, if you give the tag, it returns all the game object with this tag
            "player",
        ])
    }
}