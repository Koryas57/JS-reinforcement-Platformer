export class Player {

    heightDelta = 0
    isMoving = false
    isRespawning = false
    coyoteLapse = 0.1
    coins = 0

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

    enablePassthrough() {
        // with the area() component we have access to this oBPR function wich takes in, as a param, a callback, an other function and it will passes to it the current collision
        this.gameObj.onBeforePhysicsResolve((collision) => {
            // "passthrough" tag that we setted up in the tiles mapping
            // if the tile contains the tag, player can passthrough it while jumping only
            if (collision.target.is("passthrough") && this.gameObj.isJumping()) {
                // Cancelling collision
                collision.preventResolution()
            }

            // if the tile contains the tag, player can passthrough it while pressing down arrow only
            if (collision.target.is("passthrough") && isKeyDown("down")) {
                collision.preventResolution()
            }
        })
    }

    enableCoinPickUp() {
        // We specify the tag of the object we want to collide with as the first param
        // Then in case of collision we execute a callback 
        // We can use the tag as a second param to allow the exchange with the Kaboom destroy function that will take the param as a reference to execute the function on it
        this.gameObj.onCollide("coin", (coin) => {
            this.coins++
            destroy(coin)
            play("coin")
        })
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
            this.isMoving = true
        })

        onKeyDown("right", () => {
            // if statement without brackets because on one line
            if (this.gameObj.curAnim() !== "run") this.gameObj.play("run")

            this.gameObj.flipX = false
            // Moving forward with positive speed
            if (!this.isRespawning) this.gameObj.move(this.speed, 0)
            this.isMoving = true

        })

        onKeyDown("space", () => {
            // this.gameObj.jump(this.jumpForce) would make a Kirby like jumping

            // Allow the gameObj to jump only if on the ground and not respawning
            if (!this.gameObj.isGrounded() && this.hasJumpedOnce) return

            // Coyote Time for Jumps
            // If the time result > than our settled delay(coyoteLapse) we allow a late jump for making the game more forgiving
            if (time() - this.timeSinceLastGrounded > this.coyoteLapse) return

            // Updating the hasJumpedOnce state after jumping
            this.gameObj.jump(this.jumpForce)
            play("jump")
            this.hasJumpedOnce = true
        })

        // Without a key as a first param, it will act on any keys
        onKeyRelease(() => {
            if (isKeyReleased("right") || isKeyReleased("left")) {
                this.gameObj.play("idle")
                this.isMoving = false
            }
        })

    }

    respawnPlayer() {
        if (this.lives > 0) {
            // Losing a life after each respawn
            this.lives--
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

            // Checking if the player has already jumped once in order to use Coyote Time for jumps
            if (this.gameObj.isGrounded()) {
                this.hasJumpedOnce = false
                // We get a time indicator to use it for our delay in Coyote Time
                this.timeSinceLastGrounded = time()

            }

            // We compare the heightDelta to get the difference between the ascenscion and the descent of the gameObj jumping animation
            this.heightDelta = this.previousHeight - this.gameObj.pos.y
            this.previousHeight = this.gameObj.pos.y

            if (this.gameObj.pos.y > 700) {
                play("hit", { speed: 1.5 })
                this.respawnPlayer()
            }

            // We want to play the idle animation if the player is not moving the gameObj
            if (!this.isMoving &&
                this.gameObj.curAnim() !== "idle"
            ) {
                this.gameObj.play("idle")
            }

            // We keep track of the first frame coordinate and we do a substraction, then if the result is positive or negative, we know if the gameObj is ascending or descending while jumping
            if (!this.gameObj.isGrounded() &&
                this.heightDelta > 0 &&
                // Checking if another animation isn't currently playing
                this.gameObj.curAnim() !== "jump"
            ) {
                this.gameObj.play("jump-up")
            }

            // If the heightDelta is positive, the gameObj is falling
            if (!this.gameObj.isGrounded() &&
                this.heightDelta < 0 &&
                this.gameObj.curAnim() !== "jump-down"
            ) {
                this.gameObj.play("jump-down")
            }
        })
    }

    updateLives(livesCountUI) {
        onUpdate(() => {
            livesCountUI.text = this.lives
        })
    }

    updateCoinCount(coinCountUI) {
        onUpdate(() => {
            coinCountUI.text = `${this.coins} / ${coinCountUI.fullCoinCount}`
        })
    }
}