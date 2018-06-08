import express from 'express';
import path from 'path';
import { getConfig } from '../utils/tool';
const router = express.Router();

// 分类管理页面
router.get('/getCategories', (req, res, next) => {
  getConfig(path.join(__dirname, '../config/settings.json'), (err, settings) => {
    if (err) {
      next(err);
      return;
    }
    res.render('admin/categorymanage', {
      settings,
      title: settings['SiteName'] + '-' + res.__('layoutAdmin.classified_management')
    });
  });
});

export default router;
