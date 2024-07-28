const fs = require('fs');
const path = require('path');

// 读取 CSS 文件并提取样式
function extractStylesAndSaveToJson(filePath) {
  fs.readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
    if (err) {
      console.error('Error reading CSS file:', err);
      return;
    }

    // 定义要提取的样式规则及其描述性后缀
    const styleMappings = {
      //--grey --lightmode
      'a12': ['文本-默认'],
      'a11': ['文本-次要'],
      'a9': ['文本-浅色注释'],
      'a8': ['文本-不可用'],
      'a5': ['边线-深'],
      '4': ['控件填充-不可用'],
      'a3': ['控件填充-激活态', '边线-浅', '控件填充-标签', '背景-提示块'],
      'a2': ['控件填充-悬停态', '背景-浅灰卡片'],
      'surface': ['背景-页面'],
      'contrast': ['背景-白色卡片']
      // --grey --darkmode
      // 'a12': ['文本-默认'],
      // 'a11': ['文本-次要'],
      // 'a9': ['文本-浅色注释'],
      // 'a8': ['文本-不可用'],
      // 'a5': ['边线-深'],
      // '4': ['控件填充-不可用'],
      // 'a3': ['控件填充-激活态', '控件填充-标签', '背景-提示块'],
      // 'a2': ['控件填充-悬停态', '背景-浅灰卡片', '边线-浅'],
      // 'surface': ['背景-页面'],
      // 'contrast': ['背景-白色卡片']
      //--colorfull
      // '12': ['文本强调'],
      // '10': ['文本'],
      // '9': ['控件填充'],
      // 'a5': ['边线'],
      // '4': ['控件填充-标签'],
      // 'a3': ['控件填充-激活态', '背景-提示块'],
      // '2': ['背景-页面'],
      // 'a2': ['控件填充-悬停态']
    };

    // 初始化一个对象来存储提取的样式
    let extractedStyles = {};

    // 使用正则表达式匹配所有变量定义
    const regex = /--([a-z]+)-([a-z0-9-]+)\s*:\s*([^;]+)/g;
    let match;
    while ((match = regex.exec(data)) !== null) {
      const color = match[1];
      const suffix = match[2];
      const value = match[3].trim();
      const suffixDescriptions = styleMappings[suffix];

      // 如果当前后缀在我们的映射中，才进行处理
      if (suffixDescriptions) {
        suffixDescriptions.forEach(description => {
          const newKey = `--${color}-${description}`;
          extractedStyles[newKey] = value;
        });
      }
    }

    // 将提取的样式保存到 JSON 文件
    const outputFilePath = path.join(__dirname, 'color.json');
    fs.writeFile(outputFilePath, JSON.stringify(extractedStyles, null, 2), (err) => {
      if (err) {
        console.error('Error writing JSON file:', err);
      } else {
        console.log(`Styles have been extracted and saved to JSON file at ${outputFilePath}.`);
      }
    });
  });
}

// 替换为你的 CSS 文件路径
const cssFilePath = path.join(__dirname, 'color.css');
extractStylesAndSaveToJson(cssFilePath);