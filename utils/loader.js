// Loading fonts and assets

export const load = {
    fonts: () => {
        loadFont("Round", "./assets/Round9x13.ttf")
    },
    assets: () => {
        loadSprite("up", "./assets/Arrow_Up_Key_Dark.png")
        loadSprite("down", "./assets/Arrow_Down_Key_Dark.png")
        loadSprite("left", "./assets/Arrow_Left_Key_Dark.png")
        loadSprite("right", "./assets/Arrow_Right_Key_Dark.png")
        loadSprite("space", "./assets/Space_Key_Dark.png")

        loadSprite("forest-background", "./assets/Forest_background_0.png")
        loadSprite("logo", "./assets/Logo.png")
        // Loading a sprite sheet this time
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
        loadSprite("coin", "./assets/Coin.png")
        loadSprite("bridge", "./assets/Bridge.png")

    },
    sounds: () => {
        loadSound("confirm-ui", "./sounds/confirm-ui.wav")
    }
} 