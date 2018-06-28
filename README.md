### 基于node的博客系统
<hr>

  #### 开发环境
  MacOS ~ 10.13.2

  node ~ v8.11.2
  <hr>
  #### 命令
  项目克隆到本地
  ```shell
    > git clone https://github.com/xiaoyu311/xxiaoyu.com.git
    > npm install
    > bower install
  ```
  linux下如果出现问题可以尝试下面命令
  ```shell
    > git clone https://github.com/xiaoyu311/xxiaoyu.com.git
    > npm install
    > bower --allow-root install
  ```
  <font color='teal'>npm start</font> 开始跑项目啦！当然当你修改文件时候必须重启服务器，感觉特别不爽。不用担心修改根目录下的package.json文件
  ```json
    {
      ...
      "scripts": {
        "start": "node ./bin/www"
      },
      ...
    }
  ```
  修改成
  ```json
    {
      ...
      "scripts": {
        "start": "nodemon ./bin/www"
      },
      ...
    }
  ```
  > 这样修改文件后服务器就会自动重启，是不是特别给力。

  <hr>
  #### 目录结构

    

