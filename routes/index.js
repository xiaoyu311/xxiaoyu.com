import express from 'express';
import path from 'path';
import async from 'async';
const router = express.Router();
import { getConfig } from '../utils/tool';

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
    }
  ], (err, result) => {
    let settings;
    if (err) {
      next(err);
      return;
    }
    settings = result[0];
    res.render('blog/index', {
      title: settings.SiteName
    });
  });
});

export default router;