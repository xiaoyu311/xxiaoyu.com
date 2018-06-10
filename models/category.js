import mongoose from 'mongoose';
import shortid from 'shortid';
const categorySchema = mongoose.Schema({
  _id: {
    type: String,
    'default': shortid.generate
  },
  //创建时间
  CreateTime: {
    type: Date
  },
  //修改时间
  ModifyTime: {
    type: Date
  },
  //分类名称
  CateName: {
    type: String
  },
  //分类别名
  Alias: {
    type: String
  },
  //图标地址
  Img: {
    type: String
  },
  //链接地址
  Link: {
    type: String
  }
});
const CategoryModel = mongoose.model('category', categorySchema);
export default CategoryModel;