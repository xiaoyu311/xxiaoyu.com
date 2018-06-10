import CategoryModel from '../models/category';

class Category {
  // 查看分类
  getAll(callback) {
    CategoryModel.find({}, (err, CategoryList) => {
      if (err) {
        console.log('查看分类失败', err);
        callback(err);
      } else {
        callback(null, CategoryList);
      }
    })
  }
  
  // 保存分类
  save(params, callback) {
    const { _id, CateName, Alias, Link, Img } = params;
    if (_id) {

    } else {
      const newCategory = { CateName, Alias, Link, Img };
      CategoryModel.create({
        CreateTime: new Date,
        ModifyTime: new Date,
        ...newCategory
      }, err => {
        if (err) {
          callback(err);
        } else {
          callback(null, {
            status: true,
            message: '创建分类成功'
          });
        }
      });
    }
  }
}

export default new Category();