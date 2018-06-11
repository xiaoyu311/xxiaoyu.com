import mongoose from 'mongoose';
import shortid from 'shortid';

const postSchema = new mongoose.Schema({
  //唯一键
  _id: {
    type: String,
    default: shortid.generate
  },
  //创建时间
  CreateTime: {
    type: Date,
    default: new Date()
  },
  //修改时间
  ModifyTime: {
    type: Date
  },
  //标题
  Title: {
    type: String
  },
  //文章别名
  Alias: {
    type: String
  },
  //摘要
  Summary: {
    type: String
  },
  //内容
  Content: {
    type: String
  },
  //分类Id
  CategoryId: {
    type: String
  },
  //外链Url
  Url: {
    type: String
  },
  //标签
  Labels: {
    type: Array
  },
  //浏览次数
  ViewCount: {
    type: Number
  },
  //是否有效
  IsActive: {
    type: Boolean,
    default: true
  }
});
const postModel = mongoose.model('post', postSchema);
export default postModel;