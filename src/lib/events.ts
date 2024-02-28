import { config } from './Config';
import Book from './book';
import { clearContents, reloadConfigPage, renderContent, renderNext, renderPre, toNext, toPre } from './page';
import { header, headerMask } from './template';
import { debounce, isNumeric, keyListener, updateStyle } from './utils';

export function addMoveEvent() {
  let initialX: number;
  let initialY: number;
  let initialWidth: number;
  let initialHeight: number;
  let resizing = false;
  let moving = false;

  const resizableDiv = document.getElementById('webNovelHidener')!;
  const header = document.querySelector('#webNovelHidener .header')!;
  const resizeHandle = document.querySelector('.resizeHandle')!;

  // 添加 mousedown 事件监听器到可调整大小的手柄元素
  resizeHandle.addEventListener('mousedown', function (event) {
    const ev = event as MouseEvent;
    initialX = ev.clientX;
    initialY = ev.clientY;
    initialWidth = resizableDiv.offsetWidth;
    initialHeight = resizableDiv.offsetHeight;
    resizing = true;
    moving = false;
  });

  // 添加 mousedown 事件监听器到 header 元素
  header.addEventListener('mousedown', function (event) {
    const ev = event as MouseEvent;
    initialX = ev.clientX - resizableDiv.offsetLeft;
    initialY = ev.clientY - resizableDiv.offsetTop;
    moving = true;
    resizing = false;
  });

  // 添加 mouseup 事件监听器
  document.addEventListener('mouseup', function () {
    resizing = false;
    moving = false;
  });

  // 添加 mousemove 事件监听器
  document.addEventListener('mousemove', function (event) {
    if (resizing) {
      const dx = event.clientX - initialX;
      const dy = event.clientY - initialY;

      const newWidth = initialWidth + dx;
      const newHeight = initialHeight + dy;

      resizableDiv.style.width = `${newWidth}px`;
      resizableDiv.style.height = `${newHeight}px`;
    }
    if (moving) {
      resizableDiv.style.left = event.clientX - initialX + 'px';
      resizableDiv.style.top = event.clientY - initialY + 'px';
    }
  });
}

export function addSearchEvent() {
  document.getElementById('searchInput')!.addEventListener('keydown', function (event) {
    const keyboardEvent = event as KeyboardEvent;
    if (keyboardEvent.key === 'Enter') {
      const searchString = (event.target as HTMLInputElement).value;

      (event.target as HTMLInputElement).value = '';
      const res = Book.searchTitle(searchString);
      if (!res || !searchString) return;
      clearContents();

      let index = res.index;
      if (isNumeric(searchString)) {
        index = index - 1;
      }
      renderContent(index);
      renderContent(index + 1);
      renderContent(index + 2);
      Book.setCursor(index + 2);
    }
  });
}

export function addScrollEvent() {
  const novelDiv = document.querySelector('.novel')!;
  novelDiv.addEventListener(
    'scroll',
    debounce(() => {
      const scrollTop = novelDiv.scrollTop;
      const contentHeight = novelDiv.scrollHeight;
      const visibleHeight = novelDiv.clientHeight;
      const scrollPosition = novelDiv.scrollTop;
      const distanceToBottom = contentHeight - visibleHeight - scrollPosition;

      if (scrollTop <= 100) renderPre();
      if (distanceToBottom <= 800) renderNext();
    }, 200)
  );
}

export function addConfigEvent() {
  const configBtn = document.querySelector<HTMLDivElement>('#webNovelHidener .settings')!;
  const novel = document.querySelector<HTMLDivElement>('#webNovelHidener .novel')!;
  const config = document.querySelector<HTMLDivElement>('#webNovelHidener .config')!;
  configBtn.onclick = () => {
    reloadConfigPage();
    novel.style.zIndex = novel.style.zIndex === '101' ? '102' : '101';
    config.style.zIndex = config.style.zIndex === '102' ? '101' : '102';
  };
}

export function addGlobalHotKeyListener() {
  const app = document.querySelector<HTMLDivElement>('#webNovelHidener');
  const replace = document.querySelector<HTMLDivElement>('#webNovelHidener .replace')!;
  keyListener(document.body, config.config.HotKey.hiden, () => {
    if (!app) return;

    if (config.config.hidenMode === 'hiden' || app.style.display === 'none') {
      app.style.display = app.style.display !== 'none' ? 'none' : 'flex';
    }

    if (config.config.hidenMode === 'replace') {
      replace.style.zIndex = replace.style.zIndex !== '100' ? '100' : '110';
    }
  });
}

export function addSearchHotKeyListener() {
  const father = document.querySelector<HTMLElement>('#webNovelHidener')!;
  keyListener(father, config.config.HotKey.search, () => {
    const tools = document.querySelector('#webNovelHidener .tools');
    if (!tools) return;
    const classList = tools.classList;
    console.log(classList.contains('wnhActive'));

    if (!classList.contains('wnhActive')) {
      tools.classList.add('wnhActive');
    } else {
      tools.classList.remove('wnhActive');
    }
  });
}

export function addNextEvent() {
  const father = document.querySelector<HTMLElement>('#webNovelHidener .wnhView .novel')!;
  const nextBtn = document.querySelector<HTMLDivElement>('#webNovelHidener .next')!;

  nextBtn.onclick = () => toNext();
  keyListener(father, config.config.HotKey.next, () => toNext());
}

export function addPreEvent() {
  const father = document.querySelector<HTMLElement>('#webNovelHidener .wnhView .novel')!;
  const preBtn = document.querySelector<HTMLDivElement>('#webNovelHidener .pre')!;
  preBtn.onclick = () => toPre();
  keyListener(father, config.config.HotKey.pre, () => toPre());
}

export function updateConfigEvent() {
  // 更新主题
  const themeItems = document.querySelectorAll('.theme .capsule span');
  themeItems.forEach((themeItem) => {
    themeItem.addEventListener('click', () => {
      if (!themeItem) return;
      const theme = themeItem.textContent?.toLowerCase() as 'dark' | 'light';
      config.updateConfig({ Theme: theme });
      reloadConfigPage();

      const isLight = config.config.Theme === 'light';
      const webNovelHidener = document.querySelector('#webNovelHidener')!;
      if (isLight) {
        webNovelHidener.classList.remove('dark');
        webNovelHidener.classList.add('light');
      } else {
        webNovelHidener.classList.remove('light');
        webNovelHidener.classList.add('dark');
      }
    });
  });

  // 更新标题字体大小
  const titleSizeSelect = document.getElementById('titleSize') as HTMLSelectElement;
  titleSizeSelect.addEventListener('change', () => {
    const titleSize = Number(titleSizeSelect.value);
    config.updateConfig({ TitleSize: titleSize });
    reloadConfigPage();

    updateStyle(`
        #webNovelHidener .novel .part .title{ 
         font-size: ${titleSize}px;
        }
         `);
  });

  // 更新内容字体大小
  const contentSizeSelect = document.getElementById('contentSize') as HTMLSelectElement;
  contentSizeSelect.addEventListener('change', () => {
    const contentSize = Number(contentSizeSelect.value);
    config.updateConfig({ ContentSize: contentSize });
    reloadConfigPage();

    updateStyle(`
        #webNovelHidener .novel .part{ 
         font-size: ${contentSize}px;
        }
         `);
  });

  // 更新隐藏模式
  const hidenModeItems = document.querySelectorAll('.hidenMode .capsule span');
  hidenModeItems.forEach((hidenModeItem) => {
    hidenModeItem.addEventListener('click', () => {
      const hidenMode = hidenModeItem.textContent?.toLowerCase() as 'hiden' | 'replace';
      config.updateConfig({ hidenMode });
      reloadConfigPage();
    });
  });

  // 更新遮罩开关
  const maskSwitch = document.getElementById('maskSwitch') as HTMLInputElement;
  maskSwitch.addEventListener('change', () => {
    const mask = maskSwitch.checked;
    config.updateConfig({ Mask: mask });
    reloadConfigPage();
  });
}

function addMaskEvent() {
  const isMask = config.config.Mask;

  const headerEle = document.querySelector('#webNovelHidener .header')!;
  const webNovelHidener = document.querySelector('#webNovelHidener')!;

  if (isMask) {
    webNovelHidener.classList.add('mask');
    headerEle.innerHTML = headerMask;
  }

  const maskSwitch = document.getElementById('maskSwitch') as HTMLInputElement;
  maskSwitch.addEventListener('change', () => {
    const mask = maskSwitch.checked;
    config.updateConfig({ Mask: mask });
    if (mask) {
      headerEle.innerHTML = headerMask;
      webNovelHidener.classList.add('mask');
    } else {
      headerEle.innerHTML = header;
      webNovelHidener.classList.remove('mask');
    }
  });
}

function updateReplaceTextEvent() {
  const textarea = document.querySelector<HTMLTextAreaElement>('#webNovelHidener .textarea textarea')!;
  const replaceEle = document.querySelector('#webNovelHidener .replace')!;

  textarea.addEventListener('keydown', function (event) {
    const e = event as KeyboardEvent;
    if (e.key === 'Enter' && !e.shiftKey) {
      event.preventDefault(); // 阻止默认的回车换行行为
      // 在这里执行你的逻辑
      if (!textarea.value) return;
      replaceEle.innerHTML = textarea.value;
      config.updateConfig({ replaceText: textarea.value });
    }
  });
}

export function bindEvent() {
  addMoveEvent();
  addSearchEvent();
  addScrollEvent();
  addConfigEvent();
  updateConfigEvent();
  addGlobalHotKeyListener();
  addSearchHotKeyListener();
  addNextEvent();
  addPreEvent();

  addMaskEvent();
  updateReplaceTextEvent();
}
