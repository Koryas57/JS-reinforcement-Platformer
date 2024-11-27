export class Player {
    isRespawning = false

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
        this.setPlayerControls()
        this.speed = speed
        this.jumpForce = jumpForce
        this.lives = nbLives
        // pos attribute containe a vec2 which allow us to use the y individually, usefull for various jump state
        this.previousHeight = this.gameObj.pos.y
    }

    // Store the game object as a propriety of the Player class, accessible with this.gameObj
    makePlayer() {
        // Will create a game object with components that we write in 
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

    // Logic for making the player move
    setPlayerControls() {
        // First param is the key that we want to listen on
        // Second param is the callback, that will be called when KeyDown
        onKeyDown("left", () => {
            // curAnim() let us check which anim is currently playing
            if (this.gameObj.curAnim() !== "run") this.gameObj.play("run") // .play on a game object is for animation, without game object, it is for playing sounds

            // By default the sprite is facing to the right
            this.gameObj.flipX = true
            // Moving backward with negative speed + not moving while respawning 
            if (!this.isRespawning) this.gameObj.move(-this.speed, 0)
        })

        onKeyDown("right", () => {
            // if statement without brackets because on one line
            if (this.gameObj.curAnim() !== "run") this.gameObj.play("run")

            this.gameObj.flipX = false
            // Moving forward with positive speed
            if (!this.isRespawning) this.gameObj.move(this.speed, 0)
        })

        onKeyDown("space", () => {
            // this.gameObj.jump(this.jumpForce) would make a Kirby like jumping

            // Allow the gameObj to jump only if on the ground and not respawning
            if (this.gameObj.isGrounded() && !this.isRespawning) {
                this.gameObj.jump(this.jumpForce)
                play("jump")
            }
        })

        // Without a key as a first param, it will act on any keys
        onKeyRelease(() => {
            if (isKeyReleased("right") || isKeyReleased("left")) {
                this.gameObj.play("idle")
            }
        })

    }

    respawnPlayer() {
        if (this.lives > 0) {
            // Send the player to the initial pos if no more lives
            this.gameObj.pos = vec2(this.initialX, this.initialY)
            this.isRespawning = true
            setTimeout(() => this.isRespawning = false, 500)
        }
    }

    update() {
        // If the player go below a certain point, we have to launch a respawn.
        // Here we will check this condition every frame
        onUpdate(() => {
            if (this.gameObj.pos.y > 700) {
                play("hit", { speed: 1.5 })
                this.respawnPlayer()
            }

            if (this.gameObj.isGrounded) play("hit", { speed: 1.5 })
        })
    }
}