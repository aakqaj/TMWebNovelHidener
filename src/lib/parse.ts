import Book from './book';
import { getFileContent, splitNovelByTitle } from './utils';

export async function fileParse() {
  const uploadDiv = document.querySelector('.upload') as HTMLElement;
  if (uploadDiv && !uploadDiv.onclick) {
    uploadDiv.addEventListener('click', async () => {
      const fileInput = document.getElementById('fileInput') as HTMLInputElement;
      fileInput.value = '';
      fileInput.click();
      const content = await getFileContent();

      const titles = splitNovelByTitle(content);
      console.log(titles);

      Book.setBook({
        content,
        titles,
      });
    });
  }
}
