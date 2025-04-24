const fs = require("fs");
const path = require("path");

// 从命令行获取传入的目录参数
const folderPath = process.argv[2];

if (!folderPath || !fs.existsSync(folderPath)) {
  console.error(
    "❌ 请传入一个有效的文件夹路径，例如：node script.js ./source/_posts"
  );
  process.exit(1);
}

fs.readdirSync(folderPath).forEach((file) => {
  if (!file.endsWith(".md")) return;

  const filePath = path.join(folderPath, file);
  let content = fs.readFileSync(filePath, "utf-8");

  // ✅ 格式化 ```js 代码块：统一空格为2个单位
  content = content.replace(/```js([\s\S]*?)```/g, (match, codeBlock) => {
    const formatted = codeBlock
      .split("\n")
      .map((line) => {
        const leadingSpaces = line.match(/^ */)?.[0].length || 0;
        const newIndent = " ".repeat(Math.floor(leadingSpaces / 1) * 2);
        return newIndent + line.trimStart();
      })
      .join("\n");
    return "```js" + formatted + "```";
  });

  // ✅ 格式化 /** 多行注释：除第一行外统一一个空格缩进
  content = content.replace(/\/\*\*[\s\S]*?\*\//g, (block) => {
    const lines = block.split("\n");
    if (lines.length <= 1) return block;

    return lines
      .map((line, index) => {
        if (index === 0) return line;
        return " " + line.trimStart();
      })
      .join("\n");
  });

  fs.writeFileSync(filePath, content, "utf-8");
  console.log(`✅ Formatted: ${file}`);
});
