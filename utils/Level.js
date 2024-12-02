export class Level {

    // We will dynamically add the type and the animation as parameters
    drawWaves(type, anim) {
        // We stick the waves to the canvas, giving the illusion of infinite waves scrolling and optimizing performances compare to a real infinite loop
        let offset = -100
        // For each tile
        for (let i = 0; i < 21; i++) {
            add([sprite(type, { anim }), pos(offset, 600), scale(4), fixed()])
            // Size of a full tile, so the next will be drawn just next to the last
            offset += 64
        }
    }

    // LevelLayout passes in an array of an array of strings, each describing a layer of the map
    drawMapLayout(levelLayout, mappings) {
        const layerSettings = {
            tileWidth: 16,
            tileHeight: 12,
            tiles: mappings
        }

        // Defining the array of layers of the map
        this.map = []
        // Accessing one of the layer at a time
        for (const layerLayout of levelLayout) {
            this.map.push(addLevel(layerLayout, layerSettings))
        }

        for (const layer of this.map) {
            // Allow us to add a new component when the game object is already created .use(here)
            layer.use(scale(4))
        }

    }

    // Reusable utility to draw the background 
    drawBackground(bgSpriteName) {
        add([sprite(bgSpriteName), fixed(), scale(4)]) // Not effected by the camera
    }

    drawScrollingBackground(bgSpriteName) {
        const bgWidth = 320 // Replace with the actual width of your sprite in pixels
        const scaleFactor = 4 // Same scale used for the background
        const scaledWidth = bgWidth * scaleFactor

        // Add two instances to simulate continuous scrolling
        const bg1 = add([sprite(bgSpriteName), pos(0, 0), scale(scaleFactor), fixed()])
        const bg2 = add([sprite(bgSpriteName), pos(scaledWidth, 0), scale(scaleFactor), fixed()])

        // Continuous movement
        onUpdate(() => {
            const speed = 40 // Scrolling speed
            bg1.pos.x -= speed * dt() // dt(), delta time represent the time since last frame
            bg2.pos.x -= speed * dt()

            // Reset position to loop the background
            if (bg1.pos.x + scaledWidth <= 0) {
                bg1.pos.x = bg2.pos.x + scaledWidth
            }
            if (bg2.pos.x + scaledWidth <= 0) {
                bg2.pos.x = bg1.pos.x + scaledWidth
            }
        })
    }

}