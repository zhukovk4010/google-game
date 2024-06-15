import {SettingsComponent} from "./settings/Settings.component.js";
import {ResultPanelComponent} from "./result-panel/ResultPanel.component.js";
import {GridComponent} from "./grid/Grid.component.js";
import {LoseComponent} from "./lose-component/Lose.component.js";
import {getGameStatus} from "../../core/state-manager.js";

export function AppComponent() {
    const element = document.createElement('div');

    render(element);

    return {element};
}

async function render(element) {

    const gameStatus = await getGameStatus();

    switch (gameStatus) {
        case 'in_progress':
            const settingsComponent = SettingsComponent();
            const resultPanelComponent = ResultPanelComponent();
            const gridComponent = GridComponent();

            element.append(settingsComponent.element, resultPanelComponent.element, gridComponent.element);
        case 'lose':
            const loseComponent = LoseComponent();

            element.append(loseComponent.element);
    }
}