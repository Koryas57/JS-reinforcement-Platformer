class UIManager {

    displayBlinkingUIMessage(content, position) {
        const message = add([
            text(content, {
                size: 24,
                font: "Round"
            }),

        ])
    }

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

    }
}

export const uiManager = new UIManager();