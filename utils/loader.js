// Loading fonts and assets

export const load = {
    fonts: () => {
        loadFont("Round", "./assets/Round9x13.ttf")
    },
    assets: () => {

        // Controls prompts

        loadSprite("up", "./assets/Arrow_Up_Key_Dark.png")
        loadSprite("down", "./assets/Arrow_Down_Key_Dark.png")
        loadSprite("left", "./assets/Arrow_Left_Key_Dark.png")
        loadSprite("right", "./assets/Arrow_Right_Key_Dark.png")
        loadSprite("space", "./assets/Space_Key_Dark.png")

        // Logo & Backgrounds

        loadSprite("jungle", "./assets/jungle.png")
        loadSprite("menuBg", "./assets/menuBg.png")
        loadSprite("menuBg2", "./assets/menuBg2.png")
        loadSprite("forest-background", "./assets/Forest_Background_0.png")
        loadSprite("castle-background", "./assets/Castle_Background_0.png")
        loadSprite("sky-background-0", "./assets/Sky_Background_0.png")
        loadSprite("sky-background-1", "./assets/Sky_Background_1.png")
        loadSprite("sky-background-2", "./assets/Sky_Background_2.png")
        loadSprite("logo", "./assets/Logo.png")

        // Loading a sprite sheet this time
        // Tiles Elements

        loadSprite("grass-tileset", "./assets/Grass_Tileset.png", {
            // Which part of the image correspond to which tile
            sliceX: 3,
            sliceY: 4,
            // Can also be used to specify tiles not conventionnaly
            anims: {
                tm: 1, // Second tile from the top middle
                tr: 2, // Third tile from the top right
                ml: 3,
                mm: 4,
                mr: 5,
                bl: 6,
                bm: 7,
                br: 8
            }
        })
        loadSprite("grass-oneway-tileset", "./assets/Grass_Oneway.png", {
            sliceX: 3,
            sliceY: 4,
            anims: {
                tl: 0,
                tm: 1,
                tr: 2,
                ml: 3,
                mm: 4,
                mr: 5,
                bl: 6,
                bm: 7,
                br: 8,
            },
        })
        loadSprite("brick-tileset", "./assets/Brick_Tileset.png", {
            // Which part of the image correspond to which tile
            sliceX: 3,
            sliceY: 4,
            // Can also be used to specify tiles not conventionnaly
            anims: {
                tm: 1, // Second tile from the top middle
                tr: 2, // Third tile from the top right
                ml: 3,
                mm: 4,
                mr: 5,
                bl: 6,
                bm: 7,
                br: 8
            }
        })
        loadSprite("brick-oneway-tileset", "./assets/Brick_Oneway.png", {
            sliceX: 3,
            sliceY: 4,
            anims: {
                tl: 0,
                tm: 1,
                tr: 2,
                ml: 3,
                mm: 4,
                mr: 5,
                bl: 6,
                bm: 7,
                br: 8,
            },
        })
        loadSprite("rock-tileset", "./assets/Grass_Rock_Tileset.png", {
            // Which part of the image correspond to which tile
            sliceX: 3,
            sliceY: 4,
            // Can also be used to specify tiles not conventionnaly
            anims: {
                tm: 1, // Second tile from the top middle
                tr: 2, // Third tile from the top right
                ml: 3,
                mm: 4,
                mr: 5,
                bl: 6,
                bm: 7,
                br: 8
            }
        })
        loadSprite("rock-oneway-tileset", "./assets/Grass_Rock_Oneway.png", {
            sliceX: 3,
            sliceY: 4,
            anims: {
                tl: 0,
                tm: 1,
                tr: 2,
                ml: 3,
                mm: 4,
                mr: 5,
                bl: 6,
                bm: 7,
                br: 8,
            },
        })

        // Climatic Elements

        loadSprite("water", "./assets/Water.png", {
            sliceX: 8,
            sliceY: 1,
            anims: {
                wave: {
                    from: 0,
                    to: 7,
                    speed: 16,
                    loop: true,
                }
            },
        })
        loadSprite("lava", "./assets/Lava.png", {
            sliceX: 8,
            sliceY: 1,
            anims: {
                wave: {
                    from: 0,
                    to: 7,
                    speed: 16,
                    loop: true,
                }
            },
        })
        loadSprite("clouds", "./assets/Clouds.png", {
            sliceX: 8,
            sliceY: 1,
            anims: {
                wave: {
                    from: 0,
                    to: 7,
                    speed: 16,
                    loop: true,
                }
            },
        })


        // Physical Elements 

        loadSprite("coin-icon", "./assets/Coins_UI.png")
        loadSprite("star-icon", "./assets/Stars_Ui.png")
        loadSprite("coin", "./assets/Coin.png")
        loadSprite("bridge", "./assets/Bridge.png")
        loadSprite("player", "./assets/Player.png", {
            sliceX: 4,
            sliceY: 6,
            anims: {
                idle: {
                    from: 0,
                    to: 3,
                    loop: true,
                },
                run: {
                    from: 4,
                    to: 7,
                    loop: true,
                },
                // One frame sprites
                "jump-up": 8,
                "jump-down": 9,
            },
        })
        loadSprite("spider-1", "./assets/Spider_1.png", {
            sliceX: 3,
            sliceY: 1,
            anims: {
                crawl: { from: 0, to: 2, loop: true },
                idle: 0,
            }
        })
        loadSprite("spider-2", "./assets/Spider_2.png", {
            sliceX: 3,
            sliceY: 1,
            anims: {
                crawl: { from: 0, to: 2, loop: true },
                idle: 0,
            }
        })
        loadSprite("fish", "./assets/Fish_1.png", {
            sliceX: 2,
            sliceY: 1,
            anims: {
                swim: { from: 0, to: 1, loop: true },
            }
        })
        loadSprite("flame", "./assets/Flame_1.png", {
            sliceX: 2,
            sliceY: 1,
            anims: {
                burn: { from: 0, to: 1, loop: true },
            }
        })
        loadSprite("axe", "./assets/Axe_Trap.png")

    },
    sounds: () => {
        loadSound("confirm-ui", "./sounds/confirm-ui.wav")
        loadSound("jump", "./sounds/jump.wav")
        loadSound("hit", "./sounds/hit.wav")
        loadSound("coin", "./sounds/coin.wav")
        loadSound("spider-attack", "./sounds/spider-attack.mp3")
        loadSound("swinging-axe", "./sounds/swinging-axe.mp3")
    }
} 