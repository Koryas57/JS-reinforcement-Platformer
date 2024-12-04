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
        isInFinalLevel
    ) {
        // With "this" we can create an attribute method that could be used out of the Player scope
        this.isInFinalLevel = isInFinalLevel
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
        // Helper functions for actions
        const moveLeft = () => {
            if (this.gameObj.curAnim() !== "run") this.gameObj.play("run");
            directionalCross.use(sprite("ps4-left"));
            this.gameObj.flipX = true;
            if (!this.isRespawning) this.gameObj.move(-this.speed, 0);
            this.isMoving = true;
        };

        const moveRight = () => {
            if (this.gameObj.curAnim() !== "run") this.gameObj.play("run");
            directionalCross.use(sprite("ps4-right"));
            this.gameObj.flipX = false;
            if (!this.isRespawning) this.gameObj.move(this.speed, 0);
            this.isMoving = true;
        };

        const jump = () => {
            if (!this.gameObj.isGrounded() && this.hasJumpedOnce) return;
            if (time() - this.timeSinceLastGrounded > this.coyoteLapse) return;
            this.gameObj.jump(this.jumpForce);
            play("jump");
            jumpButton.use(scale(1.25));
            this.hasJumpedOnce = true;
        };

        const stopMovement = () => {
            this.gameObj.play("idle");
            this.isMoving = false;
        };

        // Zone definitions
        const screenWidth = 1280; // Set your screen width here
        const screenHeight = 720; // Set your screen height here

        const leftZone = {
            xStart: 0,
            xEnd: screenHeight / 2.65,
            yStart: 0,
            yEnd: screenHeight * 2,
        };

        const leftHalfOfLeftZone = {
            xStart: 0,
            xEnd: leftZone.xEnd / 2,
            yStart: 0,
            yEnd: leftZone.yEnd,
        };

        const rightHalfOfLeftZone = {
            xStart: leftZone.xEnd / 2,
            xEnd: leftZone.xEnd,
            yStart: 0,
            yEnd: leftZone.yEnd,
        };

        const rightZone = {
            xStart: leftZone.xEnd,
            xEnd: screenWidth + 200,
            yStart: 0,
            yEnd: leftZone.yEnd,
        };

        const isInZone = (pos, zone) => (
            pos.x >= zone.xStart &&
            pos.x <= zone.xEnd &&
            pos.y >= zone.yStart &&
            pos.y <= zone.yEnd
        );

        // Keyboard controls
        onKeyDown("left", moveLeft);
        onKeyDown("right", moveRight);
        onKeyDown("space", jump);

        onKeyRelease(() => {
            jumpButton.use(scale(1));
            if (isKeyReleased("right") || isKeyReleased("left")) {
                stopMovement();
                directionalCross.use(sprite("ps4-cross"));
            }
        });

        // Mobile touch controls

        const directionalCross = add([
            sprite("ps4-cross"),
            pos(50, height() - 150),
            area(),
            fixed(),
            z(1000),
        ]);

        const jumpButton = add([
            sprite("ps4-jump"),
            pos(width() - 75, height() - 80),
            area(),
            anchor("center"),
            fixed(),
            z(1000),
        ]);



        onTouchStart((touchPos) => {
            console.log("Touch Position:", touchPos);

            if (isInZone(touchPos, leftHalfOfLeftZone)) {
                console.log("Move Left");
                moveLeft();
                this.isMovingLeft = true;
            } else if (isInZone(touchPos, rightHalfOfLeftZone)) {
                console.log("Move Right");
                moveRight();
                this.isMovingRight = true;
            } else if (isInZone(touchPos, rightZone)) {
                console.log("Jump");
                jump();
            }
        });

        onTouchEnd(() => {
            jumpButton.use(scale(1));
            this.isMovingLeft = false;
            this.isMovingRight = false;
            stopMovement();
            directionalCross.use(sprite("ps4-cross"));
            this.hasJumpedOnce = false;
        });

        // Continuous movement for touch
        onUpdate(() => {
            if (this.isMovingLeft && !this.isMovingRight) {
                moveLeft();
            }

            if (this.isMovingRight && !this.isMovingLeft) {
                moveRight();
            }
        });
    }

    respawnPlayer() {
        if (this.lives > 0) {
            // Losing a life after each respawn
            this.lives--
            // Send the player to the initial pos if no more lives
            this.gameObj.pos = vec2(this.initialX, this.initialY)
            this.isRespawning = true
            setTimeout(() => this.isRespawning = false, 500)
            return
        }

        go("gameover")
    }

    // Enable collision with mobs
    enableMobVulnerability() {
        // The context event(a collision actually) execute the respawn on the player if the gameObj(player) collide with the first param("spiders")
        function hitAndRespawn(context) {
            play("hit", { speed: 1.5 })
            context.respawnPlayer()
        }
        this.gameObj.onCollide("spiders", () => hitAndRespawn(this))
        this.gameObj.onCollide("fish", () => hitAndRespawn(this))
        this.gameObj.onCollide("flame", () => hitAndRespawn(this))
        this.gameObj.onCollide("axes", () => hitAndRespawn(this))
        this.gameObj.onCollide("saws", () => hitAndRespawn(this))
        this.gameObj.onCollide("birds", () => hitAndRespawn(this))
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
            // Redirecting the player to the next level if fullCoinCount
            if (this.coins === coinCountUI.fullCoinCount) {
                go(this.isInFinalLevel ? "end" : this.currentLevelScene + 1)
            }
        })
    }

}