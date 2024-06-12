const _state = {
    points: {
        google: 12,
        players: [10, 11]
    },
    settings: {
        gridSize: {
            rowsCount: 4,
            columnCount: 4
        }
    }
}

export async function getGooglePoints() {
    return _state.points.google;
}

/**
 * @param {number} playerNumber - one-based index of player
 * @return {Promise<number>} number of points
 * */

export async function getPlayerPoints(playerNumber) {
    const playerIndex = playerNumber -1;
    if (playerIndex < 0 || playerIndex > _state.points.players.length - 1) {
        throw new Error('Incorrect player number');
    }

    return _state.points.players[playerIndex];
}

export async function getGridSize() {
    return {..._state.settings.gridSize}
}