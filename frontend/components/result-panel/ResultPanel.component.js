import {getGooglePoints, getPlayerPoints} from "../../../core/state-manager.js";


export function ResultPanelComponent() {
    const element = document.createElement('div');

    const googlePoints = getGooglePoints();
    const player1Points = getPlayerPoints(1);
    const player2Points = getPlayerPoints(2);

    element.append(`Player 1: ${player1Points}`, `Player 2: ${player2Points}`, `Google: ${googlePoints}`);

    return element;
}