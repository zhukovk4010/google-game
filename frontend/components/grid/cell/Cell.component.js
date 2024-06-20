import {getGooglePosition, getPlayerNumberPosition, subscribe, unsubscribe} from "../../../../core/state-manager.js";
import {GoogleComponent} from "../../common/google/Google.component.js";
import {PlayerComponent} from "../../common/player/Player.component.js";
import {EVENTS} from "../../../../core/constans.js";

export function CellComponent(x, y) {
    const element = document.createElement('td');

    let observer = (e) => {
        if (e.name !== EVENTS.GOOGLE_JUMPED) return;

        if (e.payload.prevPosition.x === x && e.payload.prevPosition.y === y) {
            render(element, x, y)
        }

        if (e.payload.newPosition.x === x && e.payload.newPosition.y === y) {
            render(element, x, y);
        }
    }

    subscribe(observer);

    render(element, x, y)

    return {
        element, cleanup: () => {
            unsubscribe(observer)
        }
    };
}

async function render(element, x, y) {

    element.innerHTML = '';

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