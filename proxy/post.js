import postModel from '../models/post';

class Post {
  save(params, callback) {
    let _id = params._id;
    const {
      Title, Alias, Summary, Content, CategoryId, Url, Labels
    } = params;
    if (!_id) {
      postModel.create({
        ...{ Title, Alias, Summary, Content, CategoryId, Url, Labels },
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
}

export default new Post();