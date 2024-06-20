import {getGooglePoints, getPlayerPoints, subscribe} from "../../../core/state-manager.js";
import {EVENTS} from "../../../core/constans.js";


export function ResultPanelComponent() {
    const element = document.createElement('div');
    element.classList.add('result-panel');

    subscribe((e) => {
        if (e.name === EVENTS.SCORES_CHANGED) {
            render(element)
        }
    })

    render(element);

    return {element};
}

async function render(element) {
    element.innerHTML = '';
    const googlePoints = await getGooglePoints();
    const player1Points = await getPlayerPoints(1);
    const player2Points = await getPlayerPoints(2);

    element.append(`Player 1: ${player1Points}`, `Player 2: ${player2Points}`, `Google: ${googlePoints}`);
}