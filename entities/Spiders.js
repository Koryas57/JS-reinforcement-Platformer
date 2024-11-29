export class Spider {
    // Is gonna give the position of all our spiders
    constructor(positions, ranges, durations, type) {
        this.ranges = ranges
        this.durations = durations
        this.spiders = []
        for (const position of positions) {
            this.spiders.push(
                // We push the reference to the array
                add([
                    sprite(`spider-${type}`, { anim: "crawl" }),
                    pos(position),
                    area({
                        shape: new Rect(vec2(0, 4.5), 20, 6),
                        // With a tag as param. Useful for perf or mobs overlaping each others
                        collisionIgnore: ["spiders"],
                    }),
                    anchor("center"),
                    body(),
                    scale(4),
                    // First param is the default state
                    state("idle", ["idle", "crawl-left", "crawl-right"]),
                    // Stop logic out of the screen
                    offscreen(),
                    "spiders"
                ]))
        }
    }

    async crawl(spider, moveBy, duration) {
        if (spider.curAnim() !== "crawl") spider.play("crawl")

        // Moving the spider
        await tween(
            spider.pos.x,
            spider.pos.x + moveBy,
            duration,
            (posX) => (spider.pos.x = posX),
            easings.easeOutSine
        )
    }

    // Defining the spiders AI
    setMovementPattern() {
        // We want to iterate on all of the spiders
        // .entries give us the index and the element
        for (const [index, spider] of this.spiders.entries()) {
            // With the state component, we access to onStateEnter where we specify the state as the first param and then the function that we want to run when this state is entered
            const idle = spider.onStateEnter(
                // previousState is undefined to make a state machine
                "idle", async (previousState) => {
                    if (spider.curAnim() !== "idle") spider.play("idle")

                    // We use a promise for a resolving time while the spider will not execute the rest of its code before resolution, remaining at idle before moving again
                    await new Promise((resolve) => {
                        // resolve() tell the promise after 1sec that the promise is fulfilled
                        setTimeout(() => resolve(), 1000)
                    })


                    if (previousState === "crawl-left") {
                        spider.enterState("crawl-right")
                        return
                    }

                    spider.jump()
                    if (!spider.isOffScreen()) {
                        play("spider-attack", { volume: 0.6 })
                    }

                    spider.enterState("crawl-left")
                })

            //  After a crawl-left we enter the idle state with crawl-left as a previousState, so we go after the idle promise to the crawl-right state
            const crawlLeft = spider.onStateEnter(
                "crawl-left", async () => {
                    // FlipX when changing direction
                    spider.flipX = false
                    await this.crawl(
                        spider,
                        -this.ranges[index],
                        this.durations[index]
                    )
                    spider.enterState("idle", "crawl-left")
                })


            const crawlRight = spider.onStateEnter(
                "crawl-right", async () => {
                    spider.flipX = true
                    await this.crawl(
                        spider,
                        this.ranges[index],
                        this.durations[index]
                    )
                    spider.enterState("idle")
                })

            // To avoid levels updating bugs
            onSceneLeave(() => {
                idle.cancel()
                crawlLeft.cancel()
                crawlRight.cancel()
            })
        }
    }


}