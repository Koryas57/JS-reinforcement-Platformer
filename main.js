import kaboom from "./libs/kaboom.mjs";

import { load } from "./utils/loader.js";
import { attachCamera } from "./utils/camera.js";
import { Level } from "./utils/Level.js";
import { level1Config } from "./content/level1/config.js";
import { level1Layout, level1Mappings } from "./content/level1/level1Layout.js";
import { level2Config } from "./content/level2/config.js"
import { level2Layout, level2Mappings } from "./content/level2/level2Layout.js";
import { level3Config } from "./content/level3/config.js"
import { level3Layout, level3Mappings } from "./content/level3/level3Layout.js";
import { Player } from "./entities/player.js";
import { uiManager } from "./utils/UIManager.js";
import { Spider } from "./entities/Spiders.js";
import { Projectiles } from "./entities/Projectiles.js";
import { Axes } from "./entities/Axes.js";
import { Saws } from "./entities/Saws.js";
import { Birds } from "./entities/Birds.js";


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

        const menuAmbience = play("menu-ambience", {
            volume: 0.3,
            loop: true,
        })
        onSceneLeave(() => {
            menuAmbience.paused = true
        })
    },
    controls: () => {
        uiManager.displayControlsMenu()

        const menuAmbience = play("menu-ambience", {
            volume: 0.3,
            loop: true,
        })
        onSceneLeave(() => {
            menuAmbience.paused = true
        })
    },
    1: () => {

        const waterAmbience = play("water-ambience", {
            volume: 0.15,
            loop: true,
        })
        const jungleAmbience = play("jungle-ambience", {
            volume: 1,
            seek: 10,
            loop: true,
        })
        onSceneLeave(() => {
            waterAmbience.paused = true
            jungleAmbience.paused = true
        })

        setGravity(1400)

        const level1 = new Level()
        level1.drawBackground("jungle")
        level1.drawMapLayout(level1Layout, level1Mappings)

        // Player parameters values
        const player = new Player(
            // Easier to modify from a Config file
            level1Config.playerStartPosX,
            level1Config.playerStartPosY,
            level1Config.playerSpeed,
            level1Config.jumpForce,
            level1Config.nbLives,
            1,
            false
        )


        // Enabling player to pass through "passthrough" platforms
        player.enablePassthrough()

        // Enabling player to pick up coin
        player.enableCoinPickUp()

        //Activate collision with mobs
        player.enableMobVulnerability()

        // Calling the update loop to check every frame
        player.update()


        // Spawning Spiders
        // Spiders are bigger than tiles so we cannot define them in the level layout
        const spiders = new Spider(
            // Mapping the spiderPositions array
            level1Config.spiderPositions.map(spiderPos => spiderPos()),
            level1Config.spiderRanges,
            level1Config.spiderDurations,
            level1Config.spiderType,
        )

        // Spiders AI
        spiders.setMovementPattern()
        spiders.enablePassThrough()

        // Spawning Projectiles

        const fish = new Projectiles(
            level1Config.fishPositions.map(fishPos => fishPos()),
            level1Config.fishRanges,
            "fish"
        )

        fish.setMovementPattern()


        // Could have been an object instead of a function
        attachCamera(player.gameObj, 0, 200)

        level1.drawWaves("water", "wave") // Type and animation params as in the method


        // Displaying the scoreboard
        uiManager.addDarkBg()
        uiManager.displayCoinCount()
        player.updateCoinCount(uiManager.coinCountUI)
        uiManager.displayLivesCount()
        player.updateLives(uiManager.livesCountUI)


    },
    2: () => {

        const lavaAmbience = play("lava-ambience", {
            volume: 1,
            loop: true,
        })
        const castleAmbience = play("castle-ambience", {
            volume: 0.5,
            loop: true,
        })
        onSceneLeave(() => {
            lavaAmbience.paused = true
            castleAmbience.paused = true
        })


        setGravity(1400)

        const level2 = new Level()
        level2.drawScrollingBackground("castle-background")
        level2.drawMapLayout(level2Layout, level2Mappings)

        // Player parameters values
        const player = new Player(
            // Easier to modify from a Config file
            level2Config.playerStartPosX,
            level2Config.playerStartPosY,
            level2Config.playerSpeed,
            level2Config.jumpForce,
            level2Config.nbLives,
            2,
            false
        )


        // Enabling player to pass through "passthrough" platforms
        player.enablePassthrough()

        // Enable collision with enemies
        player.enableMobVulnerability()

        // Enabling player to pick up coin
        player.enableCoinPickUp()

        // Calling the update loop to check every frame
        player.update()

        // Spawing Spiders
        const spiders = new Spider(
            // Mapping the spiderPositions array
            level2Config.spiderPositions.map(spiderPos => spiderPos()),
            level2Config.spiderRanges,
            level2Config.spiderDurations,
            level2Config.spiderType,
        )

        // Spiders AI
        spiders.setMovementPattern()
        spiders.enablePassThrough()

        // Spawning Flames
        const flames = new Projectiles(
            level2Config.flamePositions.map(flamePos => flamePos()),
            level2Config.flameRanges,
            "flame"
        )

        flames.setMovementPattern()

        // Spawning Axes

        const axes = new Axes(
            level2Config.axesPositions.map(axePos => axePos()),
            level2Config.axesSwingDurations
        )
        axes.setMovementPattern()

        // Spawning Saws

        const saws = new Saws(
            level2Config.sawsPositions.map(sawPos => sawPos()),
            level2Config.sawsRanges
        )

        saws.setMovementPattern()


        // Could have been an object instead of a function
        attachCamera(player.gameObj, 0, 200)

        level2.drawWaves("lava", "wave") // Type and animation params as in the method


        // Displaying the scoreboard
        uiManager.addDarkBg()
        uiManager.displayCoinCount()
        player.updateCoinCount(uiManager.coinCountUI)
        uiManager.displayLivesCount()
        player.updateLives(uiManager.livesCountUI)


    },
    3: () => {

        const windAmbience = play("strong-wind", {
            volume: 0.25,
            loop: true,
        })
        const funnyAmbience = play("funny-ambience", {
            volume: 0.4,
            seek: 8.3,
            loop: true,
        })
        onSceneLeave(() => {
            windAmbience.paused = true
            funnyAmbience.paused = true
        })

        setGravity(1400)

        const level3 = new Level()
        level3.drawScrollingBackground("sky-background-0")
        level3.drawScrollingBackground("sky-background-1")
        level3.drawScrollingBackground("sky-background-2")
        level3.drawMapLayout(level3Layout, level3Mappings)

        const player = new Player(
            level3Config.playerStartPosX,
            level3Config.playerStartPosY,
            level3Config.playerSpeed,
            level3Config.jumpForce,
            level3Config.nbLives,
            3,
            true
        )

        player.enablePassthrough()
        player.enableCoinPickUp()
        player.enableMobVulnerability()
        player.update()

        // Spawning Birds 

        const birds = new Birds(
            level3Config.birdPositions.map(birdPos => birdPos()),
            level3Config.birdRanges
        )

        birds.setMovementPattern()

        // Scene 

        attachCamera(player.gameObj, 0, 200)
        level3.drawWaves("clouds", "wave")

        uiManager.addDarkBg()
        uiManager.displayCoinCount()
        player.updateCoinCount(uiManager.coinCountUI)
        uiManager.displayLivesCount()
        player.updateLives(uiManager.livesCountUI)

    },
    gameover: () => {
        uiManager.displayGameOverScreen()
    },
    end: () => {
        uiManager.displayEndGameScreen()
    },
}


// With "in" we can iterate through the keys of an object
for (const key in scenes) {
    scene(key, scenes[key])
}

go("menu")
