import express from 'express';
import path from 'path';
import async from 'async';
const router = express.Router();
import { getConfig } from '../utils/tool';
import category from '../proxy/category';
import post from '../proxy/post';

// 页面重定向
router.get('/', (req, res, next) => {
  res.redirect('/blog/all');
});

// 页面重定向
router.get('/blog', (req, res, next) => {
  res.redirect('/blog/all');
});

// blog首页
router.get('/blog/:category', (req, res, next) => {
  async.parallel([
    fn => {
      getConfig(path.join(process.cwd(), 'config/settings.json'), (err, settings) => {
        if (err) {
          fn(err);
        } else {
          fn(null, settings);
        }
      });
    },
    fn => {
      // 全部分类查找
      category.getAll('Alias', 'all', (err, CategoryList) => {
        if (err) {
          fn(err);
        } else {
          fn(null, CategoryList);
        }
      });
    },
    fn => {
      post.getAll(req.params.category, (err, ArticleList) => {
        if (err) {
          fn(err);
        } else {
          fn(null, ArticleList);
        }
      });
    }
  ], (err, result) => {
    let settings;
    let categories;
    let articleList;
    if (err) {
      next(err);
      return;
    }
    settings = result[0];
    categories = result[1];
    articleList = result[2];
    res.render('blog/index', {
      title: settings.SiteName,
      settings,
      articleList,
      cateData: categories,
      query: 'blog',
      currentCate: req.params.category,
      isRoot: false
    });
  });
});

// 获取当前页面的详细内容
router.get('/blog/:category/:_id', (req, res, next) => {
  post.detail(req.params, (err, data) => {
    if (err) {
      res.send({
        status: false,
        message: '查询出错'
      });
      return;
    }
    res.send({
      status: true,
      message: '查询成功',
      data
    })
  });
}); 

// 关于页面
router.get('/about', (req, res, next) => {
  res.render('blog/about', {
    query: 'about'
  });
})

export default router;