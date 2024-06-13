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
            rowsCount: 2,
            columnCount: 2
        }
    }
}

//Observer

let _observers = []

export function subscribe(observer) {
    _observers.push(observer);
}

export function unsubscribe(observer) {
    _observers = _observers.filter(o => o !== observer);
}

function _notifyObservers() {
    _observers.forEach((o) => {
        try {
            o();
        } catch (err) {
            console.error(err);
        }
    });
}

function _generateNewNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function _jumpGoogleToNewPosition() {
    const newPosition = {..._state.positions.google};

    newPosition.x = _generateNewNumber(0, _state.settings.gridSize.columnCount - 1);
    newPosition.y = _generateNewNumber(0, _state.settings.gridSize.rowsCount - 1);

    const isNewPositionMatchWithCurrentGooglePosition =
        newPosition.x === _state.positions.google.x &&
        newPosition.y === _state.positions.google.y;

    const isNewPositionMatchWithCurrentPlayer1Position =
        newPosition.x === _state.positions.players[0].x &&
        newPosition.y === _state.positions.players[0].y;

    const isNewPositionMatchWithCurrentPlayer2Position =
        newPosition.x === _state.positions.players[1].x &&
        newPosition.y === _state.positions.players[1].y

    if (
        isNewPositionMatchWithCurrentGooglePosition ||
        isNewPositionMatchWithCurrentPlayer1Position ||
        isNewPositionMatchWithCurrentPlayer2Position
    ) {
        _jumpGoogleToNewPosition();
    } else {
        _state.positions.google = newPosition;
    }
}

setInterval(() => {
    _jumpGoogleToNewPosition();
    _state.points.google++;
    _notifyObservers();
}, 1000);

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