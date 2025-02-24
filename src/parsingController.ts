import { JSDOM } from "jsdom";
import * as fs from "fs";
import * as path from "path";

export interface ArticleMetadata {
  title: string;
  date: string;
  author: string;
  extract: string;
}

export function parseHTMLFile(filePath: string): ArticleMetadata {
  const htmlContent = fs.readFileSync(filePath, "utf-8");

  const dom = new JSDOM(htmlContent);
  const document = dom.window.document;

  const findElementWithText = (tag: string, text: string): Element | null => {
    const elements = document.getElementsByTagName(tag);
    for (const element of elements) {
      if (element.textContent?.includes(text)) {
        return element;
      }
    }
    return null;
  };

  const title =
    document.querySelector("title")?.textContent || "No title found";

  const dateElement = findElementWithText("strong", "Date:");
  const date = dateElement?.nextSibling?.textContent?.trim() || "No date found";

  const authorElement = findElementWithText("strong", "Author:");
  const author =
    authorElement?.nextSibling?.textContent?.trim() || "No author found";

  const paragraphs = document.getElementsByTagName("p");
  let extract = "No extract found";
  for (const p of paragraphs) {
    if (
      !p.textContent?.includes("Date:") &&
      !p.textContent?.includes("Author:")
    ) {
      extract = p.textContent?.split(".")[0] + "." || extract;
      break;
    }
  }

  return { title, date, author, extract };
}
