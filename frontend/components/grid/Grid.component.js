import {getGridSize, subscribe} from "../../../core/state-manager.js";
import {CellComponent} from "./cell/Cell.component.js";

export function GridComponent() {
    const element = document.createElement('div');
    element.classList.add('grid')

    subscribe(() => {
        render(element);
    })

    render(element);

    return {element};
}

async function render(element) {
    element.innerHTML = '';

    const gridSize = await getGridSize();

    for (let x = 0; x < gridSize.rowsCount; x++) {
        const rowElement = document.createElement('tr');

        for (let y = 0; y < gridSize.columnCount; y++) {
            const cellComponent = CellComponent(x, y);
            rowElement.append(cellComponent.element);
        }

        element.append(rowElement)
    }
}