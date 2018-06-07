import mongoose from 'mongoose';
const categorySchema = mongoose.Schema({
  _id: {
    type: String,
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