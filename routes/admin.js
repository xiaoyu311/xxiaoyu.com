import express from 'express';
import category from '../proxy/category';
import post from '../proxy/post';
const router = express.Router();

// 文章保存
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
  category.save(req, (err, msg) => {
    if (err) {
      console.log('创建分类: ', err);
    } else {
      res.send(msg);
    }
  });
});

// 获取所有分类数据
router.get('/getCategory', (req, res, next) => {
  category.getAll('Alias', 'all', (err, CategoryList) => {
    if (err) {
      console.log('查询所有分类', err);
    } else {
      res.send({
        status: true,
        message: '查询所有分类成功',
        data: CategoryList
      });
    }
  });
});

export default router;