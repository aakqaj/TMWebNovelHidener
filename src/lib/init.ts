import { config } from "./Config"
import { reloadConfigPage, renderContent } from "./page"
import template from "./template"

function themeInit() {
    const isLight = config.config.Theme === "light"
    const webNovelHidener = document.querySelector('#webNovelHidener')!;
    if (isLight) {
        webNovelHidener.classList.remove("dark")
        webNovelHidener.classList.add("light")
    } else {
        webNovelHidener.classList.remove("light")
        webNovelHidener.classList.add("dark")
    }
}

export function DomInit() {
    const App = document.createElement("div")
    App.id = "webNovelHidener"
    App.style.display = "none"
    App.innerHTML = `
    <div class="header">
    ${template.header}
    </div>
    ${template.resizeHandle}
    ${template.wnhView}
    `

    document.body.append(App)
    themeInit()
    reloadConfigPage()
}