import {start} from "../../../core/state-manager.js";

export function StartComponent() {
    const element = document.createElement('button');

    render(element);

    return {element}
}

async function render(element) {
    element.append('Start')

    element.addEventListener('click', () => {
        start();
    })
}