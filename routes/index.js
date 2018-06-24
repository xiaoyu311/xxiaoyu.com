import express from 'express';
import path from 'path';
import async from 'async';
import { getConfig } from '../utils/tool';
import category from '../proxy/category';
import post from '../proxy/post';
const router = express.Router();

// 页面重定向
router.get('/', (req, res, next) => { 
  res.redirect('/blog/all');
});

// 页面重定向
router.get('/blog', (req, res, next) => {
  res.redirect('/blog/all');
});

// 文章分页
router.get('/article/:category/:n', (req, res) => {
  // let number = parseInt(req.params.n);
  post.getAll(req.params.category, req.params.n, (err, ArticleList) => {
    if (err) {
      console.log('查询文章分页失败: ', err);
    } else {
      res.send({
        status: true,
        ArticleList
      });
    }
  });
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
      post.getAll(req.params.category, 1, (err, ArticleList) => {
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
  getConfig(path.join(process.cwd(), 'config/settings.json'), (err, settings) => {
    if (err) {
      console.log('获取配置参数失败', err);
    } else {
      res.render('blog/about', {
        query: 'about',
        title: settings.SiteName,
        settings
      });
    }
  });
})

export default router;