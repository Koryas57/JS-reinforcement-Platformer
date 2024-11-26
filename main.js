import kaboom from "./libs/kaboom.mjs";
import { load } from "./utils/loader.js";
import { Level } from "./utils/Level.js";
import { level1Layout, level1Mappings } from "./content/level1/level1Layout.js";
import { uiManager } from "./utils/UIManager.js";

// Canvas size
kaboom({
    width: 1280,
    height: 720,
    stretch: true,
})

// Spawning fonts, sounds and assets
load.assets()
load.fonts()
load.sounds()

// Defining scenes 
const scenes = {
    menu: () => {
        uiManager.displayMainMenu()
    },
    controls: () => {
        uiManager.displayControlsMenu()
    },
    1: () => {
        const level1 = new Level()
        level1.drawBackground("forest-background")
        level1.drawMapLayout(level1Layout, level1Mappings)

        level1.drawWaves("water", "wave") // Type and animation as in the method
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


// With "in" we can iterate through the keys of an object
for (const key in scenes) {
    scene(key, scenes[key])
}

go("menu")
