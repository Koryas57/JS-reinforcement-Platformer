export class Saws {
    constructor(positions, ranges) {
        this.positions = positions
        this.ranges = ranges
        this.saws = []
        for (const position of this.positions) {
            this.saws.push(
                add([
                    sprite("saw"),
                    area(),
                    anchor("center"),
                    pos(position),
                    scale(4),
                    rotate(),
                    state("rotate-left"), ["rotate-left", "rotate-right"],
                    offscreen(),
                    "saws",
                ])
            )
        }
    }

    async moveAndRotate(saws, moveBy) {
        // seek is for starting at a certain point, 10sec here
        if (!saws.isOffScreen()) play("saw", { volume: 0.3, seek: 10 })

        await Promise.all([
            // For the position
            tween(
                saws.pos.x,
                saws.pos.x + moveBy,
                1,
                (posX) => (saws.pos.x = posX),
                easings.linear
            ),
            // For the rotation
            tween(
                saws.angle,
                360,
                2,
                (currAngle) => (saws.angle = currAngle),
                easings.linear
            ),
        ])
    }

    setMovementPattern() {
        for (const [index, saw] of this.saws.entries()) {

            const rotateLeft = saw.onStateEnter("rotate-left", async () => {

                await this.moveAndRotate(saw, -this.ranges[index])

                saw.angle = 0
                saw.enterState("rotate-right")
            })

            const rotateRight = saw.onStateEnter("rotate-right", async () => {

                await this.moveAndRotate(saw, this.ranges[index])

                saw.angle = 0
                saw.enterState("rotate-left")
            })

            onSceneLeave(() => {
                rotateRight.cancel()
                rotateLeft.cancel()
            })
        }
    }
}