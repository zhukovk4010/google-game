import {SettingsComponent} from "./settings/Settings.component.js";
import {ResultPanelComponent} from "./result-panel/ResultPanel.component.js";
import {GridComponent} from "./grid/Grid.component.js";

export function AppComponent() {
    const element = document.createElement('div');

    const settingsElement = SettingsComponent();
    const resultPanelElement = ResultPanelComponent();
    const gridElement = GridComponent();
    element.append(settingsElement, resultPanelElement, gridElement);

    return element;
}