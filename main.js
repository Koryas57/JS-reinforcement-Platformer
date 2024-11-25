import kaboom from "./libs/kaboom.mjs";
import { load } from "./utils/loader.js";
import { uiManager } from "./utils/UIManager.js";

// Canvas size
kaboom({
    width: 1280,
    height: 720,
    letterbox: true,

})

// Spawning fonts, sounds and assets
load.fonts()
load.sounds()
load.assets()

// Defining scenes 
const scenes = {
    menu: () => {
        uiManager.displayMainMenu()
    },
    controls: () => {

    },
    1: () => {

    },
    2: () => {

    },
    3: () => {

    },
    gameover: () => {

    },
    end: () => {

    },
}

for (const key in scenes) {
    scene(key, scenes[key])
}

go("menu")
