// Config file for player and level quick modifications and testing
export const level1Config = {

    // Player

    gravity: 1400,
    playerSpeed: 400,
    jumpForce: 650,
    nbLives: 3,
    playerStartPosX: 1500,
    playerStartPosY: 100,

    // Enemies

    spiderPositions: [
        () => vec2(2000, 300),
        () => vec2(2020, 0),
        () => vec2(3200, 200),
        () => vec2(3500, 300),
    ],
    spiderRanges: [300, 150, 150, 300],
    spiderDurations: [2, 1, 1, 2],
    spiderType: 1,
}