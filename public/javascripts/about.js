$(document).ready(function () {
  var resumeEditorContent = `
  # xiaoyu 个人简历

  ## Skill 
  
  - 前端：React技术栈、Vue技术栈、React-Native、微信小程序。
  - 前端工具：webpack、JQuery、Bootstrap。
  - 版本管理、文档自动化部署工具：Git。
  - 掌握语义化的HTML和具有兼容性的CSS模式。（PC和移动）。
  - 熟练掌握Vue、Vuex、vue-router。有实战项目。
  - 熟练掌握React、Redux、React-Router。有实战项目。
  - 掌握Javascript，jQuery热衷于es6/7。
  - 能熟练的手写和调试符合W3C标准、兼容主流浏览器代码。
  - 熟悉微信支付、微信SDK调用。（H5、App）。
  - 了解Ajax工作原理和是实现方法。
  - 了解Node.js、express、MongoDB。有一定的后端知识。
  - 服务器使用阿里云模拟主机。
  - 喜欢接触新事物，有一定的自学能力。


  ## Hobby
  - 英雄联盟（简直是真爱！😝😝工作后忙了，基本没时间玩了)。


  ## Blog

  - **GitHub: https://github.com/xiaoyu311**
  
  - **博客: https://www.xxiaoyu.com**
  > 如果你喜欢这个效果，Fork [我的项目](https://github.com/xiaoyu311)，打造你自己的简历！`;
  var current = '';
  var count = 0;
  var showResumeContent = function () {
    var len = resumeEditorContent.length;
    return new Promise((resolve, reject) => {
      var showContent = function () {
        var currentLen = current.length;
        if (currentLen < len) {
          current += resumeEditorContent[count];
          count++;
           document.getElementById('mark_dowm').innerHTML = marked(current);
          setTimeout(showContent, 40);
        }
      }
      showContent();
    });
  }
  showResumeContent(0);

});