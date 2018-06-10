import express from 'express';
import path from 'path';
import async from 'async';
const router = express.Router();
import { getConfig } from '../utils/tool';
import category from '../proxy/category';

router.get('/', (req, res, next) => {
  console.log(res.__)
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
      category.getAll((err, CategoryList) => {
        if (err) {
          fn(err);
          return;
        } else {
          fn(null, CategoryList);
        }
      });
    }
  ], (err, result) => {
    let settings;
    let categories;
    if (err) {
      next(err);
      return;
    }
    settings = result[0];
    categories = result[1];
    res.render('blog/index', {
      title: settings.SiteName,
      settings,
      cateData: categories,
      isRoot: false
    });
  });
});

export default router;