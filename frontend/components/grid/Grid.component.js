import {getGridSize, subscribe, unsubscribe} from "../../../core/state-manager.js";
import {CellComponent} from "./cell/Cell.component.js";

export function GridComponent() {
    const localState = {cleanupFunctions: []};

    const element = document.createElement('div');
    element.classList.add('grid')

    // const observer = () => {
    //     render(element);
    // }
    //
    // subscribe(observer);

    render(element, localState);

    return {element, cleanup: () => { localState.cleanupFunctions.forEach(cf => cf()) }};
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