import fs from 'fs';

/**
 * 读取配置文件
 * @param filePath 文件路径
 * @param [key] 要读取的配置项key
 * @param callback 回调函数
 */
export const getConfig = (filePath, key, callback) => {
  if (typeof key === 'function') {
    callback = key;
    key = undefined;
  }
  fs.readFile(filePath, 'utf8', (err, file) => {
    if (err) {
      console.log(`文件读取出错: ${err}`, `路径: ${filePath}`);
      return callback(err);
    }
    let data = JSON.parse(file);
    if (typeof key === 'string') {
      data = data[key];
    }
    return callback(null, data);
  });
};