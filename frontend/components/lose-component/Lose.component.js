import {playAgain} from "../../../core/state-manager.js";

export function LoseComponent() {
    const element = document.createElement('div');

    render(element);

    return {element};
}

async function render(element) {
    const button = document.createElement('button');

    button.append('Play again!');

    button.addEventListener('click',() => {
       playAgain()
    });

    element.append(button);
}