
import config from '../config.json';
import mongoose from 'mongoose';

mongoose.connect(config.DbPath);

const db = mongoose.connection;

db.on('error', () => {
  console.log('数据库连接出错');
});

db.once('open', () => {
  console.log('数据库连接成功');
});

db.on('close', () => {
  console.log('数据库断开连接');
  mongoose.connect(config.DbPath);
});
