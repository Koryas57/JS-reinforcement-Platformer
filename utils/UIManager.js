class UIManager {

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
                0.5,
                // We define that the opacity will varying according to the nextOpacityValue starting at 0
                (nextOpacityValue) => message.opacity = nextOpacityValue,
                //Calling this function at a certain rate
                easings.linear
            )
            message.enterState("flash-down")
        })

        // Looping the opacity state

        message.onStateEnter("flash-down", async () => {
            await tween(
                message.opacity,
                1,
                0.5,
                // We define that the opacity will varying according to the nextOpacityValue starting at 0
                (nextOpacityValue) => message.opacity = nextOpacityValue,
                //Calling this function at a certain rate
                easings.linear
            )
            message.enterState("flash-up")
        })
    }

    // Main menu rendering
    displayMainMenu() {
        add([
            sprite("forest-background"),
            scale(4),
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
}

export const uiManager = new UIManager();