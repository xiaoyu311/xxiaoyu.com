import express from 'express';
import formidable from 'formidable';
import path from 'path';
import fs from 'fs';
const router = express.Router();

router.post('/action', (req, res, err) => {
  console.log(req.url)
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