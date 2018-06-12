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

export default router;