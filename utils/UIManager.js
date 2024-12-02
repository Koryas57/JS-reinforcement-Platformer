class UIManager {

    displayLivesCount(player) {
        this.livesCountUI = add([
            text("", {
                font: "Round",
                size: 50,
            }),
            fixed(),
            pos(70, 10)
        ])

        this.livesCountUI.add([
            sprite("star-icon"),
            pos(-60, -5),
            scale(3),
            fixed()
        ])
    }

    displayCoinCount(player) {
        this.coinCountUI = add([
            // Give later access to text property onUpdate
            text("", {
                font: "Round",
                size: 50,
            }),
            {
                // We add property to the gameObj by adding an object
                // We want the number of the returned array to totalize coins
                fullCoinCount: get("coin", { recursive: true }).length
            },
            fixed(),
            pos(70, 70)
        ])

        // Giving the UI a child gameObj
        this.coinCountUI.add([
            sprite("coin-icon"),
            // Relative to the parent
            pos(-60, 0),
            scale(3),
            fixed()
        ])
    }

    // Blinking Menu Text
    displayBlinkingUIMessage(content, position) {
        const message = add([
            text(content, {
                size: 24,
                font: "Round"
            }),
            area(),
            anchor("center"),
            pos(position),
            opacity(),
            state("flash-up", ["flash-up", "flash-down"]),
        ])

        // Gradually changing opacity message

        message.onStateEnter("flash-up", async () => {
            await tween(
                message.opacity,
                0,
                0.8,
                // We define that the opacity will varying according to the nextOpacityValue starting at 0
                (nextOpacityValue) => message.opacity = nextOpacityValue,
                //Calling this function at a certain rate
                easings.easeInOut
            )
            message.enterState("flash-down")
        })

        // Looping the opacity state

        message.onStateEnter("flash-down", async () => {
            await tween(
                message.opacity,
                1,
                0.8,
                // We define that the opacity will varying according to the nextOpacityValue starting at 0
                (nextOpacityValue) => message.opacity = nextOpacityValue,
                //Calling this function at a certain rate
                easings.ease
            )
            message.enterState("flash-up")
        })
    }

    // Main menu rendering
    displayMainMenu() {
        add([
            sprite("menuBg"),
            scale(2),
        ])
        add([
            sprite("logo"),
            area(),
            anchor("center"),
            pos(center().x, center().y - 180),
            scale(8),
        ])

        this.displayBlinkingUIMessage(
            "Press [ Enter ] to Start Game",
            vec2(center().x, center().y + 100)
        )

        onKeyPress("enter", () => {
            play("confirm-ui", { speed: 1.5 })
            go("controls")
        })

    }

    // How to play menu
    displayControlsMenu() {
        add([
            sprite("forest-background"),
            scale(4),
        ])
        add([
            text("Controls", { font: "Round", size: 50 }),
            area(),
            anchor("center"),
            pos(center().x, center().y - 200),
        ])

        const controlPrompts = add([
            pos(center().x + 30, center().y)
        ])

        controlPrompts.add([
            sprite("up"),
            pos(0, -80),
        ])

        controlPrompts.add([
            sprite("down"),
        ])

        controlPrompts.add([
            sprite("left"),
            pos(-80, 0),
        ])

        controlPrompts.add([
            sprite("right"),
            pos(80, 0),
        ])

        controlPrompts.add([
            sprite("space"),
            pos(-200, 0),
        ])

        controlPrompts.add([
            text("Jump", { font: "Round", size: 32 }),
            pos(-190, 100),
        ])

        controlPrompts.add([
            text("Move", { font: "Round", size: 32 }),
            pos(10, 100),
        ])

        this.displayBlinkingUIMessage(
            "Press [ Enter ] to Start Game",
            vec2(center().x, center().y + 280)
        )

        onKeyPress("enter", () => {
            play("confirm-ui", { speed: 1.5 })
            go(1)
        })
    }

    // Dark background for UI Scoreboard
    addDarkBg() {
        add([rect(270, 130), color(0, 0, 0), fixed()]) // or color(Color.fromHex('#fffff'))
    }

    displayGameOverScreen() {
        add([rect(1280, 720), color(0, 0, 0)]),
            add([
                text("Game Over !", { size: 50, font: "Round" }),
                area(),
                anchor("center"),
                pos(center()),
            ])

        this.displayBlinkingUIMessage(
            "Press [ Enter ] to Restart Game",
            vec2(center().x, center().y + 100)
        )

        onKeyPress("enter", () => {
            play("confirm-ui")
            go("menu")
        })
    }

    displayEndGameScreen() {
        add([rect(1280, 720), color(0, 0, 0)]),
            add([
                text("You Won! Thanks for Playing", { size: 50, font: "Round" }),
                area(),
                anchor("center"),
                pos(center()),
            ])

        this.displayBlinkingUIMessage(
            "Press [ Enter ] to Restart Game",
            vec2(center().x, center().y + 100)
        )

        onKeyPress("enter", () => {
            play("confirm-ui")
            go("menu")
        })

    }
}

export const uiManager = new UIManager();