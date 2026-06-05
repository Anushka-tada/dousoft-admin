const fs = require("fs");
const path = require("path");

function updateFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");

  content = content.replace(/font-size:\s*(\d+)px/g, (match, p1) => {
    return `font-size: ${parseInt(p1) + 2}px`;
  });

  fs.writeFileSync(filePath, content, "utf8");
}

function walk(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);

    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith(".css")) {
      updateFile(fullPath);
    }
  });
}

walk("./src"); // apna folder adjust karo
console.log("Done updating font sizes!");