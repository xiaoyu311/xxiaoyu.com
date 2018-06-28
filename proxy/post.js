import postModel from '../models/post';
import CategoryModel from '../models/category';
import async from 'async';

const pageNumber = 1;
class Post {
  // 文章查找
  getAll(Alias, n, callback) {
    let number = parseInt(n);
    if (Alias === 'all') {
      postModel.find({}).skip(number * pageNumber).limit(pageNumber).exec((err, postList) => {
        if (err) {
          console.log('查询所有文章出错');
          callback(err);
          return;
        }
        async.map(postList,
          (postInfo, fn) => {
            CategoryModel.findOne({
              _id: postInfo.CategoryId
            }, (err, CategoryInfo) => {
              if (err) {
                console.log('查询对应id都文章分类');
                fn(err);
                return;
              }
              const postInfoNew = {
                _id: postInfo._id,
                CreateTime: postInfo.CreateTime,
                ModifyTime: postInfo.ModifyTime,
                Title: postInfo.Title,
                Alias: postInfo.Alias,
                Summary: postInfo.Summary,
                Content: postInfo.Content,
                CategoryId: postInfo.CategoryId,
                Url: postInfo.Url,
                Labels: postInfo.Labels,
                ViewCount: postInfo.ViewCount,
                IsActive: postInfo.IsActive,
                CateName: CategoryInfo.CateName
              };
              fn(null, postInfoNew);
            });
          },
          (err, result) => {
            if (err) return;
            callback(null, result);
          }
        );
      });
      return;
    }
    CategoryModel.findOne({
      Alias
    }, (err, categoryInfo) => {
      if (err) {
        console.log('查询对应分类id出错');
        callback(err);
        return
      }
      postModel.find({
        CategoryId: categoryInfo._id
      }).skip(number * pageNumber).limit(pageNumber).exec((err, postList) => {
        if (err) {
          console.log('查询对应_id文章出错');
          callback(err);
          return;
        }
        let newPostList = postList.map(item => {
          const itemNew = {
            _id: item._id,
            CreateTime: item.CreateTime,
            ModifyTime: item.ModifyTime,
            Title: item.Title,
            Alias: item.Alias,
            Summary: item.Summary,
            Content: item.Content,
            CategoryId: item.CategoryId,
            Url: item.Url,
            Labels: item.Labels,
            ViewCount: item.ViewCount,
            IsActive: item.IsActive,
            CateName: categoryInfo.CateName
          };
          return itemNew
        });
        callback(null, newPostList);
      });
    });
  }

  // 文章总数量
  getCount(Alias, callback) {
    if (Alias == 'all') {
      postModel.count({}, (err, count) => {
        if (err) {
          console.log('查询对应分类id出错');
          callback(err);
          return
        }
        callback(null, count);
      });
      return;
    }
    CategoryModel.findOne({
      Alias
    }, (err, categoryInfo) => {
      if (err) {
        console.log('查询对应分类id出错');
        callback(err);
        return
      }
      postModel.count({ CategoryId: categoryInfo._id }, (err, count) => {
        if (err) {
          console.log('数量查询失败');
          callback(err);
          return;
        }
        callback(null, count);
      });
    })
  }

  // 文章保存
  save(params, callback) {
    let _id = params._id;
    const {
      Title,
      Alias,
      Summary,
      Content,
      CategoryId,
      Url,
      Labels
    } = params;
    if (!_id) {
      postModel.create({
        ...{
          Title,
          Alias,
          Summary,
          Content,
          CategoryId,
          Url,
          Labels
        },
        ModifyTime: new Date(),
        ViewCount: 0
      }, err => {
        if (err) {
          console.log('创建文章失败: ', err);
          callback(err);
        } else {
          callback(null, '文章创建成功');
        }
      });
    } else {
    }
  }

  // 查询文章详情
  detail(params, callback) {
    postModel.findOne({
      _id: params._id
    }, (err, postInfo) => {
      if (err) {
        console.log('查询文章详情出错：', err);
        callback(err);
        return;
      }
      callback(null, postInfo);
    });
  }
}

export default new Post();