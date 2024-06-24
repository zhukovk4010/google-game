import {getGridSize, movePlayer} from "../../../core/state-manager.js";
import {MOVING_DIRECTIONS} from "../../../core/constans.js";
import {CellComponent} from "./cell/Cell.component.js";

export function GridComponent() {
    const localState = {cleanupFunctions: []};

    const element = document.createElement('div');
    element.classList.add('grid');

    const keyupObserver = (e) => {
        console.log(e.code);
        switch (e.code) {
            case 'ArrowUp':
                movePlayer(1, MOVING_DIRECTIONS.UP);
                break;
            case 'ArrowDown':
                movePlayer(1, MOVING_DIRECTIONS.DOWN);
                break;
            case 'ArrowLeft':
                movePlayer(1, MOVING_DIRECTIONS.LEFT);
                break;
            case 'ArrowRight':
                movePlayer(1, MOVING_DIRECTIONS.RIGHT);
                break;
            case 'KeyW':
                movePlayer(2, MOVING_DIRECTIONS.UP);
                break;
            case 'KeyS':
                movePlayer(2, MOVING_DIRECTIONS.DOWN);
                break;
            case 'KeyA':
                movePlayer(2, MOVING_DIRECTIONS.LEFT);
                break;
            case 'KeyD':
                movePlayer(2, MOVING_DIRECTIONS.RIGHT);
                break;
        }
    }

    document.addEventListener('keyup', keyupObserver);

    render(element, localState);

    return {
        element, cleanup: () => {
            localState.cleanupFunctions.forEach(cf => cf());
            element.removeEventListener('keyup', keyupObserver);
        }
    };
}

async function render(element, localState) {
    element.innerHTML = '';

    localState.cleanupFunctions.forEach(cf => cf());
    localState.cleanupFunctions = [];

    const gridSize = await getGridSize();

    for (let x = 0; x < gridSize.rowsCount; x++) {
        const rowElement = document.createElement('tr');

        for (let y = 0; y < gridSize.columnCount; y++) {
            const cellComponent = CellComponent(x, y);
            localState.cleanupFunctions.push(cellComponent.cleanup);
            rowElement.append(cellComponent.element);
        }

        element.append(rowElement)
    }
}