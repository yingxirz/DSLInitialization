const fs = require('fs');
const path = require('path');

// 将十六进制颜色值转换为 RGBA
function hexToRGBA(hex) {
  let r = 0, g = 0, b = 0, a = 1;

  if (hex.length == 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length == 7) {
    r = parseInt(hex[1] + hex[2], 16);
    g = parseInt(hex[3] + hex[4], 16);
    b = parseInt(hex[5] + hex[6], 16);
  } else if (hex.length == 9) {
    r = parseInt(hex[1] + hex[2], 16);
    g = parseInt(hex[3] + hex[4], 16);
    b = parseInt(hex[5] + hex[6], 16);
    a = parseInt(hex[7] + hex[8], 16) / 255;
  }

  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

// 读取 CSS 文件并转换颜色值
function convertCSSColors(filePath) {
  fs.readFile(filePath, {encoding: 'utf-8'}, (err, data) => {
    if (err) {
      console.error('Error reading CSS file:', err);
      return;
    }

    // 首先移除 @supports 部分的内容
    const supportsRegex = /@supports[^{]+\{([\s\S]+?\})+\s*\}/g;
    let cssWithoutSupports = data.replace(supportsRegex, '');

    // 使用正则表达式匹配十六进制颜色值
    const regex = /#([0-9A-Fa-f]{3,8})/g;
    let modifiedCSS = cssWithoutSupports.replace(regex, (match) => {
      // 转换每个匹配的颜色值
      return hexToRGBA(match);
    });

    // 将修改后的 CSS 内容写回源文件
    fs.writeFile(filePath, modifiedCSS, (err) => {
      if (err) {
        console.error('Error writing modified CSS back to file:', err);
      } else {
        console.log('CSS file has been successfully updated with RGBA colors and @supports content removed.');
      }
    });
  });
}

// 替换为你的 CSS 文件路径
const cssFilePath = path.join(__dirname, 'color.css');
convertCSSColors(cssFilePath);