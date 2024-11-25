import kaboom from "./libs/kaboom.mjs";
import { load } from "./utils/loader.js";
import { uiManager } from "./utils/UIManager.js";

kaboom({
    width: 1280,
    height: 720,
    letterbox: true,

})

load.fonts()
load.assets()

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
