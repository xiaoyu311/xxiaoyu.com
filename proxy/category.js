import CategoryModel from '../models/category';
import formidable from 'formidable';
import async from 'async';
import fs from 'fs';

class Category {

  // 按照别名 或者名字 查看分类
  getAll(attr, value, callback) {
    var findObj = {};
    if (!(attr === 'Alias' && value === 'all')) {
      findObj = {
        [attr]: value
      };
    }
    CategoryModel.find(findObj, (err, CategoryList) => {
      if (err) {
        console.log('查看分类失败', err);
        callback(err);
      } else {
        callback(null, CategoryList);
      }
    })
  }

  // 保存分类
  save(req, callback) {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
      const {
        CateName,
        Alias,
        Link,
        _id
      } = fields;
      if (_id) {

      } else {
        async.parallel([
          fn => {
            this.getAll('CateName', CateName, fn);
          },
          fn => {
            this.getAll('Alias', Alias, fn);
          },
          fn => {
            const imgName = new Date().getTime();
            const imgData = fields.Img.replace(/^data:image\/\w+;base64,/, '');
            const dataBuffer = new Buffer(imgData, 'base64');
            fs.writeFile('./public/images/' + imgName + '.png', dataBuffer, function (err) {
              if (err) {
                fn(err);
              } else {
                fn(null, '/images/' + imgName + '.png');
              }
            });
          }
        ], (err, result) => {
          if (err) {
            console.log('新建分类出错')
            callback(err);
          } else {
            if (result[0].length || result[1].length) {
              callback(null, {
                status: false,
                message: '名字或者别名已存在'
              });
            } else {
              CategoryModel.create({
                CreateTime: new Date,
                ModifyTime: new Date,
                CateName,
                Alias,
                Link,
                Img: result[2]
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
        });
      }
    })
  }
}

export default new Category();