import { config as c, config } from "./Config";
import Book from "./book";
import { header, headerMask } from "./template";
import { getViewElement, updateStyle } from "./utils";

export function toNext() {
    const father = document.querySelector<HTMLElement>("#webNovelHidener .wnhView .novel")!;
    const viewEle = getViewElement(father);
    if (!viewEle) return;
    const cur = Number(viewEle.id.substring(1))
    document.querySelector(`#p${cur + 1}`)?.scrollIntoView({ behavior: 'smooth' });
    renderNext()
}

export function toPre() {
    const father = document.querySelector<HTMLElement>("#webNovelHidener .wnhView .novel")!;
    const viewEle = getViewElement(father);
    if (!viewEle) return;
    const cur = Number(viewEle.id.substring(1))
    const preEle = document.querySelector(`#p${cur - 1}`)
    if (!preEle) {
        renderPre()
        return
    }
    preEle?.scrollIntoView({ behavior: 'smooth' });
}

export function clearContents() {
    const fa = document.querySelector(".wnhView .novel")!;
    fa.innerHTML = ""

}

export function renderContent(index: number, isBefore = false) {
    const title = Book.searchTitle(index)?.title
    const fa = document.querySelector(".wnhView .novel")!;
    const content = Book.getContent(index)
    const part = document.createElement("div")
    if (!content) return
    part.className = "part"
    part.id = `p${index}`
    part.innerHTML = `
    <div class="title">${title}</div>
    <div style="white-space: pre-wrap;">${content}</div>
    `
    if (isBefore) {
        const firstChild = fa.firstChild;
        fa.insertBefore(part, firstChild);
        return;
    }
    fa.append(part)

}

export function renderNext(cur: number | null = null) {
    const fa = document.querySelector(".wnhView .novel")!;
    const lastChild = fa.lastElementChild;
    if (!lastChild) return
    cur = cur ? cur : Number(lastChild.id.substring(1))
    renderContent(cur + 1)
    Book.setCursor(cur + 1)
}

export function renderPre(cur: number | null = null) {
    const fa = document.querySelector(".wnhView .novel")!;
    const firstChild = fa.firstElementChild;
    if (!firstChild) return
    cur = cur ? cur : Number(firstChild.id.substring(1))
    if (cur <= 0) cur = 1
    renderContent(cur - 1, true)
    Book.setCursor(cur - 1)
}


export function reloadConfigPage() {
    const config = c.config
    const theme = config.Theme;
    const titleSize = config.TitleSize;
    const contentSize = config.ContentSize;
    const hidenMode = config.hidenMode;
    const mask = config.Mask;
    const hotKeys = config.HotKey;

    // 更新主题
    const themeItems = document.querySelectorAll('.theme .capsule span');
    themeItems[0].classList.toggle('capactive', theme === 'light');
    themeItems[1].classList.toggle('capactive', theme === 'dark');

    // 更新标题字体大小
    const titleSizeSelect = document.getElementById('titleSize') as HTMLSelectElement;
    titleSizeSelect.value = String(titleSize);

    // 更新内容字体大小
    const contentSizeSelect = document.getElementById('contentSize') as HTMLSelectElement;
    contentSizeSelect.value = String(contentSize);

    // 更新隐藏模式
    const hidenModeItems = document.querySelectorAll('.hidenMode .capsule span');
    hidenModeItems[0].classList.toggle('capactive', hidenMode === 'hiden');
    hidenModeItems[1].classList.toggle('capactive', hidenMode === 'replace');

    // 更新遮罩开关
    const maskSwitch = document.getElementById('maskSwitch') as HTMLInputElement;
    maskSwitch.checked = mask;

    // 更新快捷键
    const hotKeyItems = document.querySelectorAll('.hotKey .kItem');
    hotKeyItems.forEach((item, index) => {
        const keyName = Object.keys(hotKeys)[index];
        const keyCombo: any = hotKeys[keyName];
        const keySpan = item.querySelector('.key') as HTMLSpanElement;
        keySpan.textContent = keyCombo;
    });

}

// function updateElementStyle() {
//     //遮罩样式更新
//     const webNovelHidener = document.querySelector("#webNovelHidener")!
//     if (!webNovelHidener) return;
//     const headerEle = document.querySelector("#webNovelHidener .header")!
//     const mask = c.config.Mask
//     if (mask) {
//         console.log(mask);

//         headerEle.innerHTML = headerMask
//         webNovelHidener.classList.add("mask")
//     } else {
//         console.log("es");
//         headerEle.innerHTML = header
//         webNovelHidener.classList.remove("mask")
//     }

//     //字体样式更新
//     updateStyle(`
//         #webNovelHidener .novel .part{ 
//          font-size: ${config.config.ContentSize}px;
//         }
//         #webNovelHidener .novel .part .title{ 
//             font-size: ${config.config.TitleSize}px;
//            }
//          `)

//     const textarea = document.querySelector<HTMLTextAreaElement>('#webNovelHidener .textarea textarea')!;
//     const replaceEle = document.querySelector("#webNovelHidener .replace")!
//     replaceEle.innerHTML = config.config.replaceText
//     textarea.value = config.config.replaceText
// }