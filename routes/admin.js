import express from 'express';
import formidable from 'formidable';
import path from 'path';
import fs from 'fs';
import category from '../proxy/category';
import post from '../proxy/post';
const router = express.Router();

router.post('/saveArticle', (req, res, next) => {
  post.save(req.body, (err, message) => {
    if (err) return;
    res.send({
      status: true,
      message
    });
  });
});

// 保存分类数据
router.post('/saveCategories', (req, res, next) => {
  category.save(req.body, (err, msg) => {
    if (err) {
      console.log('创建分类: ', err);
    } else {
      res.send(msg);
    }
  });
});

// 获取所有分类数据
router.get('/getCategory', (req, res, next) => {
  category.getAll((err, CategoryList) => {
    if (err) {
      console.log('查询所有分类',err);
    } else {
      res.send({
        status: true,
        message: '查询所有分类成功',
        data: CategoryList
      });
    }
  });
});

// 上传图片
router.post('/uploadimg', (req, res, err) => {
  let AVATAR_UPLOAD_FOLDER = '/public/images/';
  let domain = "http://localhost:3001";
  const form = new formidable.IncomingForm();
  form.encoding = 'utf-8';
  form.uploadDir = path.join(__dirname, '../public/images/'); //文件上传 临时文件存放路径
  form.keepExtensions = true;
  form.maxFieldsSize = 3 * 1024 * 1024;
  form.parse(req, (err, fields, files) => {
    var extName = ''; //后缀名
    switch (files.file.type) {
      case 'image/pjpeg':
        extName = 'jpg';
        break;
      case 'image/jpeg':
        extName = 'jpg';
        break;
      case 'image/png':
        extName = 'png';
        break;
      case 'image/x-png':
        extName = 'png';
        break;
    }
    let avatarName = Math.random() + '.' + extName;
    let newPath = form.uploadDir + avatarName;
    let showUrl = domain + AVATAR_UPLOAD_FOLDER + avatarName;
    fs.renameSync(files.file.path, newPath); //重命名
    res.send({
      path: showUrl
    })
  })
})

export default router;