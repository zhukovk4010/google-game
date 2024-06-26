import {SettingsComponent} from "./settings/Settings.component.js";
import {ResultPanelComponent} from "./result-panel/ResultPanel.component.js";
import {GridComponent} from "./grid/Grid.component.js";
import {LoseComponent} from "./lose-component/Lose.component.js";
import {getGameStatus, subscribe} from "../../core/state-manager.js";
import {GAME_STATES} from '../../core/constans.js'
import {StartComponent} from "./start-component/Start.component.js";

export function AppComponent() {
    const localState = {
        prevGameStatus: null,
        cleanupFunctions: []
    }

    const element = document.createElement('div');

    subscribe(() => {
        render(element, localState);
    })

    render(element, localState);

    return {element};
}

async function render(element, localState) {

    const gameStatus = await getGameStatus();

    if (localState.prevGameStatus === gameStatus) return;
    localState.prevGameStatus = gameStatus;

    localState.cleanupFunctions.forEach(cf => cf());
    localState.cleanupFunctions = [];

    element.innerHTML = '';

    switch (gameStatus) {
        case GAME_STATES.SETTINGS: {
            const settingsComponent = SettingsComponent();
            const startComponent = StartComponent();
            element.append(settingsComponent.element, startComponent.element);
            break;
        }
        case GAME_STATES.IN_PROGRESS: {
            const settingsComponent = SettingsComponent();
            const resultPanelComponent = ResultPanelComponent();
            const gridComponent = GridComponent();

            localState.cleanupFunctions.push(gridComponent.cleanup);

            element.append(settingsComponent.element, resultPanelComponent.element, gridComponent.element);
            break;
        }
        case GAME_STATES.LOSE: {
            const loseComponent = LoseComponent();

            element.append(loseComponent.element);
            break;
        }
        default:
            throw new Error('Not implemented');
    }
}