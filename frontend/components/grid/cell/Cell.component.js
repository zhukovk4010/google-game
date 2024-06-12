import {getGooglePosition, getPlayerNumberPosition} from "../../../../core/state-manager.js";
import {GoogleComponent} from "../../common/google/Google.component.js";
import {PlayerComponent} from "../../common/player/Player.component.js";

export function CellComponent(x, y ) {
    const element = document.createElement('td');
    render(element, x, y)

    return {element};
}

async function render(element, x, y){

    const googlePosition = await getGooglePosition();
    const player1Position = await getPlayerNumberPosition(1);
    const player2Position = await getPlayerNumberPosition(2);

    if (googlePosition.x === x && googlePosition.y === y) {
        element.append(GoogleComponent().element);
    }

    if (player1Position.x === x && player1Position.y === y) {
        element.append(PlayerComponent(1).element);
    }

    if (player2Position.x === x && player2Position.y === y) {
        element.append(PlayerComponent(2).element);
    }
}