import { reloadConfigPage } from './page';
import template from './template';
import { updateStyle } from './utils';

export function DomInit() {
  const App = document.createElement('div');
  App.id = 'webNovelHidener';
  App.style.display = 'none';
  App.innerHTML = `
    <div class="header">
    ${template.header}
    </div>
    ${template.resizeHandle}
    ${template.wnhView}
    `;

  document.body.append(App);
  updateStyle();
  reloadConfigPage();
}
