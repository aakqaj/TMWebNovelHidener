import { getContentByTitle, isNumeric, splitNovelByTitle } from "./utils";

interface Chapter {
    title: string;
}

class _Book {
    bookname = "";
    content = "";
    titles: Chapter[] = [];
    cursorChangeCallbacks: (() => void)[] = [];
    private cursor = 0;

    setBook(bookInfo: {
        bookname?: string;
        content?: string;
        titles?: Chapter[];
    }) {
        this.bookname = bookInfo?.bookname ?? this.bookname;
        this.content = bookInfo?.content ?? this.content;
        this.titles = bookInfo?.titles ?? this.titles;
    }

    getContent(cur: number): string {
        return getContentByTitle(cur, this.content, this.titles);
    }

    onCursorChange(callback: () => void) {
        this.cursorChangeCallbacks.push(callback);
    }

    setCursor(cursor: number) {
        if (cursor >= this.titles.length) cursor = this.titles.length - 1
        if (cursor < 0) cursor = 0
        this.cursor = cursor;
        this.cursorChangeCallbacks.forEach(callback => callback());
    }

    getCursor() {
        return this.cursor
    }

    searchTitle(str: string | number) {
        if (isNumeric(str.toString())) {
            const index = parseInt(str.toString());

            if (index >= 0 && index < this.titles.length) {
                return { index: index, title: this.titles[index].title };
            } else {
                return null;
            }
        } else {
            const regex = new RegExp(str.toString(), 'i');
            for (let i = 0; i < this.titles.length; i++) {
                if (regex.test(this.titles[i].title)) {
                    return { index: i, title: this.titles[i].title };
                }
            }
            return null;
        }
    }
}


const Book = new _Book()
export default Book