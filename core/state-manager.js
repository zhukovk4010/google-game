const _state = {
    points: {
        google: 12,
        players: [10, 11]
    },
    positions: {
        google: {
            x: 0,
            y: 3
        },
        players: [
            {
                x: 2,
                y: 2
            },
            {
                x: 3,
                y: 3
            },
        ]
    },
    settings: {
        gridSize: {
            rowsCount: 4,
            columnCount: 4
        }
    }
}

//Interface

function _getIndexByPlayerNumber(playerNumber) {
    const playerIndex = playerNumber -1;
    if (playerIndex < 0 || playerIndex > _state.points.players.length - 1) {
        throw new Error('Incorrect player number');
    }

    return playerIndex;
}


//Public function
export async function getGooglePoints() {
    return _state.points.google;
}

/**
 * @param {number} playerNumber - one-based index of player
 * @return {Promise<number>} number of points
 * */
export async function getPlayerPoints(playerNumber) {
    const playerIndex = _getIndexByPlayerNumber(playerNumber);

    return _state.points.players[playerIndex];
}

export async function getGridSize() {
    return {..._state.settings.gridSize}
}

export async function getGooglePosition(){
    return {..._state.positions.google}
}

/**
 * @param {number} playerNumber - one-based index of player
 * @return {Promise<Object>} number of points
 * */
export async function getPlayerNumberPosition(playerNumber){
    const playerIndex = _getIndexByPlayerNumber(playerNumber);

    return {..._state.positions.players[playerIndex]}
}