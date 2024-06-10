import {AppComponent} from "./components/App.component.js";

const rootElement = document.getElementById('root');

const appElement = AppComponent();

rootElement.append(appElement);