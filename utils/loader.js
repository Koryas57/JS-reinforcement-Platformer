// Loading fonts and assets

export const load = {
    fonts: () => {
        loadFont("Round", "./assets/Round9x13.ttf")
    },
    assets: () => {
        loadSprite("forest-background", "./assets/Forest_background_0.png")
        loadSprite("logo", "./assets/Logo.png")

    },
    sounds: () => {
        loadSound("confirm-ui", "./sounds/confirm-ui.wav")
    }
} 