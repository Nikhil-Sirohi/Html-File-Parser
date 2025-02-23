import { parseHTMLFile } from "./parsingController";
import * as path from "path";

function main() {
  const htmlFilePath = path.join(__dirname, "../assets/sample.html");

  try {
    const metadata = parseHTMLFile(htmlFilePath);
    console.log("Article Metadata:");
    console.log(`Title: ${metadata.title}`);
    console.log(`Date: ${metadata.date}`);
    console.log(`Author: ${metadata.author}`);
    console.log(`Extract: ${metadata.extract}`);
  } catch (error) {
    console.error("Error parsing HTML file:", error);
  }
}

main();
