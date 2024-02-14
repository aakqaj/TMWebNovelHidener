interface Chapter {
  title: string;
}

export async function getFileContent() {
  return new Promise<string>((resolve, reject) => {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (!fileInput) {
      reject('File input not found');
      return;
    }
    function initFileInput() {
      fileInput.addEventListener('change', function (event) {
        const file = (event.target as HTMLInputElement)?.files?.[0];
        if (!file) {
          reject('No file uploaded');
          return;
        }

        const reader = new FileReader();
        reader.onload = function (event) {
          const content = event.target?.result as string;
          resolve(content);
        };

        reader.readAsText(file);
      });
    }

    if (!fileInput.onchange) {
      initFileInput();
    }
  });
}

export function splitNovelByTitle(novelText: string): Chapter[] {
  const titleRegex = /^.*(楔子|序章|序言|序|引子|第[零一二三四五六七八九十百千0123456789]+[章卷节].*)$/gm;
  const matches = novelText.match(titleRegex);
  if (!matches) return [];
  return matches.map((title) => ({ title }));
}

export function getContentByTitle(titleOrIndex: string | number, content: string, chapters: Chapter[]): string {
  let startIndex: number;
  if (typeof titleOrIndex === 'string') {
    startIndex = chapters.findIndex((chapter) => chapter.title === titleOrIndex);
  } else {
    startIndex = titleOrIndex;
  }

  if (startIndex === -1) {
    return '';
  }

  const nextTitleIndex = chapters.findIndex((chapter, index) => index > startIndex && chapter.title !== '');
  if (!chapters[nextTitleIndex]?.title) return '';
  const endIndex = nextTitleIndex === -1 ? content.length : content.indexOf(chapters[nextTitleIndex].title);

  const start = content.indexOf(chapters[startIndex].title) + chapters[startIndex].title.length;
  const text = content.substring(start, endIndex);

  return text;
}

export function isNumeric(str: string): boolean {
  return /^\d+$/.test(str);
}

export function debounce(fn: () => void, wait: number) {
  let timeout: any = null;
  return function () {
    if (timeout !== null) clearTimeout(timeout);
    timeout = setTimeout(fn, wait);
  };
}

export function keyListener(dom: HTMLElement | null, hotkey: string, callback: () => void) {
  if (!dom) {
    console.error('not found dom');
    return;
  }

  // 为 div 元素添加聚焦以使用键盘监听
  if (dom.tabIndex === -1) {
    dom.tabIndex = 0;
    dom.style.outline = 'none';
  }

  const modifiers = hotkey.split('+').map((k) => k.toLowerCase());
  const keys = modifiers.pop() as string;
  const modifiersPressed: { [key: string]: boolean } = {};
  modifiers.forEach((modifier) => (modifiersPressed[modifier] = false));

  const handleKeyDown = (event: KeyboardEvent) => {
    const key = event.code.toLowerCase();
    if (keys === key && modifiers.every((modifier) => modifiersPressed[modifier])) {
      callback();
      event.preventDefault(); // 阻止默认行为
    } else if (modifiers.includes(key)) {
      modifiersPressed[key] = true;
    }
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    const key = event.code.toLowerCase();
    if (modifiers.includes(key)) {
      modifiersPressed[key] = false;
    }
  };

  dom.addEventListener('keydown', handleKeyDown);
  dom.addEventListener('keyup', handleKeyUp);
}

// export function keyListener(dom: HTMLElement | null, hotkey: string, callback: () => void) {
//   if (!dom) {
//     console.error('not found dom');
//     return;
//   }

//   // 为div元素添加聚焦以使用键盘监听
//   if (dom.tabIndex === -1) {
//     dom.tabIndex = 0;
//     dom.style.outline = 'none';
//   }

//   if (!hotkey.includes('+')) {
//     dom.addEventListener('keyup', (event: KeyboardEvent) => {
//       const key = event.code.toLocaleLowerCase();
//       if (key === hotkey.toLocaleLowerCase()) callback();
//     });
//     return;
//   }

//   const [leftKey, rightKey] = hotkey.split('+').map((k) => k.toLowerCase());
//   let leftKeyPressed = false;
//   let rightKeyPressed = false;

//   const handleKeyDown = (event: KeyboardEvent) => {
//     const key = event.code.toLocaleLowerCase();
//     if (key === leftKey) {
//       leftKeyPressed = true;
//     }
//     if (leftKeyPressed && key === rightKey) {
//       rightKeyPressed = true;
//     }
//   };

//   const handleKeyUp = (event: KeyboardEvent) => {
//     const key = event.code.toLocaleLowerCase();
//     if (key === leftKey) {
//       leftKeyPressed = false;
//     }
//     if (key === rightKey && leftKeyPressed && rightKeyPressed) {
//       rightKeyPressed = false;
//       callback();
//     }
//   };

//   dom.addEventListener('keydown', handleKeyDown);
//   dom.addEventListener('keyup', handleKeyUp);
// }

export function getViewElement(fatherBox: HTMLElement) {
  const fatherRect = fatherBox.getBoundingClientRect(); // 获取父容器的位置信息
  const scrollTop = fatherBox.scrollTop; // 获取父容器的滚动位置
  const visibleHeight = fatherRect.height; // 获取父容器的可视区域高度

  // 获取子元素集合
  const children = fatherBox.children;

  // 遍历子元素，找出当前可视区域内的元素
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    const childRect = child.getBoundingClientRect(); // 获取子元素的位置信息
    const isInView =
      (childRect.top >= fatherRect.top && childRect.bottom <= fatherRect.bottom) || // 子元素完全在可视区域内
      (childRect.top < fatherRect.top && childRect.bottom > fatherRect.top) || // 子元素部分在可视区域内（顶部在可视区域内）
      (childRect.top < fatherRect.bottom && childRect.bottom > fatherRect.bottom); // 子元素部分在可视区域内（底部在可视区域内）

    if (isInView) {
      return child as HTMLDivElement; // 返回第一个在可视区域内的子元素
    }
  }

  return null; // 如果没有找到在可视区域内的子元素，则返回 null
}

export function updateStyle(cssText: string) {
  const style = document.createElement('style');
  style.type = 'text/css';

  style.textContent = cssText;

  document.head.appendChild(style);
}
